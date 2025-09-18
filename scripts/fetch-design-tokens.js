#!/usr/bin/env node

/**
 * Figma Design Token Extractor
 * Fetches design tokens from Figma Variables API and converts to JSON
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Configuration
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || 'fOlte4EUiA3VAEzIpIlk9G';
const OUTPUT_DIR = path.join(__dirname, '../tokens');

// Component tracking - your primary button component
const TRACKED_COMPONENTS = {
  'primary-button': '4185:3779', // Your button component node ID (note: colon not dash)
};

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_TOKEN environment variable is required');
  process.exit(1);
}

async function fetchFigmaVariables() {
  try {
    console.log('🎨 Fetching design tokens from Figma...');

    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/variables/local`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Failed to fetch Figma variables:', error.message);
    throw error;
  }
}

async function fetchComponentVariableAssignments() {
  try {
    console.log('🔍 Fetching component variable assignments...');

    const nodeIds = Object.values(TRACKED_COMPONENTS).join(',');
    const response = await fetch(
      `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${nodeIds}`,
      {
        headers: {
          'X-Figma-Token': FIGMA_TOKEN,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extract variable assignments from components
    const componentVariables = {};

    for (const [componentName, nodeId] of Object.entries(TRACKED_COMPONENTS)) {
      const node = data.nodes[nodeId];

      if (node && node.document) {
        console.log(`🔍 Processing component: ${componentName}`);
        componentVariables[componentName] = extractVariableBindings(node.document);
        console.log(`📝 Found ${Object.keys(componentVariables[componentName]).length} variable bindings`);
      } else {
        console.log(`⚠️  Component not found: ${componentName} (${nodeId})`);
      }
    }

    return componentVariables;
  } catch (error) {
    console.error('❌ Failed to fetch component variables:', error.message);
    return {};
  }
}

function extractVariableBindings(node) {
  const bindings = {};

  // Check for component-level boundVariables (this is what your button uses!)
  if (node.boundVariables) {
    // Handle fills array binding
    if (node.boundVariables.fills && Array.isArray(node.boundVariables.fills)) {
      node.boundVariables.fills.forEach((fill, index) => {
        if (fill && fill.id) {
          bindings[`fill-${index}`] = fill.id;
        }
      });
    }

    // Handle strokes array binding
    if (node.boundVariables.strokes && Array.isArray(node.boundVariables.strokes)) {
      node.boundVariables.strokes.forEach((stroke, index) => {
        if (stroke && stroke.id) {
          bindings[`stroke-${index}`] = stroke.id;
        }
      });
    }

    // Handle other bound variables
    Object.keys(node.boundVariables).forEach(key => {
      if (key !== 'fills' && key !== 'strokes') {
        const binding = node.boundVariables[key];
        if (binding && binding.id) {
          bindings[key] = binding.id;
        }
      }
    });
  }

  // Check for fill variable bindings (legacy approach)
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach((fill, index) => {
      if (fill.boundVariables && fill.boundVariables.color) {
        bindings[`fill-color-${index}`] = fill.boundVariables.color.id;
      }
    });
  }

  // Check for stroke variable bindings (legacy approach)
  if (node.strokes && Array.isArray(node.strokes)) {
    node.strokes.forEach((stroke, index) => {
      if (stroke.boundVariables && stroke.boundVariables.color) {
        bindings[`stroke-color-${index}`] = stroke.boundVariables.color.id;
      }
    });
  }

  // Recursively check child nodes
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child, index) => {
      const childBindings = extractVariableBindings(child);
      if (Object.keys(childBindings).length > 0) {
        bindings[`child-${index}`] = childBindings;
      }
    });
  }

  return bindings;
}

function transformToDesignTokens(figmaData) {
  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
    semantic: {},
    metadata: {
      source: 'figma',
      fileKey: FIGMA_FILE_KEY,
      lastUpdated: new Date().toISOString(),
    },
  };

  // Create variable lookup maps
  const variablesById = {};
  const variablesByName = {};

  // First pass: Build lookup maps
  if (figmaData.meta?.variables) {
    Object.values(figmaData.meta.variables).forEach((variable) => {
      variablesById[variable.id] = variable;
      variablesByName[variable.name] = variable;
    });
  }

  // Helper function to resolve variable aliases
  function resolveVariableValue(variable, visited = new Set()) {
    if (visited.has(variable.id)) {
      console.warn(`Circular reference detected for variable: ${variable.name}`);
      return null;
    }
    visited.add(variable.id);

    const modeId = Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeId];

    // If it's an alias, resolve it
    if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
      const referencedVariable = variablesById[value.id];
      if (referencedVariable) {
        return resolveVariableValue(referencedVariable, visited);
      }
    }

    return value;
  }

  // Second pass: Process variables with alias resolution
  if (figmaData.meta?.variables) {
    Object.values(figmaData.meta.variables).forEach((variable) => {
      const { name, resolvedType } = variable;
      const resolvedValue = resolveVariableValue(variable);

      switch (resolvedType) {
        case 'COLOR':
          if (resolvedValue?.r !== undefined) {
            // Convert RGBA to hex
            const hex = rgbaToHex(resolvedValue.r, resolvedValue.g, resolvedValue.b, resolvedValue.a);

            // Categorize colors
            if (name.includes('/')) {
              // Semantic colors (Background/Neutral/Primary, Border/Brand/Default, etc.)
              tokens.semantic[name] = hex;
            } else {
              // Primitive colors (Green/500, Brand/800, etc.)
              tokens.colors[name] = hex;
            }
          }
          break;
        case 'FLOAT':
          // Could be spacing, border radius, etc.
          if (name.toLowerCase().includes('spacing')) {
            tokens.spacing[name] = `${resolvedValue}px`;
          }
          break;
        case 'STRING':
          // Typography or other string values
          if (name.toLowerCase().includes('font')) {
            tokens.typography[name] = resolvedValue;
          }
          break;
      }
    });
  }

  return tokens;
}

function rgbaToHex(r, g, b, a = 1) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? hex + toHex(a) : hex;
}

async function saveTokens(tokens) {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'design-tokens.json');
  const previousPath = path.join(OUTPUT_DIR, 'design-tokens.previous.json');

  // Backup previous tokens if they exist
  if (fs.existsSync(outputPath)) {
    fs.copyFileSync(outputPath, previousPath);
  }

  // Save new tokens
  fs.writeFileSync(outputPath, JSON.stringify(tokens, null, 2));

  console.log(`✅ Design tokens saved to: ${outputPath}`);
  return { outputPath, previousPath };
}

function detectChanges(currentPath, previousPath) {
  if (!fs.existsSync(previousPath)) {
    console.log('🆕 No previous tokens found - all tokens are new');
    return { hasChanges: true, changes: [] };
  }

  const current = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
  const previous = JSON.parse(fs.readFileSync(previousPath, 'utf8'));

  const changes = [];

  // Compare colors
  Object.keys(current.colors).forEach(key => {
    if (previous.colors[key] !== current.colors[key]) {
      changes.push({
        type: 'color',
        name: key,
        oldValue: previous.colors[key],
        newValue: current.colors[key],
      });
    }
  });

  // Compare spacing
  Object.keys(current.spacing).forEach(key => {
    if (previous.spacing[key] !== current.spacing[key]) {
      changes.push({
        type: 'spacing',
        name: key,
        oldValue: previous.spacing[key],
        newValue: current.spacing[key],
      });
    }
  });

  const hasChanges = changes.length > 0;

  if (hasChanges) {
    console.log(`🔍 Detected ${changes.length} design token changes:`);
    changes.forEach(change => {
      console.log(`  • ${change.type}: ${change.name} ${change.oldValue} → ${change.newValue}`);
    });
  } else {
    console.log('✅ No design token changes detected');
  }

  return { hasChanges, changes };
}

function resolveComponentVariables(componentVariables, variablesById) {
  const resolvedComponents = {};

  Object.entries(componentVariables).forEach(([componentName, variables]) => {
    resolvedComponents[componentName] = resolveVariableBindings(variables, variablesById);
  });

  return resolvedComponents;
}

function resolveVariableBindings(bindings, variablesById) {
  const resolved = {};

  Object.entries(bindings).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Nested bindings (child elements)
      resolved[key] = resolveVariableBindings(value, variablesById);
    } else if (typeof value === 'string' && value.startsWith('VariableID:')) {
      // Resolve variable ID to name and value
      const variable = variablesById[value];
      if (variable) {
        resolved[key] = {
          variableId: value,
          variableName: variable.name,
          resolvedValue: resolveVariableValue(variable)
        };
      } else {
        resolved[key] = value; // Keep original if not found
      }
    } else {
      resolved[key] = value;
    }
  });

  return resolved;

  function resolveVariableValue(variable, visited = new Set()) {
    if (visited.has(variable.id)) {
      return null;
    }
    visited.add(variable.id);

    const modeId = Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeId];

    if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
      const referencedVariable = variablesById[value.id];
      if (referencedVariable) {
        return resolveVariableValue(referencedVariable, visited);
      }
    }

    // Convert color values to hex
    if (value?.r !== undefined) {
      return rgbaToHex(value.r, value.g, value.b, value.a);
    }

    return value;
  }
}

async function main() {
  try {
    // 1. Fetch variables from Figma
    const figmaData = await fetchFigmaVariables();

    // 2. Fetch component variable assignments
    const componentVariables = await fetchComponentVariableAssignments();

    // 3. Transform to design tokens format
    const tokens = transformToDesignTokens(figmaData);

    // 4. Build variable lookup map for component resolution
    const variablesById = {};
    if (figmaData.meta?.variables) {
      Object.values(figmaData.meta.variables).forEach((variable) => {
        variablesById[variable.id] = variable;
      });
    }

    // 5. Resolve component variables to readable format
    const resolvedComponentVariables = resolveComponentVariables(componentVariables, variablesById);
    tokens.componentVariables = resolvedComponentVariables;

    // 6. Save tokens and detect changes
    const { outputPath, previousPath } = await saveTokens(tokens);
    const { hasChanges, changes } = detectChanges(outputPath, previousPath);

    // 7. Output results for GitHub Actions
    if (process.env.GITHUB_ACTIONS) {
      console.log(`::set-output name=has-changes::${hasChanges}`);
      console.log(`::set-output name=changes::${JSON.stringify(changes)}`);
    }

    console.log('🎉 Design token extraction complete!');

    if (hasChanges) {
      process.exit(0); // Success with changes
    } else {
      process.exit(1); // No changes (will skip subsequent steps)
    }

  } catch (error) {
    console.error('💥 Design token extraction failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { fetchFigmaVariables, transformToDesignTokens, detectChanges };