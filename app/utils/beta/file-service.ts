// app/utils/beta/file-service.ts

import { getColumns, uploadFile, processFile } from '#app/utils/creemson/creemson-api';
import { type ProcessFileOptions } from './types';

export class FileService {
  static async uploadAndGetColumns(file: File): Promise<{ filename: string; columns: string[] }> {
    const uploadedFilename = await uploadFile(file);
    const columnsList = await getColumns(uploadedFilename);
    return { filename: uploadedFilename, columns: columnsList };
  }

  static async processFile(options: ProcessFileOptions) {
    return processFile(options);
  }

  static async downloadFile(filename: string, _fileType: 'csv' | 'excel') {
    const encodedFilename = encodeURIComponent(filename);
    const response = await fetch(`http://localhost:8000/download/${encodedFilename}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.blob();
  }

  static async fetchProcessedData(filename: string) {
    const response = await fetch(`http://localhost:8000/download/${filename}`);
    const text = await response.text();
    return text.split('\n').map((row: string) => row.split(','));
  }
}