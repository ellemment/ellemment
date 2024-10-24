// app/components/beta/output-section.tsx

import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '#app/components/ui/table';

interface OutputSectionProps {
  summary: string | null;
  outputData: {
    check_filename_csv?: string;
    check_filename_excel?: string;
    final_filename_csv?: string;
    final_filename_excel?: string;
    rows?: number;
    columns?: string[];
  } | null;
}

export function OutputSection({ summary, outputData }: OutputSectionProps) {
  const [processedData, setProcessedData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
 
  const fetchProcessedData = useCallback(async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:8000/download/${filename}`);
      const text = await response.text();
      const rows = text.split('\n').map((row: string) => row.split(','));
      const headerRow = rows[0];
      
      if (!headerRow) {
        console.error('No header row found in the CSV file');
        return;
      }
  
      const data = rows.slice(1).filter((row: string[]) => row.some((cell: string) => cell.trim() !== ''));
      
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
    console.log("OutputSection props updated:", { summary, outputData });
    if (outputData?.final_filename_csv) {
      void fetchProcessedData(outputData.final_filename_csv);
    }
  }, [outputData, fetchProcessedData, summary]);

  const handleDownload = async (fileType: 'csv' | 'excel', isCheck: boolean) => {
    console.log(`Attempting to download ${fileType} file. isCheck: ${isCheck}`);
    if (outputData) {
      try {
        const filename = isCheck
          ? (fileType === 'csv' ? outputData.check_filename_csv : outputData.check_filename_excel)
          : (fileType === 'csv' ? outputData.final_filename_csv : outputData.final_filename_excel);
        
        if (!filename) {
          console.error(`${fileType.toUpperCase()} file not available`);
          return;
        }
        
        const encodedFilename = encodeURIComponent(filename);
        const response = await fetch(`http://localhost:8000/download/${encodedFilename}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
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
    } else {
      console.log("Output data is null, download not possible");
    }
  };

  return (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Output</h2>
      {summary && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      {outputData && (
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Output Data</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <button
            onClick={() => void handleDownload('csv', true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!outputData?.check_filename_csv}
          >
            Download Check CSV
          </button>
          <button
            onClick={() => void handleDownload('excel', true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
            disabled={!outputData?.check_filename_excel}
          >
            Download Check Excel
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => void handleDownload('csv', false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!outputData?.final_filename_csv}
          >
            Download Final CSV
          </button>
          <button
            onClick={() => void handleDownload('excel', false)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
            disabled={!outputData?.final_filename_excel}
          >
            Download Final Excel
          </button>
        </div>
      </div>
    </div>
  );
}
