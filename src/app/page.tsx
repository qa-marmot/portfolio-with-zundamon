"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import IntroSection from "./components/Sections/IntroSection";
import WorksSection from "./components/Sections/WorksSection";
import SkillsSection from "./components/Sections/SkillsSection";
import AboutSection from "./components/Sections/AboutSection";
import SpeechBubble from "./components/SpeechBubble";
import VoiceToggle from "./components/VoiceToggle";

const VOICEVOX_ENDPOINT =
  process.env.NEXT_PUBLIC_VOICEVOX_ENDPOINT ?? "http://localhost:50021";
const Live2DCharacter = dynamic(() => import("./components/Live2DCharacter"), {
  ssr: false,
});

type Section = "intro" | "works" | "skills" | "about";

interface SectionDialogue {
  text: string;
  armPose: number;
}

interface AudioCache {
  [key: string]: Blob;
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [showSpeech, setShowSpeech] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);

  const modelRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mouthAnimationRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isPlayingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isWorkSpeechRef = useRef(false);
  const hasPlayedIntroVoiceRef = useRef(false);

  //  音声キャッシュ
  const audioCacheRef = useRef<AudioCache>({});
  const isPrecachingRef = useRef(false);

  // セクション別台詞
  const sectionDialogues: Record<Section, SectionDialogue> = {
    intro: {
      text: "こんにちはなのだ！\nずんだもんと一緒に見ていくのだ!\nこのサイトはPC視聴専用なのだ\n 音声を聞きたい場合は🔊音声ボタンをONにするのだ!",
      armPose: 1.0,
    },
    works: {
      text: "作品一覧なのだ！\n気になるものをクリックするのだ!",
      armPose: 0.5,
    },
    skills: {
      text: "使える技術スタックを紹介するのだ！\n気になるものをクリックするのだ!",
      armPose: 0.0,
    },
    about: {
      text: "QAエンジニアとして2年以上の経験があるのだ!AstroやNext.jsでのWeb開発と、PythonやNode.jsでのテスト自動化を学びながら、UIや使いやすさにもこだわってるのだ!最近はWebサイト制作の副業を始めたのだ!",
      armPose: 0.5,
    },
  };

  const skillSpeechMap = {
    frontend: `フロントエンドなのだ!まずHTMLで構造を作って、CSSで見た目を整えるのだ。JavaScriptで動きをつけて、AstroやNext.jsで画面を効率よく組み立ててるのだ!TypeScriptで安全に開発して、Tailwind CSSでスタイルを管理してるのだ。必要に応じてjQueryも使うのだ!`,
    backend: `バックエンドなのだ!Node.jsやPython、PHPを使って、サーバー側の処理を書くのだ。FastAPIで高速なAPIを作って、フロントエンドと連携したりしてるのだ。Supabaseを使って、データベースや認証もまとめて管理してるのだ！`,
    devops: `開発を支える技術たちなのだ! Dockerで開発環境をそろえて、誰でも同じ環境で動かせるようにするのだ。GitHubでコードを管理して、PlaywrightやSeleniumでテストを自動化! デプロイは主にVercelとcloudflareなのだ!`,
  } as const;

  const LOCAL_VOICEVOX =
    process.env.NEXT_PUBLIC_VOICEVOX_ENDPOINT ?? "http://localhost:50021";

  const REMOTE_VOICEVOX = "https://deprecatedapis.tts.quest/v2/voicevox/audio/";

  const VOICEVOX_API_KEY = process.env.NEXT_PUBLIC_VOICEVOX_API_KEY;

  // ローカルが生きているかチェック
  const checkLocalVoicevox = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${LOCAL_VOICEVOX}/speakers`, { method: "GET" });
      return res.ok;
    } catch {
      return false;
    }
  };

  // -------------------------
  // 発話の即キャンセル
  // -------------------------
  const cancelCurrentSpeech = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    if (mouthAnimationRef.current) {
      clearInterval(mouthAnimationRef.current);
      mouthAnimationRef.current = null;
    }

    modelRef.current?.internalModel?.coreModel?.setParameterValueById(
      "ParamMouthOpen",
      0,
    );

    isPlayingRef.current = false;
    setShowSpeech(false);
    setIsGeneratingVoice(false);
  }, []);

  // Live2D ready
  const handleModelReady = useCallback((model: any) => {
    modelRef.current = model;
  }, []);

  const setParameter = useCallback((id: string, value: number) => {
    modelRef.current?.internalModel?.coreModel?.setParameterValueById(
      id,
      value,
    );
  }, []);

  const startMouthAnimation = useCallback(() => {
    let toggle = true;
    mouthAnimationRef.current = window.setInterval(() => {
      setParameter("ParamMouthOpen", toggle ? 0.8 : 0.2);
      toggle = !toggle;
    }, 150);
  }, [setParameter]);

  const stopMouthAnimation = useCallback(() => {
    if (mouthAnimationRef.current) {
      clearInterval(mouthAnimationRef.current);
      mouthAnimationRef.current = null;
    }
    setParameter("ParamMouthOpen", 0);
  }, [setParameter]);

  // -------------------------
  //  音声生成（キャッシュあり）
  // -------------------------
  const generateVoiceBlob = useCallback(
    async (text: string, cacheKey?: string): Promise<Blob | null> => {
      if (cacheKey && audioCacheRef.current[cacheKey]) {
        return audioCacheRef.current[cacheKey];
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const useLocal: boolean = await checkLocalVoicevox();

        // =========================
        // ローカル VOICEVOX
        // =========================
        if (useLocal) {
          const queryRes = await fetch(
            `${LOCAL_VOICEVOX}/audio_query?text=${encodeURIComponent(text)}&speaker=1`,
            { method: "POST", signal: controller.signal },
          );
          if (!queryRes.ok) throw new Error("local audio_query failed");

          const query = await queryRes.json();

          const synthRes = await fetch(
            `${LOCAL_VOICEVOX}/synthesis?speaker=1`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(query),
              signal: controller.signal,
            },
          );
          if (!synthRes.ok) throw new Error("local synthesis failed");

          const blob = await synthRes.blob();
          if (cacheKey) audioCacheRef.current[cacheKey] = blob;
          return blob;
        }

        // =========================
        // リモート VOICEVOX（tts.quest）
        // =========================
        const params = new URLSearchParams({
          key: VOICEVOX_API_KEY ?? "",
          text,
          speaker: "1",
          pitch: "0",
          intonationScale: "1",
          speed: "1",
        });

        const remoteRes = await fetch(
          `${REMOTE_VOICEVOX}?${params.toString()}`,
          {
            method: "GET",
            signal: controller.signal,
          },
        );

        if (!remoteRes.ok) {
          const msg = await remoteRes.text();
          throw new Error(`remote voicevox failed: ${msg}`);
        }

        const arrayBuffer = await remoteRes.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: "audio/wav" });

        if (cacheKey) {
          audioCacheRef.current[cacheKey] = blob;
        }

        return blob;
      } catch (e) {
        if (controller.signal.aborted) {
          console.log("Voice generation aborted");
        } else {
          console.error("Voice generation error:", e);
        }
        return null;
      } finally {
        abortControllerRef.current = null;
      }
    },
    [],
  );  

  // -------------------------
  //  音声再生
  // -------------------------
  const speakWithVoicevox = useCallback(
    async (text: string, cacheKey?: string) => {
      if (!voiceEnabled) return;

      cancelCurrentSpeech();
      isPlayingRef.current = true;
      setIsGeneratingVoice(true);

      try {
        const blob = await generateVoiceBlob(text, cacheKey);

        if (!blob) {
          setIsGeneratingVoice(false);
          isPlayingRef.current = false;
          return;
        }

        // Audio要素を作成
        const audio = new Audio();
        audioRef.current = audio;

        audio.onplay = () => {
          setIsGeneratingVoice(false);
          startMouthAnimation();
        };

        audio.onended = () => {
          stopMouthAnimation();
          isPlayingRef.current = false;
          isSpeakingRef.current = false;
          if (audio.src) URL.revokeObjectURL(audio.src);
        };

        audio.onerror = () => {
          console.error("Audio playback error");
          setIsGeneratingVoice(false);
          isPlayingRef.current = false;
        };

        // Blob URLを作成して即座に再生
        audio.src = URL.createObjectURL(blob);
        await audio.play();
      } catch (e: any) {
        console.error("Speech error:", e);
        setIsGeneratingVoice(false);
        isPlayingRef.current = false;
      }
    },
    [
      voiceEnabled,
      cancelCurrentSpeech,
      generateVoiceBlob,
      startMouthAnimation,
      stopMouthAnimation,
    ],
  );

  // -------------------------
  //  セクション音声のプリロード
  // -------------------------
  const precacheSectionVoices = useCallback(async () => {
    if (isPrecachingRef.current) return;
    if (!voiceEnabled) return;

    isPrecachingRef.current = true;
    console.log("🔊 Precaching section voices...");

    const sections: Section[] = ["intro", "works", "skills", "about"];

    for (const section of sections) {
      const text = sectionDialogues[section].text;
      const cacheKey = `section_${section}`;

      // すでにキャッシュされていればスキップ
      if (audioCacheRef.current[cacheKey]) continue;

      try {
        await generateVoiceBlob(text, cacheKey);
        console.log(`✓ Cached: ${section}`);
      } catch (e) {
        console.error(`Failed to cache ${section}:`, e);
      }
    }

    console.log("✓ Precaching complete!");
    isPrecachingRef.current = false;
  }, [voiceEnabled, sectionDialogues, generateVoiceBlob]);

  // -------------------------
  // セクション変更
  // -------------------------
  const handleSectionChange = useCallback(
    (section: Section) => {
      if (currentSection === section) return;

      cancelCurrentSpeech();
      setCurrentSection(section);

      const d = sectionDialogues[section];
      setParameter("ParamArmR", d.armPose);
      setSpeechText(d.text);
      setShowSpeech(true);

      // キャッシュキーを指定して再生
      speakWithVoicevox(d.text, `section_${section}`);
    },
    [
      currentSection,
      cancelCurrentSpeech,
      sectionDialogues,
      speakWithVoicevox,
      setParameter,
    ],
  );

  // -------------------------
  // Worksクリック
  // -------------------------
  const handleWorkClick = useCallback(
    (work: { title: string; description: string }) => {
      setParameter("ParamArmR", 1.0);
      isSpeakingRef.current = true;

      cancelCurrentSpeech();

      const text = `${work.title}なのだ！\n${work.description}`;

      setSpeechText(text);
      setShowSpeech(true);
      speakWithVoicevox(text);
    },
    [cancelCurrentSpeech, speakWithVoicevox, setParameter],
  );

  // -------------------------
  // Skillクリック
  // -------------------------
  const handleSkillClick = useCallback(
    (type: "frontend" | "backend" | "devops") => {
      const text = skillSpeechMap[type];

      setParameter("ParamArmR", 1.0);
      isSpeakingRef.current = true;

      cancelCurrentSpeech();
      setSpeechText(text);
      setShowSpeech(true);

      // スキルもキャッシュ
      speakWithVoicevox(text, `skill_${type}`);
    },
    [cancelCurrentSpeech, speakWithVoicevox, setParameter],
  );

  // -------------------------
  // scroll監視
  // -------------------------
  useEffect(() => {
    const onScroll = () => {
      if (isWorkSpeechRef.current) return;

      const center = window.scrollY + window.innerHeight / 2;
      const idx = Math.floor(center / window.innerHeight);

      const sections: Section[] = ["intro", "works", "skills", "about"];
      const s = sections[Math.min(idx, sections.length - 1)];

      if (s !== currentSection) {
        handleSectionChange(s);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentSection, handleSectionChange]);

  // -------------------------
  //  音声ONになったらプリロード開始
  // -------------------------
  useEffect(() => {
    if (voiceEnabled) {
      // プリロードを開始（非同期）
      precacheSectionVoices();

      // intro音声を再生（初回のみ）
      if (!hasPlayedIntroVoiceRef.current && currentSection === "intro") {
        hasPlayedIntroVoiceRef.current = true;
        speakWithVoicevox(sectionDialogues.intro.text, "section_intro");
      }
    }
  }, [
    voiceEnabled,
    currentSection,
    precacheSectionVoices,
    speakWithVoicevox,
    sectionDialogues,
  ]);

  // -------------------------
  // 初回マウント時 intro 吹き出し表示
  // -------------------------
  useEffect(() => {
    const d = sectionDialogues.intro;

    setParameter("ParamArmR", d.armPose);
    setSpeechText(d.text);
    setShowSpeech(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <VoiceToggle
        enabled={voiceEnabled}
        onToggle={() => setVoiceEnabled((v) => !v)}
      />

      {/*  オプション: 音声生成中インジケーター */}
      {isGeneratingVoice && (
        <div className="fixed top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow-lg z-50 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          音声生成中...
        </div>
      )}

      <main>
        <IntroSection />
        <WorksSection onWorkClick={handleWorkClick} />
        <SkillsSection onSkillClick={handleSkillClick} />
        <AboutSection />
      </main>

      <Live2DCharacter
        onReady={handleModelReady}
        currentSection={currentSection}
      />

      <SpeechBubble
        text={speechText}
        visible={showSpeech}
        onComplete={() => {
          setShowSpeech(false);
          isSpeakingRef.current = false;
        }}
      />
    </>
  );
}
