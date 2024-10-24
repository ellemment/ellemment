// app/components/creemson/title-section.tsx

import React from 'react';

interface SectionTitleProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export function SectionTitle({ title, isActive, onClick }: SectionTitleProps) {
  return (
    <h2
      className={`text-2xl font-semibold p-4 mb-4 cursor-pointer ${
        isActive ? 'text-blue-600' : 'text-gray-400'
      }`}
      onClick={onClick}
    >
      {title}
    </h2>
  );
}
