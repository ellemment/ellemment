// app/utils/beta/use-output-data.ts

import { useState, useEffect, useCallback } from 'react';
import { FileService } from './file-service';
import  { type OutputData } from './types';

export function useOutputData(outputData: OutputData | null) {
  const [processedData, setProcessedData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);

  const fetchProcessedData = useCallback(async (filename: string) => {
    try {
      const rows = await FileService.fetchProcessedData(filename);
      const headerRow = rows[0];
      
      if (!headerRow) {
        console.error('No header row found in the CSV file');
        return;
      }
  
      const data = rows.slice(1).filter((row: string[]) => 
        row.some((cell: string) => cell.trim() !== '')
      );
      
      const processedHeaders = headerRow.filter((_: string, index: number) => 
        data.some((row: string[]) => row[index] && row[index].trim() !== '')
      );
      
      const processedData = data.map((row: string[]) => 
        processedHeaders.map((header: string) => row[headerRow.indexOf(header)] || '')
      );
  
      setHeaders(processedHeaders);
      setProcessedData(processedData);
    } catch (error) {
      console.error('Error fetching processed data:', error);
    }
  }, []);

  useEffect(() => {
    if (outputData?.final_filename_csv) {
      void fetchProcessedData(outputData.final_filename_csv);
    }
  }, [outputData, fetchProcessedData]);

  const handleDownload = async (fileType: 'csv' | 'excel', isCheck: boolean) => {
    if (outputData) {
      try {
        const filename = isCheck
          ? (fileType === 'csv' ? outputData.check_filename_csv : outputData.check_filename_excel)
          : (fileType === 'csv' ? outputData.final_filename_csv : outputData.final_filename_excel);
        
        if (!filename) {
          console.error(`${fileType.toUpperCase()} file not available`);
          return;
        }
        
        const blob = await FileService.downloadFile(filename, fileType);
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  return {
    processedData,
    headers,
    handleDownload
  };
}