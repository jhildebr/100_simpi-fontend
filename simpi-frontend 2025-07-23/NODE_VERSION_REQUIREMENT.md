# Node.js Version Requirement

## Current Requirement
**Node.js v18.19 or higher** is required for this project.

## Why This Version?
- Angular 18.2.13 requires Node.js v18.19+
- The project uses modern JavaScript features
- Azure DevOps pipelines need to be configured with the correct Node.js version

## Impact on Build Pipelines
**IMPORTANT**: All build pipelines (Azure DevOps, GitHub Actions, etc.) must use Node.js v18.19 or higher.

### Azure DevOps Pipeline Configuration
In your Azure DevOps pipeline YAML, ensure you have:

```yaml
steps:
- task: NodeTool@0
  inputs:
    versionSpec: '18.19.1'
```

### Manual Fix Required
If you encounter build failures with older Node.js versions, you must:
1. Update the Node.js version in your pipeline configuration
2. Use Node.js v18.19.1 or higher

## Local Development
For local development, use:
```bash
# Check your current version
node --version

# If you need to upgrade, use nvm:
nvm install 18.19.1
nvm use 18.19.1
```

## Verification
Run the build test script to verify your environment:
```bash
./quick-test.sh
```

This script will check your Node.js version and test the build process. 