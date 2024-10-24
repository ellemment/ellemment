---
title: Project Structure
summary: Detailed explanation of Creemson Engine's project structure, component organization, and file hierarchy
date: 2024-03-23
---

# Project Structure

## Directory Overview

The Creemson Engine follows a modular, hierarchical structure optimized for scalability and maintainability. Below is the complete project structure with detailed explanations of each component.

```
Creemson/
├── creemson_venv/                  # Virtual environment
└── engine/
    ├── config.py                   # Global configuration
    ├── requirements.txt            # Project dependencies
    ├── README.md                   # Project documentation
    ├── engine.py                   # Application entry point
    ├── setup.bat                   # Windows setup script
    ├── setup.sh                    # Mac setup script
    ├── start.bat                   # Windows start script
    ├── start.sh                    # Mac start script
    ├── data/                       # Data directory
    │   ├── uploads/                # Temporary upload storage
    │   ├── outputs/                # Processed results
    │   └── input/                  # Input data resources
    │       ├── csv/                # CSV data files
    │       │   └── genreID2attrGroup.csv
    │       ├── vector/             # Vector data files
    │       │   ├── all_attributes_vector.pkl
    │       │   ├── attrVal_per_group_refine_numstr.pkl
    │       │   └── attr_group_vectors/
    │       └── utils/              # Utility modules
    │           ├── units.py
    │           ├── attributes.py
    │           └── rms_format.py
    └── src/
        ├── common/                 # Shared components
        │   └── api/
        │       ├── api_socket.py   # WebSocket implementation
        │       └── api_client.py   # API client utilities
        └── engine/
            └── v1/                 # Engine version 1
                ├── utils/
                │   └── logconfig.py
                ├── processors/
                │   ├── processor.py
                │   └── utils/
                │       ├── route_upload.py
                │       ├── route_process.py
                │       ├── route_columns.py
                │       └── route_download.py
                ├── transformers/
                │   ├── data_handler.py
                │   ├── data_processor.py
                │   └── data_loader.py
                └── classifiers/
                    ├── classifier.py
                    └── helpers.py
```

## Core Components

### 1. Entry Points and Configuration

#### `engine.py`
The main application entry point that:
- Initializes FastAPI application
- Sets up WebSocket endpoints
- Configures routers
- Starts the server

```python
# engine.py
from src.common.api.api_client import create_app
from src.engine.v1.processors.processor import router as api_router
from src.common.api.api_socket import websocket_endpoint

app = create_app()
app.include_router(api_router)
app.add_api_websocket_route("/ws", websocket_endpoint)
```

#### `config.py`
Global configuration file containing:
- API settings
- File paths
- Processing parameters
- Constants

```python
# config.py
# Data Loading
LIMIT_ROWS = 20

# API Configuration
MOHE_API_RESULT_LIMIT = 3
MOHE_API_URL = 'https://ichiba-mls-llm-dev.rcprakuten.com/science/ichiba/classification'

# Path Configuration
DATA_DIR = 'data'
UPLOADS_DIR = os.path.join(DATA_DIR, 'uploads')
OUTPUTS_DIR = os.path.join(DATA_DIR, 'outputs')
```

### 2. Source Code Organization (`src/`)

#### API Layer (`src/common/api/`)
Handles all API-related functionality:

```python
src/common/api/
├── api_client.py    # FastAPI application creation and configuration
└── api_socket.py    # WebSocket implementation for real-time communication
```

#### Engine Core (`src/engine/v1/`)
Contains the main processing logic:

```python
src/engine/v1/
├── processors/      # Request processing
├── transformers/    # Data transformation
├── classifiers/     # Classification logic
└── utils/          # Utility functions
```

### 3. Data Directory Structure

```python
data/
├── uploads/         # Temporary storage for uploaded files
├── outputs/         # Processed output files
└── input/          # Input data and resources
    ├── csv/        # CSV data files
    ├── vector/     # Vector data files
    └── utils/      # Utility modules
```

## Module Details

### 1. Processors

Located in `src/engine/v1/processors/`, handles request processing:

```python
processors/
├── processor.py     # Main processor logic
└── utils/
    ├── route_upload.py    # File upload handling
    ├── route_process.py   # Data processing
    ├── route_columns.py   # Column management
    └── route_download.py  # File download handling
```

### 2. Transformers

Located in `src/engine/v1/transformers/`, manages data transformation:

```python
transformers/
├── data_handler.py    # Data handling utilities
├── data_processor.py  # Data processing logic
└── data_loader.py     # Data loading functions
```

### 3. Classifiers

Located in `src/engine/v1/classifiers/`, implements classification logic:

```python
classifiers/
├── classifier.py    # Main classification logic
└── helpers.py      # Helper functions
```

## Code Organization Principles

### 1. Module Independence
- Each module has a specific responsibility
- Minimal interdependence between modules
- Clear interfaces between components

### 2. Version Control
- Version-specific implementations (`v1`)
- Easy to add new versions
- Backward compatibility support

### 3. Resource Management
- Clear separation of data files
- Organized input/output structure
- Centralized configuration

## Development Workflow

### 1. Adding New Features
1. Create appropriate module in version directory
2. Update processor routes if needed
3. Add configuration in `config.py`
4. Update documentation

### 2. Modifying Existing Features
1. Locate relevant module
2. Make changes within version scope
3. Update tests and documentation
4. Maintain backward compatibility

## Best Practices

### 1. File Organization
- Keep related files together
- Use clear, descriptive names
- Maintain consistent structure

### 2. Module Dependencies
- Minimize circular dependencies
- Use dependency injection
- Keep modules loosely coupled

### 3. Configuration Management
- Use `config.py` for settings
- Avoid hardcoded values
- Document all configuration options

## Common Modifications

### 1. Adding New Routes
1. Create route handler in `processors/utils/`
2. Register in `processor.py`
3. Update API documentation

### 2. Extending Classifiers
1. Add new classifier in `classifiers/`
2. Update helper functions if needed
3. Register in main classifier

## Related Documentation

- [Architecture Overview](architecture-overview.md)
- [Configuration Guide](configuration-guide.md)
- [API Reference](api-reference.md)
- [Development Guide](developer-guide.md)

## Future Structure Considerations

The project structure is designed to accommodate:
1. New API versions
2. Additional processing modules
3. Extended classification capabilities
4. Enhanced data handling features

This structure documentation provides a comprehensive overview of the Creemson Engine project organization, helping developers understand and navigate the codebase effectively.