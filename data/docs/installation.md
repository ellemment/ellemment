---
title: Installation Guide
summary: Comprehensive installation instructions for Creemson Engine, including environment setup, dependencies, and platform-specific configurations
date: 2024-03-23
---

# Installation Guide

## System Requirements

### Hardware Requirements
- CPU: 2+ cores recommended
- RAM: Minimum 4GB (8GB recommended)
- Disk Space: 1GB minimum for installation and data

### Software Requirements
- Python 3.8 or higher
- pip (Python package manager)
- git (for version control)
- Operating System:
  - macOS 10.x or later
  - Windows 10 or later

## Prerequisites Installation

### 1. Python Installation

#### For macOS
```bash
# Using Homebrew
brew install python@3.8

# Verify installation
python3 --version
pip3 --version
```

#### For Windows
1. Download Python from [python.org](https://www.python.org/downloads/)
2. Run the installer
3. Check "Add Python to PATH" during installation
4. Verify installation:
```bash
python --version
pip --version
```

### 2. Git Installation

#### For macOS
```bash
brew install git
```

#### For Windows
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer with default settings

## Creemson Engine Installation

### 1. Project Setup

```bash
# Create project directory
mkdir -p /path/to/Creemson
cd /path/to/Creemson

# Clone repository
git clone [repository-url]
```

### 2. Platform-Specific Installation

#### For macOS

```bash
# Navigate to engine directory
cd engine

# Make setup script executable
chmod +x setup.sh

# Run setup script
./setup.sh mac
```

#### For Windows

```bash
# Navigate to engine directory
cd engine

# Run setup script
setup.bat windows
```

## Detailed Installation Steps

### 1. Virtual Environment Setup

The setup scripts create a virtual environment in the parent directory:

```bash
# Virtual environment location
/path/to/Creemson/creemson_venv/
```

The scripts automatically:
1. Create the virtual environment
2. Activate it
3. Install dependencies

### 2. Dependencies Installation

The following key dependencies are installed from `requirements.txt`:

```text
fastapi==0.115.0
uvicorn==0.31.0
pandas==2.2.3
numpy==1.26.4
scikit-learn==1.5.2
requests==2.32.3
python-multipart==0.0.12
websockets==13.1
spacy==3.7.5
ginza==5.2.0
ja-ginza==5.2.0
cloudpickle==3.0.0
```

### 3. Directory Structure Creation

The installation process creates the following directory structure:

```
Creemson/
├── creemson_venv/
└── engine/
    ├── data/
    │   ├── uploads/
    │   ├── outputs/
    │   └── input/
    │       ├── csv/
    │       ├── vector/
    │       └── utils/
    ├── src/
    │   ├── common/
    │   │   └── api/
    │   └── engine/
    │       └── v1/
    └── config.py
```

## Configuration Setup

### 1. Environment Configuration

Edit `config.py` to set up your environment:

```python
# API Configuration
MOHE_API_URL = 'https://ichiba-mls-llm-dev.rcprakuten.com/science/ichiba/classification?taxonomy_name=ichiba&result_limit={}'
MOHE_API_MAX_SIZE = 1

# Data Processing
LIMIT_ROWS = 20

# File Paths
DATA_DIR = 'data'
UPLOADS_DIR = os.path.join(DATA_DIR, 'uploads')
OUTPUTS_DIR = os.path.join(DATA_DIR, 'outputs')
```

### 2. Data Directory Setup

Ensure required data directories exist:

```bash
# Create necessary directories
mkdir -p data/uploads
mkdir -p data/outputs
mkdir -p data/input/csv
mkdir -p data/input/vector
mkdir -p data/input/utils
```

## Verification Steps

### 1. Installation Verification

After installation, verify the setup:

```bash
# Mac
source creemson_venv/bin/activate

# Windows
call creemson_venv\Scripts\activate.bat

# Verify Python packages
pip list
```

### 2. Application Startup Test

```bash
# Mac
./start.sh mac

# Windows
start.bat windows
```

The application should start and be available at `http://localhost:8000`

## Common Installation Issues

### 1. Virtual Environment Issues

Problem: Virtual environment not creating properly

Solution:
```bash
# Manual virtual environment creation
python -m venv creemson_venv

# Activation
# Mac
source creemson_venv/bin/activate
# Windows
.\creemson_venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### 2. Dependency Conflicts

Problem: Package conflicts during installation

Solution:
```bash
# Clear pip cache
pip cache purge

# Force reinstall dependencies
pip install --no-cache-dir -r requirements.txt
```

### 3. Permission Issues

Problem: Permission denied during setup

Solution:
```bash
# Mac
chmod +x setup.sh
chmod +x start.sh

# Run with sudo if needed
sudo ./setup.sh mac
```

## Post-Installation Setup

### 1. Initial Configuration

1. Review and adjust settings in `config.py`
2. Set up logging configuration
3. Configure API endpoints

### 2. Data Directory Initialization

1. Place required input files in `data/input/csv/`
2. Initialize vector files in `data/input/vector/`
3. Set up utility files in `data/input/utils/`

## Upgrading

To upgrade existing installation:

```bash
# Pull latest changes
git pull origin main

# Activate virtual environment
source creemson_venv/bin/activate  # Mac
call creemson_venv\Scripts\activate.bat  # Windows

# Update dependencies
pip install -r requirements.txt --upgrade
```

## Security Considerations

1. Review file permissions
2. Configure firewall settings
3. Set up SSL/TLS if needed
4. Review API security settings

## Additional Resources

- [Project Structure](project-structure.md)
- [Configuration Guide](configuration-guide.md)
- [Troubleshooting Guide](troubleshooting-guide.md)

## Support

For installation support:
1. Check the troubleshooting guide
2. Review application logs
3. Contact the development team

This completes the installation guide for Creemson Engine. For further assistance, refer to additional documentation or contact support.