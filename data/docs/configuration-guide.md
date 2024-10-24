---
title: Configuration Guide
summary: Comprehensive guide to configuring the Creemson Engine, including environment settings, API configuration, processing parameters, and customization options
date: 2024-03-23
---

# Configuration Guide

## Overview

This guide covers all configuration aspects of the Creemson Engine, from basic setup to advanced customization. The configuration system is designed to be flexible, maintainable, and environment-aware.

## Core Configuration File

The main configuration is managed through `config.py` in the root directory:

```python
# config.py

import os

# Data Loading
LIMIT_ROWS = 20

# API Configuration
MOHE_API_RESULT_LIMIT = 3
MOHE_API_URL = 'https://ichiba-mls-llm-dev.rcprakuten.com/science/ichiba/classification?taxonomy_name=ichiba&result_limit={}'
MOHE_API_MAX_SIZE = 1

# Directory Paths
DATA_DIR = 'data'
UPLOADS_DIR = os.path.join(DATA_DIR, 'uploads')
OUTPUTS_DIR = os.path.join(DATA_DIR, 'outputs')

# Input Data Paths
GENRE_CSV_PATH = os.path.join(DATA_DIR, 'input/csv/genreID2attrGroup.csv')
MERCHANT_INPUT_PICKLE_PATH = os.path.join(DATA_DIR, 'input/vector/20240604_attributeUnitNames_byAttrGroupGenres.pickle')
ATTRIBUTES_VECTOR_PATH = os.path.join(DATA_DIR, 'input/vector/all_attributes_vector.pkl')
ATTR_VAL_PER_GROUP_PATH = os.path.join(DATA_DIR, 'input/vector/attrVal_per_group_refine_numstr.pkl')
ATTR_GROUP_VECTORS_DIR = os.path.join(DATA_DIR, 'input/vector/attr_group_vectors_refine_numstr')

# NLP Configuration
NLP_MODEL = 'ja_ginza'

# Processing Parameters
MAX_RETRIES = 3
CANDIDATE_NUM = 3

# Size and Weight Units
SHOE_SIZE_ATTRIBUTE = 'Shoe size (JP)'
TOTAL_WEIGHT_UNIT = 'kg'
SINGLE_ITEM_WEIGHT_UNIT = 'g'
```

## Configuration Categories

### 1. Environment Configuration

Set up environment-specific settings:

```python
# environment.py
class Environment:
    def __init__(self):
        self.env = os.getenv('CREEMSON_ENV', 'development')
        self.debug = self.env == 'development'
        self.testing = self.env == 'testing'
        self.production = self.env == 'production'

    @property
    def database_url(self):
        if self.testing:
            return "sqlite:///test.db"
        return os.getenv('DATABASE_URL')
```

### 2. API Configuration

#### API Settings
```python
# api_config.py
API_SETTINGS = {
    'title': 'Creemson Engine API',
    'description': 'Data Processing and Classification API',
    'version': '1.0.0',
    'docs_url': '/docs',
    'redoc_url': '/redoc',
}

CORS_SETTINGS = {
    'allow_origins': ['*'],
    'allow_credentials': True,
    'allow_methods': ['*'],
    'allow_headers': ['*'],
}
```

#### WebSocket Configuration
```python
# websocket_config.py
WEBSOCKET_SETTINGS = {
    'ping_interval': 20,
    'ping_timeout': 20,
    'close_timeout': 20,
    'max_size': 10 * 1024 * 1024  # 10MB
}
```

### 3. Processing Configuration

#### Data Processing Settings
```python
# processing_config.py
PROCESSING_SETTINGS = {
    'chunk_size': 1000,
    'max_workers': 4,
    'timeout': 300,
    'retry_attempts': 3,
    'batch_size': 100
}
```

#### Classification Settings
```python
# classification_config.py
CLASSIFICATION_SETTINGS = {
    'confidence_threshold': 0.7,
    'min_samples': 10,
    'max_categories': 5
}
```

### 4. Storage Configuration

#### File Storage Settings
```python
# storage_config.py
STORAGE_SETTINGS = {
    'max_upload_size': 100 * 1024 * 1024,  # 100MB
    'allowed_extensions': ['.csv', '.xlsx', '.xls'],
    'temp_file_ttl': 3600,  # 1 hour
}
```

## Configuration Management

### 1. Loading Configuration

```python
class ConfigLoader:
    def __init__(self):
        self.config = {}
        self._load_config()

    def _load_config(self):
        # Load base configuration
        self.config.update(self._load_base_config())
        
        # Load environment-specific configuration
        env_config = self._load_env_config()
        self.config.update(env_config)

    def _load_base_config(self):
        return {
            'api': API_SETTINGS,
            'cors': CORS_SETTINGS,
            'websocket': WEBSOCKET_SETTINGS,
            'processing': PROCESSING_SETTINGS,
            'storage': STORAGE_SETTINGS
        }

    def _load_env_config(self):
        env = os.getenv('CREEMSON_ENV', 'development')
        config_path = f'config/{env}.py'
        if os.path.exists(config_path):
            return import_module(config_path).CONFIG
        return {}
```

