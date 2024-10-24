// app/utils/beta/types.ts

export interface OutputData {
    check_filename_csv: string | null;
    check_filename_excel: string | null;
    final_filename_csv: string | null;
    final_filename_excel: string | null;
    rows: number | null;
    columns: string[] | null;
  }
  
  export interface LoaderData {
    apiAccessible: boolean;
  }
  
  export interface ProcessFileOptions {
    filename: string;
    selectedColumns: number[];
    onLog: (log: string) => void;
  }