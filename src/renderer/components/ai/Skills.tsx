import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface SkillsProps {
  onRunSkill: (skill: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onRunSkill }) => {
  const skillList = [
    { title: 'Summarize Page', desc: 'Synthesize main takeaways & action items' },
    { title: 'Extract Interactive Controls', desc: 'Map interactive input & button references' },
    { title: 'Market Research Audit', desc: 'Synthesize competitor pricing & feature matrix' },
    { title: 'Compare Products', desc: 'Extract key specs into structured comparisons' },
    { title: 'Form Auto-Fill', desc: 'Intelligently complete form inputs' },
  ];

  return (
    <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto select-none">
      <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
        Automation Skills
      </span>
      <div className="flex flex-col gap-2">
        {skillList.map((skill) => (
          <button
            key={skill.title}
            onClick={() => onRunSkill(`Run skill: ${skill.title}`)}
            className="p-3 text-left rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-cyan-border)] hover:bg-[var(--browser-surface-hover)] text-xs text-[var(--browser-text-primary)] transition-all group flex items-center justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-[var(--browser-text-primary)] group-hover:text-[var(--browser-accent-cyan)] transition-colors">
                {skill.title}
              </span>
              <span className="text-[11px] text-[var(--browser-text-muted)]">
                {skill.desc}
              </span>
            </div>
            <Play size={12} className="text-[var(--browser-accent-cyan)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
};
