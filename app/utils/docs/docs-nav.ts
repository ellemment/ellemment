// #app/utils/beta/docs-nav.ts
export interface NavItem {
  title: string;
  url: string;
  isActive?: boolean;
}

export interface NavSection {
  title: string;
  url: string;
  items: NavItem[];
}

export interface DocsNavigation {
  versions: string[];
  navMain: NavSection[];
}

export const docsNavigation: DocsNavigation = {
  versions: ["1.0", "2.0-alpha", "2.1-beta"],
  navMain: [
    {
      title: "Overview",
      url: "overview",
      items: [
        { title: "Getting Started", url: "getting-started" },
        { title: "Installation", url: "installation" },
        { title: "Project Structure", url: "project-structure" },
        { title: "Architecture Overview", url: "architecture-overview" },
        { title: "Configuration Guide", url: "configuration-guide" }
      ]
    },
    {
      title: "Core Components",
      url: "core-components",
      items: [
        { title: "FastAPI Integration", url: "fastapi-integration" },
        { title: "WebSocket Communication", url: "websocket-communication" },
        { title: "Route Handlers", url: "route-handlers" },
        { title: "Classification System", url: "classification-system" },
        { title: "Data Processing Pipeline", url: "data-processing-pipeline" }
      ]
    },
    {
      title: "API Reference",
      url: "api-reference",
      items: [
        { title: "Endpoints Reference", url: "endpoints-reference" },
        { title: "WebSocket Protocol", url: "websocket-protocol" },
        { title: "Response Formats", url: "response-formats" },
        { title: "Helper Functions", url: "helper-functions" },
        { title: "Configuration Options", url: "configuration-options" }
      ]
    },
    {
      title: "Deployment & Operations",
      url: "deployment-operations",
      items: [
        { title: "Environment Setup", url: "environment-setup" },
        { title: "Production Deployment", url: "production-deployment" },
        { title: "Monitoring & Logging", url: "monitoring-logging" },
        { title: "Performance Optimization", url: "performance-optimization" },
        { title: "Troubleshooting Guide", url: "troubleshooting-guide" }
      ]
    },
    {
      title: "Developer Guide",
      url: "developer-guide",
      items: [
        { title: "Contributing Guidelines", url: "contributing-guidelines" },
        { title: "Code Style Guide", url: "code-style-guide" },
        { title: "Testing Framework", url: "testing-framework" },
        { title: "API Extensions", url: "api-extensions" },
        { title: "Security Best Practices", url: "security-best-practices" }
      ]
    }
  ],
  } as const
  
  export default docsNavigation