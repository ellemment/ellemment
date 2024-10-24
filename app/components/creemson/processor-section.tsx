// app/components/creemson/processor-section.tsx

import React, { useState, useEffect } from 'react';
import { getColumns, uploadFile } from '#app/utils/creemson/creemson-api.js';

interface ProcessorSectionProps {
  onProcess: (filename: string, selectedColumns: number[]) => void;
  isProcessing: boolean;
  logs: string[];
  file: File | null;
}

export function ProcessorSection({ onProcess, isProcessing, logs, file }: ProcessorSectionProps) {
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function uploadAndGetColumns() {
      if (file) {
        try {
          console.log('Uploading file...');
          const uploadedFilename = await uploadFile(file);
          console.log('File uploaded successfully. Filename:', uploadedFilename);
          setFilename(uploadedFilename);
  
          console.log('Fetching columns...');
          const columnsList = await getColumns(uploadedFilename);
          console.log('Columns fetched successfully:', columnsList);
          setColumns(columnsList);
        } catch (error) {
          console.error('Error uploading file or getting columns:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      }
    }
  
    // Use void to explicitly ignore the promise
    void (async () => {
      try {
        await uploadAndGetColumns();
      } catch (error) {
        console.error('Error in uploadAndGetColumns:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    })();
  
  }, [file]);
  const handleColumnToggle = (index: number) => {
    setSelectedColumns(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleProcess = () => {
    if (filename) {
      onProcess(filename, selectedColumns);
    }
  };

  return (
    <div className="p-6">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select columns to process:</h3>
        {columns.length > 0 ? (
          columns.map((column, index) => (
            <label key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedColumns.includes(index)}
                onChange={() => handleColumnToggle(index)}
                className="mr-2"
              />
              {index}: {column}
            </label>
          ))
        ) : (
          <p>No columns available. {file ? 'Processing file...' : 'Please upload a file.'}</p>
        )}
      </div>
      <button
        onClick={handleProcess}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 mb-4"
        disabled={isProcessing || selectedColumns.length === 0 || !filename}
      >
        {isProcessing ? 'Processing...' : 'Process File'}
      </button>
      <div className="mt-4 h-64 overflow-y-auto p-4 rounded border">
        {logs.map((log, index) => (
          <div key={index} className="text-sm">{log}</div>
        ))}
      </div>
    </div>
  );
}