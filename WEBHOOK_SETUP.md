# Figma Webhook Setup Instructions

## 1. GitHub Repository Secrets

Add these secrets to your GitHub repository:
- Go to Settings > Secrets and variables > Actions
- Add the following secrets:

### Required Secrets:
```
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key
CHROMATIC_PROJECT_TOKEN=your_chromatic_project_token
```

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
   ```bash
   curl -X POST "https://api.figma.com/v1/webhooks" \
     -H "X-Figma-Token: YOUR_FIGMA_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "event_type": "FILE_UPDATE",
       "team_id": "YOUR_TEAM_ID",
       "endpoint": "https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches",
       "passcode": "YOUR_GITHUB_TOKEN",
       "description": "Design2Code Pipeline Trigger"
     }'
   ```

3. **Configure Webhook Endpoint:**
   The webhook should send POST requests to:
   `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`

   With payload:
   ```json
   {
     "event_type": "figma-design-tokens-updated",
     "client_payload": {}
   }
   ```

## 3. Testing the Pipeline

### Test Design Token Extraction:
```bash
FIGMA_TOKEN=your_token FIGMA_FILE_KEY=your_key node scripts/fetch-design-tokens.js
```

### Test Style Generation:
```bash
# After running token extraction
node scripts/generate-style-updates.js
```

### Test Complete Pipeline:
```bash
# Trigger via GitHub Actions
gh workflow run "Design Token Sync & Auto-Update"
```

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
Set `DRY_RUN=true` to test without applying changes.
