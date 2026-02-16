'use client';

export default function IntroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zunda-primary/20 to-zunda-secondary/20 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-4 sm:mb-6 animate-fade-in leading-tight">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 sm:mb-8 animate-fade-in-delay">
          ずんだもんと一緒に見ていくのだ！
        </p>

        <div className="flex items-center justify-center gap-2 text-gray-600 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>

          <span className="text-sm sm:text-base md:text-lg">
            Scroll Down
          </span>
        </div>
      </div>
    </section>
  );
}