### 2. Applying Configuration

```python
def configure_app(app: FastAPI, config: Dict):
    """Configure FastAPI application with provided settings"""
    
    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        **config['cors']
    )

    # Configure API settings
    for key, value in config['api'].items():
        setattr(app, key, value)

    # Configure upload limits
    app.add_middleware(
        LimitUploadSize,
        max_size=config['storage']['max_upload_size']
    )
```

## Environment Variables

### Required Environment Variables
```bash
# .env.example
CREEMSON_ENV=development
DATABASE_URL=postgresql://user:password@localhost/dbname
API_KEY=your-api-key
LOG_LEVEL=INFO
```

### Optional Environment Variables
```bash
# Additional configuration options
WORKER_COUNT=4
BATCH_SIZE=1000
DEBUG=True
TEMP_DIR=/tmp/creemson
```

## Logging Configuration

```python
# logging_config.py
LOGGING_CONFIG = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'INFO',
        },
        'file': {
            'class': 'logging.FileHandler',
            'filename': 'logs/app.log',
            'formatter': 'standard',
            'level': 'DEBUG',
        },
    },
    'loggers': {
        '': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True
        }
    }
}
```

## Custom Configuration

### 1. Unit Mapping Configuration
```python
# units_config.py
SIZE_MAPPING = {
    'S': 'サイズ（S/M/L）:S_1.0',
    'M': 'サイズ（S/M/L）:M_1.0',
    'L': 'サイズ（S/M/L）:L_1.0'
}

WEIGHT_UNITS = {
    'kg': 'total_weight',
    'g': 'single_item_weight'
}
```

### 2. Column Configuration
```python
# columns_config.py
COLUMN_MAPPINGS = {
    'PRODUCT_NUMBER_COL': '商品番号',
    'PRODUCT_NAME_COL': '商品名',
    'RAKUTEN_PRODUCT_NUMBER_COL': '楽天商品番号'
}

NAME_CANDIDATES = [
    'Product Name',
    'Item Name',
    'Name',
    'Sale Name'
]
```

## Performance Tuning

### 1. Processing Parameters
```python
# performance_config.py
PERFORMANCE_SETTINGS = {
    'chunk_size': 5000,
    'parallel_processes': 4,
    'memory_limit': '4GB',
    'timeout': 300
}
```

### 2. Caching Configuration
```python
# cache_config.py
CACHE_SETTINGS = {
    'enable_cache': True,
    'cache_type': 'redis',
    'cache_url': 'redis://localhost:6379/0',
    'cache_ttl': 3600
}
```

## Security Configuration

### 1. API Security
```python
# security_config.py
SECURITY_SETTINGS = {
    'enable_auth': True,
    'auth_type': 'bearer',
    'token_expiry': 3600,
    'rate_limit': {
        'calls': 100,
        'period': 60
    }
}
```

### 2. File Security
```python
FILE_SECURITY = {
    'allowed_extensions': ['.csv', '.xlsx'],
    'max_file_size': 100 * 1024 * 1024,  # 100MB
    'scan_uploads': True,
    'sanitize_filenames': True
}
```

## Troubleshooting

### Common Configuration Issues
1. **Path Configuration**
   ```python
   # Check path existence
   if not os.path.exists(UPLOADS_DIR):
       os.makedirs(UPLOADS_DIR)
   ```

2. **Environment Variables**
   ```python
   # Validate required environment variables
   required_vars = ['CREEMSON_ENV', 'API_KEY']
   missing_vars = [var for var in required_vars if not os.getenv(var)]
   if missing_vars:
       raise ValueError(f"Missing required environment variables: {missing_vars}")
   ```

## Best Practices

1. **Configuration Validation**
   ```python
   def validate_config(config: Dict):
       required_keys = ['api', 'cors', 'storage']
       missing_keys = [key for key in required_keys if key not in config]
       if missing_keys:
           raise ValueError(f"Missing required configuration keys: {missing_keys}")
   ```

2. **Environment Awareness**
   ```python
   def get_environment_config():
       env = os.getenv('CREEMSON_ENV', 'development')
       return {
           'development': DevConfig,
           'testing': TestConfig,
           'production': ProdConfig
       }.get(env, DevConfig)
   ```

## Related Documentation

- [Installation Guide](installation)
- [Deployment Guide](deployment-guide)
- [Security Best Practices](security-best-practices
- [Performance Optimization](performance-optimization)