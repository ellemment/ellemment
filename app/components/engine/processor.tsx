import React from 'react';
import { useProcessorLogic } from '#app/utils/beta/use-processor-logic';
import ProcessorLogs from './log';

interface ProcessorSectionProps {
  onProcess: (filename: string, selectedColumns: number[]) => void;
  isProcessing: boolean;
  logs: string[];
  file: File | null;
}

export function ProcessorSection({
  onProcess,
  isProcessing,
  logs,
  file
}: ProcessorSectionProps) {
  const {
    columns,
    selectedColumns,
    filename,
    error,
    handleColumnToggle
  } = useProcessorLogic(file);

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
      
      {isProcessing && (
        <div className="mt-4 bg-background rounded-lg p-4 border">
          <ProcessorLogs logs={logs} />
        </div>
      )}
    </div>
  );
}