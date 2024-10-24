---
title: Getting Started
summary: A comprehensive guide to getting started with Creemson Engine, including setup, basic concepts, and first steps
date: 2024-03-23
---

# Getting Started with Creemson Engine

## Overview

Creemson Engine is a high-performance data processing and classification system built with Python, leveraging FastAPI for API endpoints and WebSocket communication. The engine specializes in processing and analyzing data with a focus on attribute mapping and classification.

## Prerequisites

Before you begin, ensure you have:

- Python 3.x installed
- pip package manager
- Basic understanding of Python and web APIs
- Access to development environment (Mac or Windows)

## System Requirements

- Operating System: 
  - macOS 10.x or later
  - Windows 10 or later
- Memory: Minimum 4GB RAM (8GB recommended)
- Storage: At least 1GB free space
- Python: Version 3.8 or higher

## Quick Installation

### For Mac Users

```bash
# Clone the repository
cd /path/to/workspace
git clone [repository-url]

# Navigate to engine directory
cd Creemson/engine

# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh mac
```

### For Windows Users

```bash
# Clone the repository
cd C:\path\to\workspace
git clone [repository-url]

# Navigate to engine directory
cd Creemson\engine

# Run setup script
setup.bat windows
```

## Project Structure Overview

```
Creemson/
├── creemson_venv/            # Virtual environment
└── engine/
    ├── config.py            # Configuration settings
    ├── requirements.txt     # Dependencies
    ├── README.md           # Project documentation
    ├── engine.py           # Main application file
    ├── setup.bat           # Windows setup script
    ├── setup.sh            # Mac setup script
    ├── start.bat           # Windows start script
    ├── start.sh            # Mac start script
    └── src/                # Source code
        ├── common/         # Common utilities
        └── engine/         # Core engine code
```

## Basic Concepts

### 1. Data Processing Pipeline

The engine processes data through several stages:

1. **File Upload**: Submit data files for processing
2. **Column Selection**: Choose relevant columns for analysis
3. **Classification**: Automatic data classification
4. **Attribute Mapping**: Map data to predefined attributes
5. **Result Generation**: Produce processed output

### 2. API Communication

The engine provides two communication methods:

1. **REST API Endpoints**:
   - File upload/download
   - Process control
   - Status checks

2. **WebSocket Communication**:
   - Real-time progress updates
   - Live data streaming
   - Event notifications

## Getting Started Steps

### 1. Start the Engine

After installation, start the engine:

```bash
# Mac
./start.sh mac

# Windows
start.bat windows
```

The server will start on `http://localhost:8000`

### 2. Basic File Processing

Here's a simple example using Python requests:

```python
import requests

# Upload a file
with open('data.csv', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/upload',
        files={'file': f}
    )
filename = response.json()['filename']

# Get column information
columns = requests.get(
    f'http://localhost:8000/columns/{filename}'
).json()

# Process file
result = requests.post(
    'http://localhost:8000/process',
    json={
        'filename': filename,
        'selectedColumns': [0, 1, 2]
    }
).json()
```

### 3. WebSocket Communication

Example of WebSocket usage:

```python
import websockets
import json
import asyncio

async def process_file():
    uri = "ws://localhost:8000/ws"
    async with websockets.connect(uri) as websocket:
        await websocket.send(json.dumps({
            'filename': 'data.csv',
            'selectedColumns': [0, 1, 2]
        }))
        
        result = await websocket.recv()
        print(json.loads(result))

asyncio.get_event_loop().run_until_complete(process_file())
```

## Configuration

Basic configuration is handled in `config.py`:

```python
# Data Processing
LIMIT_ROWS = 20

# API Configuration
MOHE_API_RESULT_LIMIT = 3

# File Paths
UPLOADS_DIR = os.path.join(DATA_DIR, 'uploads')
OUTPUTS_DIR = os.path.join(DATA_DIR, 'outputs')
```

## Next Steps

After getting started, you might want to explore:

1. [Installation Guide](installation.md) - Detailed installation instructions
2. [Project Structure](project-structure.md) - In-depth project organization
3. [FastAPI Integration](fastapi-integration.md) - API implementation details
4. [Classification System](classification-system.md) - Understanding data classification
5. [Data Processing Pipeline](data-processing-pipeline.md) - Detailed processing workflow

## Common Initial Issues

1. **Installation Problems**
   - Ensure Python version compatibility
   - Check virtual environment activation
   - Verify all dependencies are installed

2. **Connection Issues**
   - Confirm server is running
   - Check port availability
   - Verify network settings

3. **Processing Errors**
   - Validate input file format
   - Check column selections
   - Monitor server logs

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](troubleshooting-guide.md)
2. Review server logs in the console
3. Refer to [API Documentation](api-reference.md)
4. Contact the development team

## Security Considerations

When getting started, keep in mind:

1. **File Upload Security**
   - Limit file sizes
   - Validate file types
   - Sanitize filenames

2. **API Security**
   - Use secure connections
   - Implement authentication
   - Follow security best practices

## Version Compatibility

Current version supports:

- Python 3.8+
- FastAPI 0.115.0
- All major OS platforms
- Modern web browsers

The getting started guide aims to provide a smooth onboarding experience. For more detailed information, refer to specific documentation sections or reach out to the development team.