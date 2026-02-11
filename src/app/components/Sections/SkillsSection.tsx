"use client";

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
        "Playwright",
        "Selenium",
        "Jira",
        "Slack",
        "Confluence",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-8">
        <h2 className="section-title text-center mb-16">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {skills.map((category) => (
            <div
              key={category.key}
              onClick={() => onSkillClick?.(category.key)}
              className="group cursor-pointer rounded-3xl bg-white/70 backdrop-blur-sm
                        shadow-lg p-8 transition-all duration-300
                        hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}