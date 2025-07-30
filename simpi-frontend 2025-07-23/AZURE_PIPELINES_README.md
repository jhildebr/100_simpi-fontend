# Azure DevOps Test Pipelines

This directory contains Azure DevOps pipeline configurations for testing builds in a separate Azure subscription.

## Why Separate Test Pipelines?

Having test pipelines in your own subscription allows you to:

- **Test build configurations** before affecting the team's workflow
- **Validate dependency changes** (like the recent `colorthief` → `color-thief-browser` fix)
- **Experiment with build optimizations** safely
- **Debug build issues** in isolation
- **Test new Node.js versions** or build tools

## Pipeline Files

### 1. `azure-pipelines-quick-test.yml`
**Purpose**: Quick validation of build process
**Duration**: ~5-10 minutes
**Triggers**: Changes to `package.json` or the pipeline file itself

**What it tests**:
- Dependency installation (no SSH issues)
- Web build (development mode)
- Web build (production mode)
- Artifact generation

**Use case**: Perfect for testing dependency changes or quick build validation.

### 2. `azure-pipelines-test.yml`
**Purpose**: Comprehensive build and quality testing
**Duration**: ~15-30 minutes
**Triggers**: Changes to any project files, package.json, or angular.json

**What it tests**:
- All quick test features
- Linting
- Unit tests with coverage
- Mobile builds (Android/iOS)
- Security audit
- Bundle size analysis
- Performance metrics

**Use case**: Full validation before sharing changes with the team.

## Setup Instructions

### 1. Create Azure DevOps Project
1. Go to [Azure DevOps](https://dev.azure.com)
2. Create a new organization (if needed)
3. Create a new project (e.g., "Simpi-Test-Builds")

### 2. Import Repository
1. In your new project, go to Repos
2. Import your repository or create a new one
3. Push your code with the pipeline files

### 3. Create Pipeline
1. Go to Pipelines → New Pipeline
2. Choose "Azure Repos Git" (or your source)
3. Select your repository
4. Choose "Existing Azure Pipelines YAML file"
5. Select either:
   - `azure-pipelines-quick-test.yml` for quick testing
   - `azure-pipelines-test.yml` for comprehensive testing

### 4. Configure Pipeline
1. Review the pipeline configuration
2. Set the agent pool to "Azure Pipelines" (Microsoft-hosted)
3. Save and run

## Usage Workflow

### For Dependency Changes
1. Make your changes locally
2. Test with `npm install --legacy-peer-deps`
3. Push to your test repository
4. Pipeline automatically triggers
5. Review results in Azure DevOps

### For Build Configuration Changes
1. Modify build scripts or configurations
2. Push changes
3. Pipeline validates the build process
4. Check artifacts and logs

### For Performance Testing
1. Use the comprehensive pipeline
2. Review bundle size analysis
3. Check for performance regressions

## Key Features

### Environment Variables
- `NODE_OPTIONS: '--openssl-legacy-provider'` - Handles legacy OpenSSL issues
- `--legacy-peer-deps` - Handles Angular 18 peer dependency conflicts

### Error Handling
- `continueOnError: true` for non-critical steps (mobile builds, tests)
- Comprehensive logging and artifact publishing

### Artifacts
- Build outputs are published as artifacts
- Test results and coverage reports
- Bundle size analysis

## Monitoring

### Pipeline Dashboard
- View build history and trends
- Monitor build times and success rates
- Track bundle size changes

### Notifications
- Configure email notifications for build failures
- Set up Slack/Teams integration if needed

## Troubleshooting

### Common Issues

1. **Node.js Version Conflicts**
   - Pipeline uses Node.js 18.19.1
   - Update `NODE_VERSION` variable if needed

2. **Memory Issues**
   - Build uses `--openssl-legacy-provider`
   - Consider increasing agent memory if needed

3. **Mobile Build Failures**
   - Mobile builds are marked as `continueOnError: true`
   - Check logs for specific issues

### Debugging
1. Check pipeline logs for detailed error messages
2. Review artifact contents
3. Compare with local builds

## Best Practices

1. **Start with Quick Test**: Use the quick test pipeline for initial validation
2. **Use Comprehensive Test**: Run full pipeline before major changes
3. **Monitor Trends**: Watch for build time increases or bundle size growth
4. **Keep Updated**: Regularly update Node.js version and dependencies

## Integration with Team Workflow

Once you've validated changes in your test pipeline:

1. **Share Results**: Show successful builds to the team
2. **Document Changes**: Update team documentation
3. **Propose Updates**: Suggest pipeline improvements for the main project
4. **Knowledge Transfer**: Share learnings with the development team

This approach ensures that your team's main pipeline remains stable while you can freely experiment and validate improvements. 