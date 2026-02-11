"use client";

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

  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 overflow-y-auto py-20">
      <div className="container mx-auto px-8">
        <h2 className="section-title text-center mb-12">Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {works.map((work, index) => (
            <div
              key={index}
              onClick={() =>
                onWorkClick?.({
                  title: work.title,
                  description: work.description,
                })
              }
              className="card cursor-pointer transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-6xl text-center mb-4">{work.image}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {work.title}
              </h3>

              {/* description は表示しない */}

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
          ))}
        </div>
      </div>
    </section>
  );
}
