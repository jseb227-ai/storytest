import React from "react";
import { Box, Heading, Text } from "@vibe/core";

const OnboardingFlowDocs = () => {
  const pageStyle = { 
    maxWidth: "920px", 
    margin: "0 auto", 
    padding: "48px 24px",
    lineHeight: "1.6",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  };

  const sectionStyle = { marginBottom: "64px" };
  const subsectionStyle = { marginBottom: "32px" };
  
  const cardStyle = {
    padding: "24px",
    border: "1px solid #e1e8ed",
    borderRadius: "12px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "24px",
    marginTop: "24px"
  };

  const codeStyle = {
    backgroundColor: "#f8f9fa",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: "20px",
    fontFamily: "Monaco, Consolas, monospace",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "24px 0",
    overflow: "auto"
  };

  const highlightBoxStyle = {
    padding: "20px 24px",
    backgroundColor: "#f0f7ff",
    border: "1px solid #b3d9ff",
    borderRadius: "8px",
    marginBottom: "32px"
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
      }, "User Flows"),
      React.createElement(Text, { 
        style: { 
          fontSize: "20px", 
          color: "#6b7280", 
          lineHeight: "1.6"
        } 
      }, "Guide users through multi-step experiences with structured, accessible flows built on Vibe components."),
      
      React.createElement("div", { style: highlightBoxStyle },
        React.createElement(Text, {
          style: { color: "#0066cc", fontWeight: "600", fontSize: "16px" }
        }, "💡 Perfect for onboarding, account setup, checkout processes, and guided workflows")
      )
    ),

    // When to Use
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "When to use"),
      React.createElement("div", { style: gridStyle },
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#059669" } }, "✅ Use when"),
          React.createElement("ul", { style: { margin: 0, paddingLeft: "20px" } },
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "You need to collect information across multiple steps")
            ),
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "The process requires validation at each step")
            ),
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "Users need clear progress indication")
            ),
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "You want to reduce cognitive load")
            )
          )
        ),
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#dc2626" } }, "❌ Don't use when"),
          React.createElement("ul", { style: { margin: 0, paddingLeft: "20px" } },
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "All information fits comfortably on one screen")
            ),
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "The process is too simple to warrant steps")
            ),
            React.createElement("li", { style: { marginBottom: "8px" } }, 
              React.createElement(Text, { style: { color: "#374151" } }, "Users need to see all options at once")
            )
          )
        )
      )
    ),

    // Anatomy
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "Anatomy"),
      React.createElement(Text, { 
        style: { fontSize: "16px", marginBottom: "24px", color: "#4b5563" } 
      }, "Every user flow consists of these essential elements:"),
      
      React.createElement("div", { style: gridStyle },
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "20px", marginBottom: "8px" } }, "📋"),
          React.createElement(Heading, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" } }, "Step Content"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "The main content area containing forms, information, or actions for each step")
        ),
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "20px", marginBottom: "8px" } }, "🧭"),
          React.createElement(Heading, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" } }, "Navigation"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Back/Next buttons with proper disabled states and clear labeling")
        ),
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "20px", marginBottom: "8px" } }, "📊"),
          React.createElement(Heading, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" } }, "Progress Indicator"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Visual feedback showing current position and overall progress")
        ),
        React.createElement("div", { style: cardStyle },
          React.createElement(Text, { style: { fontSize: "20px", marginBottom: "8px" } }, "⚠️"),
          React.createElement(Heading, { style: { fontSize: "18px", fontWeight: "600", marginBottom: "8px" } }, "Validation"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Real-time error checking with clear, actionable feedback messages")
        )
      )
    ),

    // Onboarding Flow Example
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "Example: Onboarding Flow"),
      React.createElement(Text, { 
        style: { fontSize: "16px", marginBottom: "32px", color: "#4b5563" } 
      }, "A 4-step user onboarding experience that introduces new users while collecting essential information."),
      
      React.createElement("div", { style: { ...gridStyle, gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" } },
        React.createElement("div", { style: { ...cardStyle, borderLeft: "4px solid #3b82f6" } },
          React.createElement(Text, { style: { fontSize: "14px", color: "#3b82f6", fontWeight: "600", marginBottom: "8px" } }, "STEP 1"),
          React.createElement(Heading, { style: { fontSize: "18px", marginBottom: "8px" } }, "Welcome"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Platform introduction and expectation setting")
        ),
        React.createElement("div", { style: { ...cardStyle, borderLeft: "4px solid #10b981" } },
          React.createElement(Text, { style: { fontSize: "14px", color: "#10b981", fontWeight: "600", marginBottom: "8px" } }, "STEP 2"),
          React.createElement(Heading, { style: { fontSize: "18px", marginBottom: "8px" } }, "User Info"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Name, email, and role collection with validation")
        ),
        React.createElement("div", { style: { ...cardStyle, borderLeft: "4px solid #f59e0b" } },
          React.createElement(Text, { style: { fontSize: "14px", color: "#f59e0b", fontWeight: "600", marginBottom: "8px" } }, "STEP 3"),
          React.createElement(Heading, { style: { fontSize: "18px", marginBottom: "8px" } }, "Preferences"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Optional settings and customization choices")
        ),
        React.createElement("div", { style: { ...cardStyle, borderLeft: "4px solid #8b5cf6" } },
          React.createElement(Text, { style: { fontSize: "14px", color: "#8b5cf6", fontWeight: "600", marginBottom: "8px" } }, "STEP 4"),
          React.createElement(Heading, { style: { fontSize: "18px", marginBottom: "8px" } }, "Complete"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Success confirmation and next steps")
        )
      )
    ),

    // Usage Guidelines
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "Usage guidelines"),
      
      React.createElement("div", { style: subsectionStyle },
        React.createElement(Heading, { style: { fontSize: "20px", fontWeight: "600", marginBottom: "16px" } }, "Content strategy"),
        React.createElement("ul", { style: { margin: 0, paddingLeft: "20px" } },
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Use action-oriented button labels ('Get Started', 'Continue', 'Finish')")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Keep step content focused and concise")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Clearly explain why information is needed")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Set realistic time expectations")
          )
        )
      ),

      React.createElement("div", { style: subsectionStyle },
        React.createElement(Heading, { style: { fontSize: "20px", fontWeight: "600", marginBottom: "16px" } }, "Accessibility"),
        React.createElement("ul", { style: { margin: 0, paddingLeft: "20px" } },
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Provide clear heading hierarchy and landmark roles")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Ensure full keyboard navigation support")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Include proper ARIA labels and announcements")
          ),
          React.createElement("li", { style: { marginBottom: "8px" } }, 
            React.createElement(Text, null, "Link error messages clearly to form fields")
          )
        )
      )
    ),

    // Implementation
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "Implementation"),
      React.createElement(Text, { 
        style: { fontSize: "16px", marginBottom: "24px", color: "#4b5563" } 
      }, "Basic implementation pattern using Vibe components:"),
      
      React.createElement("div", { style: codeStyle },
        React.createElement("pre", { style: { margin: 0 } },
          React.createElement("code", null, 
            "import { OnboardingFlow } from './flows';\n\n" +
            "function App() {\n" +
            "  const handleComplete = (userData) => {\n" +
            "    console.log('User completed onboarding:', userData);\n" +
            "    // Redirect to application\n" +
            "  };\n\n" +
            "  return (\n" +
            "    <OnboardingFlow\n" +
            "      initialStep={0}\n" +
            "      onComplete={handleComplete}\n" +
            "    />\n" +
            "  );\n" +
            "}"
          )
        )
      )
    ),

    // Related
    React.createElement("div", { style: sectionStyle },
      React.createElement(Heading, { 
        style: { fontSize: "28px", fontWeight: "600", marginBottom: "24px", color: "#1f2937" } 
      }, "Related components"),
      React.createElement("div", { style: { ...gridStyle, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" } },
        React.createElement("div", { style: { ...cardStyle, textAlign: "center" } },
          React.createElement(Text, { style: { fontSize: "24px", marginBottom: "8px" } }, "🔘"),
          React.createElement(Heading, { style: { fontSize: "16px", marginBottom: "4px" } }, "Button"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Navigation actions")
        ),
        React.createElement("div", { style: { ...cardStyle, textAlign: "center" } },
          React.createElement(Text, { style: { fontSize: "24px", marginBottom: "8px" } }, "📝"),
          React.createElement(Heading, { style: { fontSize: "16px", marginBottom: "4px" } }, "TextField"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Data collection")
        ),
        React.createElement("div", { style: { ...cardStyle, textAlign: "center" } },
          React.createElement(Text, { style: { fontSize: "24px", marginBottom: "8px" } }, "📋"),
          React.createElement(Heading, { style: { fontSize: "16px", marginBottom: "4px" } }, "Dropdown"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Selection lists")
        ),
        React.createElement("div", { style: { ...cardStyle, textAlign: "center" } },
          React.createElement(Text, { style: { fontSize: "24px", marginBottom: "8px" } }, "📦"),
          React.createElement(Heading, { style: { fontSize: "16px", marginBottom: "4px" } }, "Box & Flex"),
          React.createElement(Text, { style: { color: "#6b7280", fontSize: "14px" } }, "Layout structure")
        )
      )
    )
  );
};

export default {
  title: "Flows/Onboarding Flow",
  tags: ['new'],
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => React.createElement(OnboardingFlowDocs)
    }
  }
};

export const Docs = {
  parameters: {
    docs: {
      page: () => React.createElement(OnboardingFlowDocs)
    }
  },
  render: () => React.createElement(OnboardingFlowDocs)
};