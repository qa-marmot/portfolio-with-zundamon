"use client";

import { useRef, useState } from "react";

type SkillType = "frontend" | "backend" | "devops";

type Props = {
  onSkillClick?: (type: SkillType) => void;
};

export default function SkillsSection({ onSkillClick }: Props) {
  const skills = [
    {
      key: "frontend" as const,
      category: "Frontend",
      items: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "jQuery",
      ],
    },
    {
      key: "backend" as const,
      category: "Backend",
      items: [
        "Node.js",
        "Python",
        "PHP",
        "FastAPI",
        "Supabase",
      ],
    },
    {
      key: "devops" as const,
      category: "DevOps / etc.",
      items: [
        "Docker",
        "GitHub",
        "Vercel",
        "Render",
        "Playwright",
        "Selenium",
        "Jira",
        "Slack",
        "Confluence",
        "Figma",
      ],
    },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / skills.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : skills.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < skills.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 overflow-y-auto py-20">
      <div className="container mx-auto px-8">
        {/* タイトルとナビゲーションボタンを横並びに */}
        <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
          <h2 className="section-title">Skills</h2>
          
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
            {skills.map((category) => (
              <div
                key={category.key}
                className="flex-shrink-0 w-full md:w-[calc(100%-2rem)] snap-center"
              >
                <div
                  onClick={() => onSkillClick?.(category.key)}
                  className="group cursor-pointer rounded-3xl bg-white/70 backdrop-blur-sm
                            shadow-lg p-8 transition-all duration-300
                            hover:-translate-y-2 hover:shadow-2xl h-full"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zunda-primary"></span>
                    {category.category}
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full text-sm font-medium
                                  bg-gradient-to-r from-zunda-primary/40 to-zunda-secondary/20
                                  text-zunda-dark
                                  border border-zunda-primary/20
                                  transition-colors duration-200
                                  group-hover:bg-zunda-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* インジケーター */}
          <div className="flex justify-center gap-2 mt-8">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-emerald-600 w-8"
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