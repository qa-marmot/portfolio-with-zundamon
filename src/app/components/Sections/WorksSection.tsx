"use client";

import { useRef, useState } from "react";

interface WorksSectionProps {
  onWorkClick?: (work: { title: string; description: string }) => void;
}

export default function WorksSection({ onWorkClick }: WorksSectionProps) {
  const works = [
    {
      title: "プロジェクト名",
      description: "このサイトは○○を目的に作ったWebアプリなのだ!",
      tech: ["dummy", "dummy", "dummy", "dummy"],
      image: "dummy",
    },
    {
      title: "プロジェクト名",
      description: "チャット機能を中心にしたサービスなのだ！",
      tech: ["dummy", "dummy", "dummy", "dummy"],
      image: "dummy",
    },
    {
      title: "プロジェクト名",
      description: "デザイン重視で制作した作品なのだ！",
      tech: ["dummy", "dummy", "dummy", "dummy"],
      image: "dummy",
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
        {/* タイトルとナビゲーションボタンを横並びに */}
        <div className="flex items-center justify-between mb-12 max-w-4xl mx-auto">
          <h2 className="section-title">Works</h2>
          
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
          {/* カルーセル本体 */}
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
                  className="card cursor-pointer rounded-3xl transform hover:scale-105 transition-transform duration-300 h-full"
                >
                  <div className="text-6xl text-center mb-4">{work.image}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {work.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {work.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-zunda-primary/20 text-zunda-dark px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
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