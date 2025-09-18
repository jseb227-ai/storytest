#!/usr/bin/env node

/**
 * AI-Powered Style Update Generator
 * Analyzes design token changes and generates corresponding CSS/component updates
 */

const fs = require('fs');
const path = require('path');

// Configuration
const TOKENS_PATH = path.join(__dirname, '../tokens/design-tokens.json');
const PREVIOUS_TOKENS_PATH = path.join(__dirname, '../tokens/design-tokens.previous.json');
const THEME_CSS_PATH = path.join(__dirname, '../theme.css');
const STORIES_DIR = path.join(__dirname, '../stories');
const OUTPUT_DIR = path.join(__dirname, '../generated-updates');

function loadTokens() {
  try {
    if (!fs.existsSync(TOKENS_PATH)) {
      console.error('❌ Design tokens file not found. Run fetch-design-tokens.js first.');
      process.exit(1);
    }

    const currentTokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
    const previousTokens = fs.existsSync(PREVIOUS_TOKENS_PATH)
      ? JSON.parse(fs.readFileSync(PREVIOUS_TOKENS_PATH, 'utf8'))
      : null;

    return { currentTokens, previousTokens };
  } catch (error) {
    console.error('❌ Failed to load design tokens:', error.message);
    process.exit(1);
  }
}

function detectTokenChanges(currentTokens, previousTokens) {
  if (!previousTokens) {
    console.log('🆕 No previous tokens found - treating all tokens as new');
    return {
      hasChanges: true,
      changes: [
        ...Object.keys(currentTokens.colors || {}).map(key => ({
          type: 'color',
          action: 'added',
          name: key,
          newValue: currentTokens.colors[key],
          oldValue: null,
        })),
        ...Object.keys(currentTokens.semantic || {}).map(key => ({
          type: 'semantic',
          action: 'added',
          name: key,
          newValue: currentTokens.semantic[key],
          oldValue: null,
        }))
      ]
    };
  }

  const changes = [];

  // Detect primitive color changes
  Object.keys(currentTokens.colors || {}).forEach(key => {
    const newValue = currentTokens.colors[key];
    const oldValue = previousTokens.colors?.[key];

    if (!oldValue) {
      changes.push({
        type: 'color',
        action: 'added',
        name: key,
        newValue,
        oldValue: null,
      });
    } else if (oldValue !== newValue) {
      changes.push({
        type: 'color',
        action: 'changed',
        name: key,
        newValue,
        oldValue,
      });
    }
  });

  // Detect semantic color changes
  Object.keys(currentTokens.semantic || {}).forEach(key => {
    const newValue = currentTokens.semantic[key];
    const oldValue = previousTokens.semantic?.[key];

    if (!oldValue) {
      changes.push({
        type: 'semantic',
        action: 'added',
        name: key,
        newValue,
        oldValue: null,
      });
    } else if (oldValue !== newValue) {
      changes.push({
        type: 'semantic',
        action: 'changed',
        name: key,
        newValue,
        oldValue,
      });
    }
  });

  // Detect component variable assignment changes
  Object.keys(currentTokens.componentVariables || {}).forEach(componentName => {
    const currentComponent = currentTokens.componentVariables[componentName];
    const previousComponent = previousTokens.componentVariables?.[componentName];

    if (!previousComponent) {
      changes.push({
        type: 'component',
        action: 'added',
        name: componentName,
        newValue: currentComponent,
        oldValue: null,
      });
    } else {
      // Deep compare component variables
      const componentChanges = detectComponentVariableChanges(currentComponent, previousComponent, componentName);
      changes.push(...componentChanges);
    }
  });

  // Detect removed colors, semantic variables, and components
  ['colors', 'semantic', 'componentVariables'].forEach(section => {
    if (previousTokens[section]) {
      Object.keys(previousTokens[section]).forEach(key => {
        if (!currentTokens[section]?.[key]) {
          changes.push({
            type: section === 'componentVariables' ? 'component' : (section === 'semantic' ? 'semantic' : 'color'),
            action: 'removed',
            name: key,
            newValue: null,
            oldValue: previousTokens[section][key],
          });
        }
      });
    }
  });

  // Detect spacing changes
  Object.keys(currentTokens.spacing || {}).forEach(key => {
    const newValue = currentTokens.spacing[key];
    const oldValue = previousTokens.spacing?.[key];

    if (!oldValue) {
      changes.push({
        type: 'spacing',
        action: 'added',
        name: key,
        newValue,
        oldValue: null,
      });
    } else if (oldValue !== newValue) {
      changes.push({
        type: 'spacing',
        action: 'changed',
        name: key,
        newValue,
        oldValue,
      });
    }
  });

  return {
    hasChanges: changes.length > 0,
    changes
  };
}

