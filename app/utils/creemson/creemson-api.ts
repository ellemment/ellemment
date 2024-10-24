// app/utils/creemson/creemson-api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';
const WS_BASE_URL = 'ws://localhost:8000';

interface ProcessFileOptions {
  filename: string;
  selectedColumns: number[];
  onLog: (log: string) => void;
}

interface WebSocketMessage {
  type: 'log' | 'result';
  message?: string;
  data?: any;
}

export async function uploadFile(file: File): Promise<string> {
  console.log(`Uploading file: ${file.name}`);
  const formData = new FormData();
  formData.append('file', file);
  try {
    console.log('Sending POST request to upload file');
    const response = await axios.post<{ filename: string }>(`${API_BASE_URL}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(`File uploaded successfully. Server response:`, response.data);
    return response.data.filename;
  } catch (error) {
    console.error('File upload failed:', error);
    throw new Error(`File upload failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getColumns(filename: string): Promise<string[]> {
  console.log(`Fetching columns for file: ${filename}`);
  try {
    console.log(`Sending GET request to fetch columns`);
    const response = await axios.get<string[]>(`${API_BASE_URL}/columns/${encodeURIComponent(filename)}`);
    console.log(`Columns fetched successfully. Columns:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch columns:', error);
    throw new Error(`Failed to fetch columns: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function processFile({ filename, selectedColumns, onLog }: ProcessFileOptions): Promise<any> {
  console.log(`Processing file: ${filename}, Selected columns:`, selectedColumns);
  try {
    console.log('Attempting WebSocket connection');
    const result = await tryWebSocketConnection({ filename, selectedColumns, onLog });
    if (result) {
      console.log("Received data from backend via WebSocket:", result);
      return result;
    }
    console.log('WebSocket connection failed or timed out. Falling back to HTTP request');
    return await makeHttpRequest({ filename, selectedColumns, onLog });
  } catch (error) {
    console.error('Error in processFile:', error);
    handleError(error, onLog);
    throw error;
  }
}

async function tryWebSocketConnection({ filename, selectedColumns, onLog }: ProcessFileOptions): Promise<any | null> {
  console.log('Initiating WebSocket connection');
  return new Promise((resolve) => {
    const socket = new WebSocket(`${WS_BASE_URL}/ws`);
    const timeout = setTimeout(() => {
      console.log('WebSocket connection timeout');
      socket.close();
      onLog('WebSocket connection timeout. Falling back to HTTP.');
      resolve(null);
    }, 5000);

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      clearTimeout(timeout);
      onLog('WebSocket connection established');
      const message = JSON.stringify({ filename, selectedColumns });
      console.log('Sending message via WebSocket:', message);
      socket.send(message);
    };

    socket.onmessage = (event) => {
      console.log('Received WebSocket message:', event.data);
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        if (data.type === 'log' && data.message) {
          console.log('Received log message:', data.message);
          onLog(data.message);
        } else if (data.type === 'result' && data.data) {
          console.log('Received result data:', data.data);
          resolve(data.data);
          socket.close();
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        onLog(`Error parsing WebSocket message: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    socket.onerror = (event) => {
      console.error('WebSocket error:', event);
      clearTimeout(timeout);
      onLog('WebSocket connection failed. Falling back to HTTP.');
      resolve(null);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      clearTimeout(timeout);
      onLog('WebSocket connection closed');
    };
  });
}

async function makeHttpRequest({ filename, selectedColumns, onLog }: ProcessFileOptions): Promise<any> {
  console.log('Making HTTP request');
  onLog('Making HTTP request');
  try {
    console.log('Sending POST request to process file');
    const response = await axios.post(`${API_BASE_URL}/process`, { filename, selectedColumns });
    console.log('HTTP request successful. Response:', response.data);
    onLog('Processing complete');
    return response.data;
  } catch (error) {
    console.error('HTTP request failed:', error);
    throw new Error(`HTTP request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function handleError(error: unknown, onLog: (log: string) => void) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('Error in processFile:', errorMessage);
  onLog(`Error: ${errorMessage}`);
}

export async function checkApiStatus(): Promise<boolean> {
  console.log('Checking API status');
  try {
    console.log('Sending GET request to check API status');
    const response = await axios.get(`${API_BASE_URL}/status`);
    console.log('API status check successful. Status:', response.status);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking API status:', error);
    return false;
  }
}