'use client';

export default function IntroSection() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-zunda-primary/20 to-zunda-secondary/20">
      <div className="text-center px-8">
        <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in">
          Welcome to My Portfolio
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 mb-8 animate-fade-in-delay">
          ずんだもんと一緒に見ていくのだ！
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-600 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
          <span className="text-lg">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}