function detectComponentVariableChanges(currentComponent, previousComponent, componentName) {
  const changes = [];

  function compareBindings(current, previous, path = '') {
    Object.keys(current || {}).forEach(key => {
      const currentValue = current[key];
      const previousValue = previous?.[key];
      const fullPath = path ? `${path}.${key}` : key;

      if (typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)) {
        if (currentValue.variableName) {
          // This is a resolved variable binding
          const currentVar = currentValue.variableName;
          const previousVar = previousValue?.variableName;

          if (previousVar !== currentVar) {
            changes.push({
              type: 'component-variable',
              action: previousVar ? 'changed' : 'added',
              name: `${componentName}.${fullPath}`,
              newValue: currentVar,
              oldValue: previousVar || null,
              resolvedValue: currentValue.resolvedValue,
            });
          }
        } else {
          // Nested binding, recurse
          compareBindings(currentValue, previousValue, fullPath);
        }
      }
    });
  }

  compareBindings(currentComponent, previousComponent);
  return changes;
}

function generateCSSVariableUpdates(changes) {
  const cssUpdates = [];

  changes.forEach(change => {
    if (change.type === 'color') {
      const cssVarName = `--${change.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      switch (change.action) {
        case 'added':
        case 'changed':
          cssUpdates.push({
            type: 'css-variable',
            property: cssVarName,
            value: change.newValue,
            comment: `${change.action === 'added' ? 'Added' : 'Updated'} primitive color from Figma: ${change.name}`,
          });
          break;
        case 'removed':
          cssUpdates.push({
            type: 'css-variable-removal',
            property: cssVarName,
            comment: `Removed primitive color from Figma: ${change.name}`,
          });
          break;
      }
    }

    if (change.type === 'semantic') {
      const cssVarName = `--${change.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      switch (change.action) {
        case 'added':
        case 'changed':
          cssUpdates.push({
            type: 'css-variable',
            property: cssVarName,
            value: change.newValue,
            comment: `${change.action === 'added' ? 'Added' : 'Updated'} semantic color from Figma: ${change.name}`,
          });
          break;
        case 'removed':
          cssUpdates.push({
            type: 'css-variable-removal',
            property: cssVarName,
            comment: `Removed semantic color from Figma: ${change.name}`,
          });
          break;
      }
    }

    if (change.type === 'component-variable') {
      // For component variable changes, generate semantic CSS variables
      // e.g., primary-button.fill-0 -> --button-primary-background
      const componentName = change.name.split('.')[0];
      const propertyPath = change.name.split('.').slice(1).join('-');

      let semanticVarName;
      if (componentName === 'primary-button' && propertyPath === 'fill-0') {
        semanticVarName = '--button-primary-background';
      } else if (componentName === 'primary-button' && propertyPath === 'stroke-0') {
        semanticVarName = '--button-primary-border';
      } else {
        // Fallback naming
        semanticVarName = `--${componentName.replace('primary-', '')}-${propertyPath}`;
      }

      cssUpdates.push({
        type: 'css-variable',
        property: semanticVarName,
        value: change.resolvedValue,
        comment: `${change.action === 'added' ? 'Added' : 'Updated'} component variable: ${change.name} -> ${change.newValue}`,
        componentChange: true,
        originalVariable: change.newValue,
      });
    }

    if (change.type === 'spacing') {
      const cssVarName = `--spacing-${change.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

      switch (change.action) {
        case 'added':
        case 'changed':
          cssUpdates.push({
            type: 'css-variable',
            property: cssVarName,
            value: change.newValue,
            comment: `${change.action === 'added' ? 'Added' : 'Updated'} spacing from Figma: ${change.name}`,
          });
          break;
      }
    }
  });

  return cssUpdates;
}

function generateComponentImpactAnalysis(changes) {
  const componentUpdates = [];

  changes.forEach(change => {
    if (change.type === 'color' && change.name.toLowerCase().includes('primary')) {
      componentUpdates.push({
        component: 'Button',
        reason: `Primary color changed from ${change.oldValue} to ${change.newValue}`,
        suggestedAction: 'Update Button primary variant styles',
        files: [
          'stories/02-Button.stories.js',
          'theme.css'
        ]
      });
    }

    if (change.type === 'color' && change.name.toLowerCase().includes('secondary')) {
      componentUpdates.push({
        component: 'Button',
        reason: `Secondary color changed from ${change.oldValue} to ${change.newValue}`,
        suggestedAction: 'Update Button secondary variant styles',
        files: [
          'stories/02-Button.stories.js',
          'theme.css'
        ]
      });
    }

    if (change.type === 'spacing') {
      componentUpdates.push({
        component: 'Layout Components',
        reason: `Spacing "${change.name}" changed from ${change.oldValue} to ${change.newValue}`,
        suggestedAction: 'Review padding/margin usage across components',
        files: [
          'theme.css',
          'All component stories'
        ]
      });
    }
  });

  return componentUpdates;
}

function generateCSSContent(cssUpdates) {
  if (cssUpdates.length === 0) return null;

  let cssContent = `/* Auto-generated CSS updates from Figma design tokens */\n/* Generated at: ${new Date().toISOString()} */\n\n:root {\n`;

  cssUpdates.forEach(update => {
    if (update.type === 'css-variable') {
      cssContent += `  /* ${update.comment} */\n`;
      cssContent += `  ${update.property}: ${update.value};\n\n`;
    }
  });

  cssContent += `}\n\n`;

  // Add component-specific overrides for @vibe/core components
  const primaryColorUpdate = cssUpdates.find(u => u.property === '--primary-color');
  if (primaryColorUpdate) {
    cssContent += `/* @vibe/core Button component overrides */\n`;
    cssContent += `button[data-testid*="button"][kind="primary"],\n`;
    cssContent += `.monday-style-button--kind-primary,\n`;
    cssContent += `[class*="primary"][class*="button"],\n`;
    cssContent += `button[data-kind="primary"] {\n`;
    cssContent += `  background-color: ${primaryColorUpdate.value} !important;\n`;
    cssContent += `  border-color: ${primaryColorUpdate.value} !important;\n`;
    cssContent += `}\n\n`;

    cssContent += `/* Universal primary button override */\n`;
    cssContent += `button:is([kind="primary"], [data-kind="primary"], .primary) {\n`;
    cssContent += `  background-color: ${primaryColorUpdate.value} !important;\n`;
    cssContent += `  border-color: ${primaryColorUpdate.value} !important;\n`;
    cssContent += `}\n\n`;
  }

  // Add removal comments
  const removals = cssUpdates.filter(u => u.type === 'css-variable-removal');
  if (removals.length > 0) {
    cssContent += `/* Variables removed from Figma (consider cleanup):\n`;
    removals.forEach(removal => {
      cssContent += ` * ${removal.property} - ${removal.comment}\n`;
    });
    cssContent += ` */\n`;
  }

  return cssContent;
}

function generateUpdatePlan(changes, cssUpdates, componentUpdates) {
  const plan = {
    summary: {
      totalChanges: changes.length,
      colorChanges: changes.filter(c => c.type === 'color').length,
      spacingChanges: changes.filter(c => c.type === 'spacing').length,
      componentsAffected: componentUpdates.length,
    },
    changes: changes,
    cssUpdates: cssUpdates,
    componentUpdates: componentUpdates,
    recommendedActions: [
      'Review generated CSS variables in theme.css',
      'Test Button component variants with new colors',
      'Run Storybook to verify visual changes',
      'Execute Chromatic build to capture visual diffs',
      'Update any hardcoded color values in components'
    ],
    automationSteps: [
      'Apply CSS variable updates to theme.css',
      'Trigger Storybook rebuild',
      'Run Chromatic visual regression tests',
      'Create PR with design token sync changes'
    ]
  };

  return plan;
}

async function applyCSSUpdates(cssUpdates) {
  if (cssUpdates.length === 0) {
    console.log('📝 No CSS updates needed');
    return;
  }

  try {
    // Read existing theme.css
    let existingCSS = '';
    if (fs.existsSync(THEME_CSS_PATH)) {
      existingCSS = fs.readFileSync(THEME_CSS_PATH, 'utf8');
    }

    // Generate new CSS content
    const newCSSContent = generateCSSContent(cssUpdates);

    // Simple strategy: append new variables (in production, would need smarter merging)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = THEME_CSS_PATH.replace('.css', `.backup-${timestamp}.css`);

    // Backup existing file
    if (existingCSS) {
      fs.writeFileSync(backupPath, existingCSS);
      console.log(`💾 Backed up existing theme.css to: ${path.basename(backupPath)}`);
    }

    // Write updated CSS (append for safety)
    const updatedCSS = existingCSS + '\n\n' + newCSSContent;
    fs.writeFileSync(THEME_CSS_PATH, updatedCSS);

    console.log(`✅ Applied ${cssUpdates.length} CSS variable updates to theme.css`);

  } catch (error) {
    console.error('❌ Failed to apply CSS updates:', error.message);
    throw error;
  }
}

async function saveUpdatePlan(plan) {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const planPath = path.join(OUTPUT_DIR, `update-plan-${timestamp}.json`);

  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));
  console.log(`📋 Update plan saved to: ${planPath}`);

  return planPath;
}

async function main() {
  try {
    console.log('🤖 Starting AI-powered style update generation...');

    // 1. Load design tokens
    const { currentTokens, previousTokens } = loadTokens();

    // 2. Detect changes
    const { hasChanges, changes } = detectTokenChanges(currentTokens, previousTokens);

    if (!hasChanges) {
      console.log('✅ No design token changes detected - no updates needed');
      process.exit(0);
    }

    console.log(`🔍 Detected ${changes.length} design token changes:`);
    changes.forEach(change => {
      console.log(`  • ${change.type}: ${change.name} (${change.action})`);
      if (change.action === 'changed') {
        console.log(`    ${change.oldValue} → ${change.newValue}`);
      }
    });

    // 3. Generate CSS variable updates
    const cssUpdates = generateCSSVariableUpdates(changes);

    // 4. Analyze component impact
    const componentUpdates = generateComponentImpactAnalysis(changes);

    // 5. Create comprehensive update plan
    const updatePlan = generateUpdatePlan(changes, cssUpdates, componentUpdates);

    // 6. Save update plan
    const planPath = await saveUpdatePlan(updatePlan);

    // 7. Apply CSS updates (if not in dry-run mode)
    if (!process.env.DRY_RUN) {
      await applyCSSUpdates(cssUpdates);
    } else {
      console.log('🧪 DRY_RUN mode - CSS updates would be applied');
    }

    // 8. Output for GitHub Actions
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::set-output name=updates-applied::${!process.env.DRY_RUN}`);
      console.log(`::set-output name=changes-count::${changes.length}`);
      console.log(`::set-output name=plan-path::${planPath}`);
    }

    console.log('🎉 Style update generation complete!');
    console.log('\n📋 Summary:');
    console.log(`  • ${changes.length} design token changes processed`);
    console.log(`  • ${cssUpdates.length} CSS variable updates generated`);
    console.log(`  • ${componentUpdates.length} components potentially affected`);

    if (componentUpdates.length > 0) {
      console.log('\n🎯 Recommended next steps:');
      updatePlan.recommendedActions.forEach(action => {
        console.log(`  • ${action}`);
      });
    }

  } catch (error) {
    console.error('💥 Style update generation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  detectTokenChanges,
  generateCSSVariableUpdates,
  generateComponentImpactAnalysis,
  applyCSSUpdates
};