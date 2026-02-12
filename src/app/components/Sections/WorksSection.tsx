"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface WorksSectionProps {
  onWorkClick?: (work: { title: string; description: string }) => void;
}

export default function WorksSection({ onWorkClick }: WorksSectionProps) {
  const works = [
    {
      title: "JavaScript勉強サイト",
      description:
        "技術構成はNext.js × TailwindCSSでモダンに仕上げ、裏側はSupabaseでしっかり支えているのだ。デプロイ先はVercelを選んで、安定したJavaScript勉強サイトを目指したのだ!",
      tech: ["React", "Next.js", "Tailwindcss", "Supabase", "Vercel"],
      image: "/image/javascript-exam-app.png",
      url: "https://javascript-exam-app.vercel.app/",
    },
    {
      title: "順番待ちシステム",
      description:
        "中身の構造にもこだわった「順番待ちシステム」なのだ!セマンティックHTMLを意識して、どこに何が書いてあるかブラウザにも優しく伝わるように作ったのだ!管理画面はhttps://qa-marmot.github.io/queue-system/staff.htmlで遷移できるのだ!",
      tech: ["html", "css", "Javascript", "jQuery"],
      image: "/image/queue-system.png",
      url: "https://qa-marmot.github.io/queue-system/",
    },
    {
      title: "プロジェクト名",
      description: "デザイン重視で制作した作品なのだ！",
      tech: ["dummy", "dummy", "dummy", "dummy"],
      image: "/image/dummy.png",
      url: "#",
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / works.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : works.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < works.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto py-20">
      <div className="container mx-auto px-8">
        {/* タイトルとナビゲーションボタン */}
        <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
          <h2 className="section-title font-bold">Works</h2>

          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
              aria-label="前へ"
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="bg-white hover:bg-gray-50 rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
              aria-label="次へ"
            >
              <svg
                className="w-5 h-5 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* カルーセル */}
          <div
            ref={carouselRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide gap-8 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {works.map((work, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(100%-2rem)] snap-center"
              >
                <div
                  onClick={() =>
                    onWorkClick?.({
                      title: work.title,
                      description: work.description,
                    })
                  }
                  className="card cursor-pointer rounded-3xl transform hover:scale-105 transition-transform duration-300 h-full p-4 bg-white shadow-lg"
                >
                  {/* 画像 */}
                  <div className="relative w-full h-80 mb-4 rounded-3xl overflow-hidden bg-gray-100">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-contain rounded-3xl"
                      sizes="(max-width: 768px) 100vw, 600px"
                      priority={index === 0}
                    />
                  </div>

                  {/* タイトル */}
                  <h3 className="text-2xl text-center font-bold mt-2 mb-4 text-gray-800">
                    {work.title}
                  </h3>

                  {/* 技術タグ */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {work.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-zunda-primary/20 text-zunda-dark px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* ポートフォリオリンクボタン */}
                  <div className="text-center mt-2">
                    <a
                      href={work.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-6 py-2 bg-zunda-secondary text-white font-medium rounded-xl hover:bg-zunda-dark transition-colors duration-200"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* インジケーター */}
          <div className="flex justify-center gap-2 mt-8">
            {works.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-indigo-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`スライド ${index + 1} へ移動`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}