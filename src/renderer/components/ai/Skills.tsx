import React from 'react';

interface SkillsProps {
  onRunSkill: (skill: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({ onRunSkill }) => {
  const skillList = [
    'Summarize Page',
    'Extract Interactive Controls',
    'Market Research Audit',
    'Candidate Sourcing',
  ];

  return (
    <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
      <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
        Available Automation Skills
      </span>
      {skillList.map((skill) => (
        <button
          key={skill}
          onClick={() => onRunSkill(`Run skill: ${skill}`)}
          className="p-2 text-left rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-accent-border)] text-xs text-[var(--browser-text-primary)] transition-colors"
        >
          {skill}
        </button>
      ))}
    </div>
  );
};
