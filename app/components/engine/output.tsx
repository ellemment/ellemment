// app/components/engine/output.tsx

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '#app/components/ui/table';
import  { type OutputData } from '#app/utils/beta/types';
import { useOutputData } from '#app/utils/beta/use-output-data';

interface OutputSectionProps {
  summary: string | null;
  outputData: OutputData | null;
}

export function OutputSection({ summary, outputData }: OutputSectionProps) {
  const { processedData, headers, handleDownload } = useOutputData(outputData);

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
            onClick={() => handleDownload('csv', true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!outputData?.check_filename_csv}
          >
            Download Check CSV
          </button>
          <button
            onClick={() => handleDownload('excel', true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
            disabled={!outputData?.check_filename_excel}
          >
            Download Check Excel
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleDownload('csv', false)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            disabled={!outputData?.final_filename_csv}
          >
            Download Final CSV
          </button>
          <button
            onClick={() => handleDownload('excel', false)}
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
