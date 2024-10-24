// app/utils/beta/use-processor-logic.ts

import { useState, useEffect } from 'react';
import { FileService } from './file-service';

export function useProcessorLogic(file: File | null) {
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [filename, setFilename] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function uploadAndGetColumns() {
      if (file) {
        try {
          const { filename: uploadedFilename, columns: columnsList } = 
            await FileService.uploadAndGetColumns(file);
          setFilename(uploadedFilename);
          setColumns(columnsList);
        } catch (error) {
          console.error('Error uploading file or getting columns:', error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      }
    }

    void uploadAndGetColumns();
  }, [file]);

  const handleColumnToggle = (index: number) => {
    setSelectedColumns(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return {
    columns,
    selectedColumns,
    filename,
    error,
    handleColumnToggle
  };
}
