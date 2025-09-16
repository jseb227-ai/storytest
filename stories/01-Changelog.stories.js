import React from "react";
import { Box, Heading, Text } from "@vibe/core";

const Changelog = () => {
  const pageStyle = { 
    maxWidth: "920px", 
    margin: "0 auto", 
    padding: "48px 24px",
    lineHeight: "1.6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const sectionStyle = { marginBottom: "48px" };
  
  const versionStyle = {
    padding: "32px",
    border: "1px solid #e1e8ed",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "32px"
  };

  const versionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f0f0f0"
  };

  const badgeStyle = {
    padding: "4px 12px",
    borderRadius: "16px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  const latestBadgeStyle = {
    ...badgeStyle,
    backgroundColor: "#28a745",
    color: "#ffffff"
  };

  const changeItemStyle = {
    marginBottom: "16px",
    paddingLeft: "24px",
    position: "relative"
  };

  const changeTypeStyle = {
    position: "absolute",
    left: "0",
    top: "2px",
    fontSize: "16px"
  };

  const changeCategoryStyle = {
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginRight: "8px"
  };

  const newStyle = {
    ...changeCategoryStyle,
    backgroundColor: "#e3f2fd",
    color: "#1976d2"
  };

  const improvedStyle = {
    ...changeCategoryStyle,
    backgroundColor: "#e8f5e8",
    color: "#2e7d32"
  };

  const fixedStyle = {
    ...changeCategoryStyle,
    backgroundColor: "#fff3e0",
    color: "#f57c00"
  };

  return React.createElement("div", { style: pageStyle },
    
    // Header
    React.createElement("div", { style: { marginBottom: "48px" } },
      React.createElement(Heading, { 
        style: { 
          fontSize: "36px", 
          fontWeight: "700", 
          marginBottom: "16px",
          color: "#1a1a1a"
        } 
      }, "Changelog"),
      React.createElement(Text, { 
        style: { 
          fontSize: "20px", 
          color: "#6b7280", 
          lineHeight: "1.6"
        } 
      }, "Stay up-to-date with the latest improvements, new components, and bug fixes in our design system."),
    ),

    // Version 1.1.0
    React.createElement("div", { style: sectionStyle },
      React.createElement("div", { style: versionStyle },
        React.createElement("div", { style: versionHeaderStyle },
          React.createElement("div", null,
            React.createElement(Heading, { 
              style: { fontSize: "24px", fontWeight: "600", marginBottom: "4px", color: "#1f2937" } 
            }, "Version 1.1.0"),
            React.createElement(Text, { 
              style: { color: "#6b7280", fontSize: "14px" } 
            }, "Released on September 16, 2025")
          ),
          React.createElement("span", { style: latestBadgeStyle }, "Latest")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Onboarding Flow - Complete 4-step user onboarding experience with comprehensive documentation")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "User Flows section - Dedicated section for multi-step user experiences and workflows")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "ButtonGroup component - Grouped button layouts with proper spacing and styling")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "✨"),
          React.createElement("span", { style: improvedStyle }, "IMPROVED"),
          React.createElement(Text, { style: { display: "inline" } }, "Story organization - Components and Flows properly categorized with custom sorting")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "✨"),
          React.createElement("span", { style: improvedStyle }, "IMPROVED"),
          React.createElement(Text, { style: { display: "inline" } }, "Documentation styling - Professional formatting matching Vibe design system standards")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🐛"),
          React.createElement("span", { style: fixedStyle }, "FIXED"),
          React.createElement(Text, { style: { display: "inline" } }, "Badge system - Proper configuration for story tagging and visual indicators")
        )
      )
    ),

    // Version 1.0.0
    React.createElement("div", { style: sectionStyle },
      React.createElement("div", { style: versionStyle },
        React.createElement("div", { style: versionHeaderStyle },
          React.createElement("div", null,
            React.createElement(Heading, { 
              style: { fontSize: "24px", fontWeight: "600", marginBottom: "4px", color: "#1f2937" } 
            }, "Version 1.0.0"),
            React.createElement(Text, { 
              style: { color: "#6b7280", fontSize: "14px" } 
            }, "Released on September 15, 2025")
          )
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Initial Storybook setup with @vibe/core integration")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Button component stories with all variants and states")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Checkbox component with interactive examples")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Dropdown component with options and selection handling")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Avatar component with size variants and placeholder images")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Icons showcase with @vibe/icons library integration")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "🎉"),
          React.createElement("span", { style: newStyle }, "NEW"),
          React.createElement(Text, { style: { display: "inline" } }, "Interactive Button with advanced interaction patterns")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "⚙️"),
          React.createElement("span", { style: improvedStyle }, "SETUP"),
          React.createElement(Text, { style: { display: "inline" } }, "Accessibility testing with @storybook/addon-a11y")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "⚙️"),
          React.createElement("span", { style: improvedStyle }, "SETUP"),
          React.createElement(Text, { style: { display: "inline" } }, "Visual testing integration with Chromatic")
        ),
        
        React.createElement("div", { style: changeItemStyle },
          React.createElement("span", { style: changeTypeStyle }, "⚙️"),
          React.createElement("span", { style: improvedStyle }, "SETUP"),
          React.createElement(Text, { style: { display: "inline" } }, "Design tokens import and global styling configuration")
        )
      )
    ),

    // Contributing Section
    React.createElement("div", { style: sectionStyle },
      React.createElement("div", { 
        style: {
          padding: "32px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #e9ecef",
          borderRadius: "12px"
        }
      },
        React.createElement(Heading, { 
          style: { fontSize: "20px", fontWeight: "600", marginBottom: "16px", color: "#1f2937" } 
        }, "Want to contribute?"),
        React.createElement(Text, { 
          style: { color: "#4b5563", marginBottom: "16px" } 
        }, "We welcome contributions to improve our design system. Here's how you can help:"),
        React.createElement("ul", { style: { margin: 0, paddingLeft: "20px", color: "#4b5563" } },
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Report bugs and suggest improvements through our feedback channels")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Create new component stories following our established patterns")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Improve documentation and accessibility features")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Test components across different use cases and provide feedback")
          )
        )
      )
    )
  );
};

export default {
  title: "Changelog",
  tags: ['stable'],
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => React.createElement(Changelog)
    }
  },
  render: () => React.createElement(Changelog)
};