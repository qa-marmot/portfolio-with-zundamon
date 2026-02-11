'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  onSectionClick?: (section: string) => void;
}

export default function Header({ onSectionClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', label: 'Home', index: 0 },
    { id: 'works', label: 'Works', index: 1 },
    { id: 'skills', label: 'Skills', index: 2 },
    { id: 'about', label: 'About', index: 3 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // アクティブセクションの検出
      const headerHeight = 73;
      const scrollPosition = window.scrollY + headerHeight;
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.round(scrollPosition / windowHeight);
      const newActiveSection = sections[Math.min(sectionIndex, sections.length - 1)];
      if (newActiveSection) {
        setActiveSection(newActiveSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, index: number) => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * index,
      behavior: 'smooth',
    });
    setIsMobileMenuOpen(false);
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* ロゴ */}
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('intro', 0)}
            >
              <div className="w-10 h-10 bg-gradient-to-br rounded-full flex items-center justify-center">
                <img src="./image/QAmamo.png" alt="プロフィール画像" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">M.Y.Portfolio</h1>
                <p className="text-xs text-gray-500">with ずんだもん</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id, section.index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-zunda-primary text-white'
                      : 'text-gray-700 hover:bg-zunda-primary/10 hover:text-zunda-dark'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}