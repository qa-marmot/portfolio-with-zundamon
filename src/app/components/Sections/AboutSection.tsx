"use client";

export default function AboutSection() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mt-8 mx-auto px-8 max-w-4xl">
        <h2 className="section-title text-center mb-12">About Me</h2>
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-zunda-primary to-zunda-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-6xl">
              <img src="./image/QAmamo.png" alt="プロフィール画像" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">薮下 海大</h3>
            <p className="text-xl text-gray-600">QA&Web Engineer</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              QAエンジニアとして2年以上の経験があります。
              フロントエンドからバックエンドの実装、テストまで幅広く対応可能です。
            </p>
            <p className="mb-4">
              特にReact/Next.jsを使用したモダンなWebアプリケーション開発、Python/Node.jsを用いたテスト自動化を学習中で
              UI/UXにこだわった開発を心がけています。
            </p>
            <p>
              最近はセキュリティ領域やLive2Dにも興味があり、
              技術の幅を広げています。
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-6">
            <a
              href="https://github.com/qa-marmot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-zunda-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://qiita.com/QA_marmot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-[#55c500] transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.992 0C5.368 0 0 5.368 0 11.992c0 6.624 5.368 11.992 11.992 11.992 6.624 0 11.992-5.368 11.992-11.992C23.984 5.368 18.616 0 11.992 0zm0 3.75c3.048 0 5.516 2.468 5.516 5.516 0 3.048-2.468 5.516-5.516 5.516-3.048 0-5.516-2.468-5.516-5.516 0-3.048 2.468-5.516 5.516-5.516zm1.758 13.594v1.758h-3.516v-1.758h3.516z" />
              </svg>
              Qiita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
