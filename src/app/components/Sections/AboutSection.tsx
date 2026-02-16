"use client";

export default function AboutSection() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 pt-20 sm:pt-24 md:pt-28 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl flex justify-center">
        {/* PCでは自動高さ、モバイルのみスクロール */}
        <div className="card bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg w-full
                        overflow-auto max-h-[90vh] md:overflow-visible md:max-h-none">
          
          {/* 上部: プロフィール */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-zunda-primary to-zunda-secondary rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <img src="./image/QAmamo.png" alt="プロフィール画像" className="object-cover w-full h-full" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">薮下 海大</h3>
            <p className="text-xl text-gray-600">QA&Web Engineer</p>
          </div>

          {/* 中央: 自己紹介 */}
          <div className="prose prose-lg max-w-none text-gray-700 mb-6 sm:mb-3">
            <p className="mb-4 sm:mb-2">
              QAエンジニアとして2年以上の経験があります。
              フロントエンドからバックエンドの実装、テストまで幅広く対応可能です。
            </p>
            <p className="mb-4 sm:mb-2">
              特にReact/Next.jsを使用したモダンなWebアプリケーション開発、Python/Node.jsを用いたE2Eテスト自動化を学習中です。
            </p>
          </div>

          {/* 下部: SNSリンク */}
          <div className="mt-4 sm:mt-6 flex justify-center gap-6 flex-wrap">
            <a
              href="https://github.com/qa-marmot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-zunda-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="#181717" viewBox="0 0 24 24">
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
              <svg className="w-6 h-6" fill="#55C500" viewBox="0 0 24 24">
                <path d="M12 0C5.3726 0 0 5.3726 0 12s5.3726 12 12 12c3.3984 0 6.4665-1.413 8.6498-3.6832-.383-.0574-.7746-.2062-1.1466-.4542-.7145-.4763-1.3486-.9263-1.6817-1.674-1.2945 1.3807-3.0532 1.835-5.1822 2.0503-4.311.4359-8.0456-1.4893-8.4979-6.2996-.1922-2.045.2628-3.989 1.1804-5.582l-.5342-2.1009c-.0862-.3652.2498-.7126.6057-.6262l1.8456.448c1.0974-.9012 2.4249-1.49 3.8892-1.638 1.2526-.1267 2.467.0834 3.571.5624l1.7348-1.0494c.3265-.1974.7399.0257.7711.4164l.1 2.4747v.0002c1.334 1.4084 2.2424 3.3319 2.4478 5.516.116 1.2339-.012 2.1776-.339 3.078-.1531.4215-.1992.7778.0776 1.1305.2674.3408.6915 1.0026 1.1644.8917.7107-.1666 1.4718-.1223 1.9422.1715C23.4925 15.9525 24 14.0358 24 12c0-6.6274-5.3726-12-12-12Zm-.0727 5.727a5.2731 5.2731 0 0 0-.6146.0273c-2.2084.2233-3.9572 1.8135-4.4937 3.8484l-1.3176-.1996-.014.2589 1.2972.1407c-.0352.1497-.0643.2384-.086.3923l-1.1319.0902.0103.2025 1.1032-.088c-.0194.1713-.031.2814-.0332.4565l-1.0078.412.0495.2499.9598-.4492c.002.1339.008.2053.0207.3407.2667 2.8371 2.6364 3.3981 5.4677 3.1118 2.8312-.2863 5.0517-1.3114 4.785-4.1486-.013-.1361-.0324-.2068-.0553-.3392l1.0397.2257.0242-.229-1.0906-.207c-.0342-.1687-.0765-.271-.1264-.4327l1.1208-.1374-.0158-.2019-1.1499.1409a5.1093 5.1093 0 0 0-.1665-.4259l1.2665-.4042-.0397-.2536-1.3471.4667c-.819-1.7168-2.5002-2.8224-4.4546-2.8482Z" />
              </svg>
              Qiita
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
