#!/usr/bin/env node

/**
 * Design2Code Pipeline Setup Script
 * Helps configure environment variables and webhook integration
 */

const fs = require('fs');
const path = require('path');

console.log(`
🎨 Design2Code Pipeline Setup
============================

This script will help you configure the automated design-to-code pipeline.
`);

function createEnvTemplate() {
  const envTemplate = `# Figma Integration Configuration
# Get your token from: https://www.figma.com/developers/api#access-tokens
FIGMA_TOKEN=your_figma_personal_access_token_here

# Extract file key from your Figma URL
# https://www.figma.com/design/[FILE_KEY]/Your-Design-File
FIGMA_FILE_KEY=fOlte4EUiA3VAEzIpIlk9G

# GitHub Configuration (for Actions)
# GITHUB_TOKEN is automatically provided by GitHub Actions
# CHROMATIC_PROJECT_TOKEN should be set in repository secrets
`;

  const envPath = path.join(__dirname, '../.env.example');
  fs.writeFileSync(envPath, envTemplate);
  console.log(`✅ Created .env.example template at: ${envPath}`);
}

function createWebhookInstructions() {
  const webhookDocs = `# Figma Webhook Setup Instructions

## 1. GitHub Repository Secrets

Add these secrets to your GitHub repository:
- Go to Settings > Secrets and variables > Actions
- Add the following secrets:

### Required Secrets:
\`\`\`
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key
CHROMATIC_PROJECT_TOKEN=your_chromatic_project_token
\`\`\`

## 2. Figma Webhook Configuration

### Option A: Manual Trigger
- Use GitHub Actions "workflow_dispatch" to manually trigger the pipeline
- Navigate to Actions > Design Token Sync & Auto-Update > Run workflow

### Option B: Scheduled Sync (Already Configured)
- Pipeline runs every 30 minutes during work hours (9 AM - 5 PM, weekdays)
- Automatically detects design token changes

### Option C: Figma Webhook (Advanced)
To set up real-time webhook triggers from Figma:

1. **Create GitHub Personal Access Token:**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Create token with 'repo' and 'workflow' scopes

2. **Set up Figma Webhook:**
   \`\`\`bash
   curl -X POST "https://api.figma.com/v1/webhooks" \\
     -H "X-Figma-Token: YOUR_FIGMA_TOKEN" \\
     -H "Content-Type: application/json" \\
     -d '{
       "event_type": "FILE_UPDATE",
       "team_id": "YOUR_TEAM_ID",
       "endpoint": "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches",
       "passcode": "YOUR_GITHUB_TOKEN",
       "description": "Design2Code Pipeline Trigger"
     }'
   \`\`\`

3. **Configure Webhook Endpoint:**
   The webhook should send POST requests to:
   \`https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches\`

   With payload:
   \`\`\`json
   {
     "event_type": "figma-design-tokens-updated",
     "client_payload": {}
   }
   \`\`\`

## 3. Testing the Pipeline

### Test Design Token Extraction:
\`\`\`bash
FIGMA_TOKEN=your_token FIGMA_FILE_KEY=your_key node scripts/fetch-design-tokens.js
\`\`\`

### Test Style Generation:
\`\`\`bash
# After running token extraction
node scripts/generate-style-updates.js
\`\`\`

### Test Complete Pipeline:
\`\`\`bash
# Trigger via GitHub Actions
gh workflow run "Design Token Sync & Auto-Update"
\`\`\`

## 4. Pipeline Workflow

1. **Design Change in Figma** → Design tokens updated
2. **Webhook/Schedule Trigger** → GitHub Actions starts
3. **Token Extraction** → Fetch latest variables from Figma API
4. **Change Detection** → Compare with previous version
5. **AI Style Generation** → Generate CSS and component updates
6. **Build & Test** → Storybook build + Chromatic visual tests
7. **Pull Request** → Auto-create PR with changes
8. **Review & Merge** → Manual review and approval

## 5. Monitoring

- **GitHub Actions**: Monitor workflow runs in Actions tab
- **Chromatic**: Visual regression test results
- **Artifacts**: Download generated update plans and tokens
- **Pull Requests**: Review automated changes before merge

## 6. Troubleshooting

### Common Issues:
- **Figma API Rate Limits**: Reduce scheduled frequency if needed
- **Large File Processing**: Increase Node.js memory limit
- **Webhook Authentication**: Verify GitHub token scopes
- **CSS Conflicts**: Review generated CSS variable updates

### Debug Mode:
Set \`DRY_RUN=true\` to test without applying changes.
`;

  const docsPath = path.join(__dirname, '../WEBHOOK_SETUP.md');
  fs.writeFileSync(docsPath, webhookDocs);
  console.log(`📚 Created webhook setup guide at: ${docsPath}`);
}

function createPackageScripts() {
  const packagePath = path.join(__dirname, '../package.json');

  if (!fs.existsSync(packagePath)) {
    console.log('⚠️  package.json not found - skipping script updates');
    return;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    // Add new scripts for the Design2Code pipeline
    pkg.scripts = pkg.scripts || {};
    pkg.scripts['design2code:fetch'] = 'node scripts/fetch-design-tokens.js';
    pkg.scripts['design2code:generate'] = 'node scripts/generate-style-updates.js';
    pkg.scripts['design2code:test'] = 'DRY_RUN=true npm run design2code:fetch && npm run design2code:generate';
    pkg.scripts['design2code:full'] = 'npm run design2code:fetch && npm run design2code:generate && npm run build-storybook';

    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
    console.log('✅ Added Design2Code scripts to package.json:');
    console.log('  • npm run design2code:fetch - Extract tokens from Figma');
    console.log('  • npm run design2code:generate - Generate style updates');
    console.log('  • npm run design2code:test - Test pipeline (dry run)');
    console.log('  • npm run design2code:full - Run complete pipeline');

  } catch (error) {
    console.error('❌ Failed to update package.json:', error.message);
  }
}

function displaySummary() {
  console.log(`
🎉 Design2Code Pipeline Setup Complete!
======================================

## 📁 Files Created:
✅ scripts/fetch-design-tokens.js - Figma API integration
✅ scripts/generate-style-updates.js - AI-powered style generation
✅ .github/workflows/design-token-sync.yml - Automation workflow
✅ .env.example - Environment variable template
✅ WEBHOOK_SETUP.md - Detailed setup instructions

## 🚀 Next Steps:

1. **Configure Environment:**
   • Copy .env.example to .env
   • Add your Figma personal access token
   • Update FIGMA_FILE_KEY with your file ID

2. **Set GitHub Secrets:**
   • FIGMA_TOKEN
   • FIGMA_FILE_KEY
   • CHROMATIC_PROJECT_TOKEN

3. **Test the Pipeline:**
   \`npm run design2code:test\`

4. **Read Setup Guide:**
   See WEBHOOK_SETUP.md for detailed instructions

## 🎯 What This Enables:

✨ Automatic detection of Figma design changes
✨ AI-powered CSS variable generation
✨ Intelligent component impact analysis
✨ Automated Storybook builds and visual testing
✨ Pull request creation with design sync updates
✨ Complete design-to-code automation pipeline

Happy automating! 🤖✨
`);
}

async function main() {
  try {
    createEnvTemplate();
    createWebhookInstructions();
    createPackageScripts();
    displaySummary();
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}