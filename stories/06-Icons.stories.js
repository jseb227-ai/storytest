import React from "react";
import * as Icons from "@vibe/icons";
import { IconButton } from "@vibe/core";

export default {
  title: "Components/Icons",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export const IconShowcase = {
  render: () => {
    // Get all icon components from @vibe/icons
    const iconNames = Object.keys(Icons).filter(key => {
      const component = Icons[key];
      return typeof component === 'function' && 
             (component.displayName || component.name) &&
             !key.startsWith('_');
    }).sort();

    return React.createElement("div", 
      { style: { fontFamily: "var(--font-family)", padding: "20px" } },
      
      React.createElement("h2", 
        { style: { color: "var(--primary-text-color)", marginBottom: "24px" }}, 
        "@vibe/icons Showcase"
      ),

      React.createElement("p", 
        { style: { color: "var(--secondary-text-color)", marginBottom: "24px" }},
        `Total icons available: ${iconNames.length}`
      ),

      React.createElement("div", 
        { style: { 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", 
          gap: "16px",
          marginBottom: "40px"
        }},
        ...iconNames.slice(0, 50).map(iconName => {
          const IconComponent = Icons[iconName];
          return React.createElement("div", 
            { 
              key: iconName,
              style: { 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "12px", 
                border: "1px solid var(--ui-border-color)", 
                borderRadius: "var(--border-radius-small)",
                backgroundColor: "var(--primary-background-color)",
                textAlign: "center"
              }
            },
            React.createElement(IconComponent, { 
              style: { width: "24px", height: "24px", marginBottom: "8px" }
            }),
            React.createElement("span", 
              { style: { fontSize: "12px", color: "var(--secondary-text-color)" } },
              iconName
            )
          );
        })
      ),

      React.createElement("h3", 
        { style: { color: "var(--primary-text-color)", marginBottom: "16px" }}, 
        "Icons with IconButton"
      ),

      React.createElement("div", 
        { style: { display: "flex", gap: "12px", marginBottom: "32px" } },
        ...iconNames.slice(0, 8).map(iconName => {
          const IconComponent = Icons[iconName];
          return React.createElement(IconButton, {
            key: iconName,
            icon: IconComponent,
            ariaLabel: iconName
          });
        })
      ),

      React.createElement("div", 
        { style: { 
          padding: "24px", 
          backgroundColor: "var(--ui-background-color)",
          borderRadius: "var(--border-radius-medium)"
        }},
        React.createElement("h3", 
          { style: { color: "var(--primary-text-color)", marginBottom: "16px" }}, 
          "Usage Examples"
        ),
        React.createElement("pre", 
          { style: { 
            fontSize: "14px", 
            fontFamily: "monospace",
            marginBottom: "16px",
            backgroundColor: "var(--primary-background-color)",
            padding: "12px",
            borderRadius: "var(--border-radius-small)"
          }},
          `// Import specific icons
import { Search, Add, Close } from "@vibe/icons";

// Use standalone
<Search />

// Use with IconButton
import { IconButton } from "@vibe/core";
<IconButton icon={Search} />`
        ),
        React.createElement("pre", 
          { style: { 
            fontSize: "14px", 
            fontFamily: "monospace",
            backgroundColor: "var(--primary-background-color)",
            padding: "12px",
            borderRadius: "var(--border-radius-small)"
          }},
          `// Import all icons
import * as Icons from "@vibe/icons";

// Use with namespace
<Icons.Search />
<IconButton icon={Icons.Add} />`
        )
      )
    );
  },
};