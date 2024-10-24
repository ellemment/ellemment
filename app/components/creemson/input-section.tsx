// app/components/creemson/input-section.tsx

import React from 'react';

interface InputSectionProps {
  onFileChange: (file: File | null) => void;
}

export function InputSection({ onFileChange }: InputSectionProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Input</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv,.tsv,.xls,.xlsx"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}