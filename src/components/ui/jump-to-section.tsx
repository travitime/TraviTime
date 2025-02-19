"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Section = {
  id: string;
  label: string;
};

type JumpToSectionProps = {
  sections: Section[];
  className?: string;
};

export function JumpToSection({ sections, className }: JumpToSectionProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection: string | null = null;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const { top, height } = element.getBoundingClientRect();
          if (top <= 100 && top + height >= 100) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <nav className={cn("w-48 space-y-2 sticky top-4 p-4", className)}>
      <h5 className="text-base">On this page:</h5>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={cn(
            "block px-2 py-1 rounded-md text-sm font-medium transition-colors",
            activeSection === id
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-200"
          )}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
