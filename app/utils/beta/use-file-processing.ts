  // app/utils/beta/use-file-processing.ts
  import { useState } from 'react';
  import { FileService } from './file-service';
  import { type OutputData } from './types'; 
  export function useFileProcessing() {
    const [currentStep, setCurrentStep] = useState(1);
    const [summary, setSummary] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [outputData, setOutputData] = useState<OutputData>({
      check_filename_csv: null,
      check_filename_excel: null,
      final_filename_csv: null,
      final_filename_excel: null,
      rows: null,
      columns: null
    });
  
    const handleFileChange = (selectedFile: File | null) => {
      setFile(selectedFile);
      setLogs([]);
    };
  
    const handleProcess = async (filename: string, selectedColumns: number[]) => {
      try {
        setIsProcessing(true);
        setCurrentStep(2);
        setLogs([]);
        
        const result = await FileService.processFile({
          filename,
          selectedColumns,
          onLog: (log: string) => {
            setLogs((prevLogs) => [...prevLogs, log]);
          }
        });
        
        setSummary("Processing complete");
        setOutputData(result.output_data);
        setCurrentStep(3);
      } catch (error) {
        console.error('Error processing file:', error);
        setSummary("Error processing file");
      } finally {
        setIsProcessing(false);
      }
    };
  
    return {
      currentStep,
      setCurrentStep,
      summary,
      file,
      isProcessing,
      logs,
      outputData,
      handleFileChange,
      handleProcess
    };
  }