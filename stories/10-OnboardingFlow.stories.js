import React from "react";
import { Button, Box, Text, Heading, TextField, Dropdown } from "@vibe/core";

const OnboardingFlow = ({ initialStep = 0, onComplete }) => {
  const [currentStep, setCurrentStep] = React.useState(initialStep);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    role: ""
  });

  const roleOptions = [
    { value: "developer", label: "Developer" },
    { value: "designer", label: "Designer" },
    { value: "manager", label: "Product Manager" }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    onComplete && onComplete(formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return React.createElement(Box, { padding: "large" },
          React.createElement(Heading, null, "Welcome to Vibe!"),
          React.createElement(Text, null, "Let's get you set up with a quick onboarding process.")
        );
      case 1:
        return React.createElement(Box, { padding: "large" },
          React.createElement(Heading, null, "Tell us about yourself"),
          React.createElement(TextField, {
            title: "Full Name",
            placeholder: "Enter your full name",
            value: formData.fullName,
            onChange: (value) => updateFormData("fullName", value)
          }),
          React.createElement(TextField, {
            title: "Email",
            placeholder: "Enter your email",
            type: "email",
            value: formData.email,
            onChange: (value) => updateFormData("email", value)
          }),
          React.createElement(Text, null, "Role"),
          React.createElement(Dropdown, {
            placeholder: "Select your role",
            options: roleOptions,
            value: formData.role,
            onOptionSelect: (option) => updateFormData("role", option.value)
          })
        );
      case 2:
        return React.createElement(Box, { padding: "large" },
          React.createElement(Heading, null, "Preferences"),
          React.createElement(Text, null, "Your settings have been saved.")
        );
      case 3:
        return React.createElement(Box, { padding: "large" },
          React.createElement(Heading, null, "Complete!"),
          React.createElement(Text, null, "Welcome to Vibe! You're all set.")
        );
      default:
        return React.createElement(Text, null, "Step not found");
    }
  };

  return React.createElement(Box, { 
    padding: "large",
    style: { maxWidth: "500px", margin: "0 auto" }
  },
    React.createElement(Text, null, `Step ${currentStep + 1} of 4`),
    React.createElement("div", { style: { minHeight: "200px", margin: "20px 0" } },
      renderStepContent()
    ),
    React.createElement("div", { 
      style: { 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
      }
    },
      React.createElement(Button, {
        kind: "tertiary",
        onClick: handleBack,
        disabled: currentStep === 0
      }, "Back"),
      currentStep < 3 
        ? React.createElement(Button, {
            kind: "primary",
            onClick: handleNext
          }, currentStep === 0 ? "Get Started" : "Continue")
        : React.createElement(Button, {
            kind: "primary", 
            onClick: handleFinish
          }, "Finish")
    )
  );
};

export default {
  title: "Flows/Onboarding Flow",
  component: OnboardingFlow,
  tags: ['new'],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# User Flows

User flows are complete end-to-end experiences that guide users through multi-step processes. These flows combine multiple Vibe Design System components to create cohesive, intuitive journeys that help users accomplish specific goals.

## What are User Flows?

User flows represent complex user interactions that span multiple screens or steps, typically involving:

- **Sequential Navigation** - Step-by-step progression through a process
- **State Management** - Persistent data across multiple steps  
- **Form Validation** - Real-time feedback and error handling
- **Progress Indication** - Clear visual feedback on completion status
- **Responsive Design** - Optimal experience across all devices

## Design Principles

### 1. Clarity & Simplicity
Each step should have a clear purpose and minimal cognitive load. Users should always understand where they are in the process, what they need to do next, and how to go back if needed.

### 2. Progressive Disclosure
Information is revealed gradually to avoid overwhelming users. Only show relevant fields for each step, provide contextual help when needed, and group related information logically.

### 3. Forgiveness & Flexibility
Allow users to correct mistakes and change their minds. Enable navigation between completed steps, provide clear error messages with actionable guidance, and allow users to skip optional steps.

### 4. Feedback & Reassurance
Keep users informed about their progress with visual progress indicators, confirmation of completed actions, and clear next steps and expectations.

---

# Onboarding Flow

A comprehensive 4-step user onboarding experience built with Vibe Design System components. This flow guides new users through account setup while collecting essential information and preferences.

## Overview

The onboarding flow is designed to:
- **Welcome** new users to the platform
- **Collect** essential profile information
- **Configure** user preferences and settings  
- **Confirm** successful setup and provide next steps

## Flow Structure

### Step 1: Welcome
- Platform introduction and value proposition
- Sets expectations for the onboarding process
- Encourages users to begin their journey

### Step 2: User Information
- **Full Name** - Personal identification
- **Email Address** - Account communication and login
- **Role** - Customizes experience based on user type (Developer, Designer, Manager, etc.)

### Step 3: Preferences
- **Notification Settings** - Control communication preferences
- **Theme Selection** - Choose light or dark mode interface
- **Additional Settings** - Optional customization options

### Step 4: Completion
- Success confirmation and welcome message
- Overview of next steps and available actions
- Call-to-action buttons for immediate engagement

## Technical Features

### State Management
- **Form Data Persistence** - Values maintained across all steps
- **Validation Handling** - Real-time error checking and feedback
- **Step Navigation** - Forward/backward movement with validation gates

### User Experience
- **Progressive Disclosure** - Information revealed step-by-step
- **Clear Navigation** - Back/Next buttons with appropriate states
- **Progress Indication** - Step counter and completion tracking
- **Responsive Design** - Optimized for all screen sizes

### Accessibility
- **Keyboard Navigation** - Full keyboard support throughout
- **Screen Reader Compatible** - Proper ARIA labels and structure
- **Focus Management** - Logical tab order and visual indicators
- **Error Announcements** - Clear feedback for validation issues

## Components Used

- **Layout**: \`Box\`, \`Flex\` for responsive positioning
- **Typography**: \`Heading\`, \`Text\` for content hierarchy
- **Forms**: \`TextField\`, \`Dropdown\` for data collection
- **Navigation**: \`Button\` with multiple variants and states
- **Interaction**: Standard HTML form elements with Vibe styling

## Usage Examples

### Basic Implementation
\`\`\`javascript
<OnboardingFlow 
  initialStep={0}
  onComplete={(data) => {
    // Handle completion
    console.log('User data:', data);
    redirectToApplication(data);
  }}
/>
\`\`\`

### Custom Starting Point
\`\`\`javascript
// Start from a specific step (useful for testing)
<OnboardingFlow 
  initialStep={2}
  onComplete={handleCompletion}
/>
\`\`\`

## Data Collection

The flow collects the following user data:

\`\`\`javascript
{
  fullName: string,     // User's display name
  email: string,        // Contact and login email
  role: string          // User type (developer, designer, manager, etc.)
}
\`\`\`

## Best Practices

### Content Strategy
- Keep step content focused and concise
- Use encouraging, friendly language
- Clearly explain the value of providing information
- Set realistic time expectations

### Form Design
- Mark required fields clearly
- Provide helpful placeholder text
- Use appropriate input types (email, text, etc.)
- Validate inputs progressively

### Navigation
- Always provide a way to go back
- Disable navigation when validation fails
- Show clear progress indicators
- Enable step jumping for completed sections

## Customization

The flow can be extended with:
- Additional steps for specific use cases
- Custom validation rules and error messages
- Integration with external APIs for data submission
- Enhanced progress visualization components
- Personalized content based on user selections

## Performance Considerations

- Components are loaded efficiently using React patterns
- State updates are optimized to prevent unnecessary re-renders
- Form validation is debounced for better user experience
- Navigation state is managed efficiently across steps

---

# Implementation Guidelines

## Component Usage
Flows are built using core Vibe Design System components:

- **Layout**: \`Box\`, \`Flex\` for responsive positioning
- **Navigation**: \`Button\` with proper states and variants
- **Forms**: \`TextField\`, \`Dropdown\`, \`Checkbox\`, \`RadioButton\`, \`Toggle\`
- **Typography**: \`Heading\`, \`Text\` for content hierarchy
- **Feedback**: Progress indicators and validation messages

## Accessibility Considerations

All flows follow accessibility best practices:

- **Semantic HTML**: Proper heading hierarchy and landmark roles
- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Reader Support**: ARIA labels and announcements
- **Focus Management**: Clear visual focus indicators
- **Error Handling**: Descriptive error messages linked to form fields

## State Management

Flows maintain state across steps using:

- **Form Data Persistence**: Values saved between steps
- **Validation State**: Real-time error tracking
- **Progress Tracking**: Current step and completion status
- **Navigation History**: Ability to revisit previous steps

## Responsive Design

Flows adapt to different screen sizes:

- **Mobile-First**: Optimized for touch interactions
- **Flexible Layouts**: Components reflow for different viewports
- **Touch Targets**: Appropriately sized interactive elements
- **Content Prioritization**: Most important information stays visible

# Best Practices

## Content Strategy

1. **Use Clear, Action-Oriented Language**
   - Button labels that describe the action ("Get Started", "Continue", "Finish Setup")
   - Headings that explain the step's purpose
   - Help text that provides context without overwhelming

2. **Minimize Required Fields**
   - Only ask for essential information
   - Mark optional fields clearly
   - Explain why information is needed

3. **Provide Context and Progress**
   - Show current step and total steps
   - Explain what happens after completion
   - Set appropriate expectations for time investment

## Technical Implementation

1. **Performance Optimization**
   - Lazy load components for later steps
   - Minimize re-renders during state updates
   - Use efficient validation patterns

2. **Error Handling**
   - Validate inputs in real-time when appropriate
   - Show errors near the relevant fields
   - Provide clear recovery paths

3. **Testing Strategy**
   - Test each step in isolation
   - Verify complete flow functionality
   - Test across different devices and browsers
   - Validate accessibility compliance

# Future Flows

Planned additions to the Flows library:

- **Payment Flow** - Secure checkout and payment processing
- **Settings Flow** - Account and preference management
- **Data Import Flow** - File upload and data migration
- **Verification Flow** - Identity and email verification
- **Survey Flow** - Feedback and data collection
        `
      }
    }
  },
  args: {
    onComplete: (data) => {
      console.log("Onboarding completed:", data);
      alert("Onboarding completed! Check console for data.");
    }
  }
};

export const CompleteFlow = {
  args: {
    initialStep: 0
  },
  parameters: {
    docs: {
      description: {
        story: "The complete onboarding experience from start to finish. Users can navigate through all 4 steps, entering their information and preferences along the way."
      }
    }
  }
};

export const WelcomeStep = {
  args: {
    initialStep: 0
  },
  parameters: {
    docs: {
      description: {
        story: "The initial welcome step that introduces users to the platform and sets expectations for the onboarding process. This step builds confidence and motivation to continue."
      }
    }
  }
};

export const UserInfoStep = {
  args: {
    initialStep: 1
  },
  parameters: {
    docs: {
      description: {
        story: "The information collection step where users provide their name, email, and role. This data is essential for personalizing their experience and enabling platform features."
      }
    }
  }
};

export const PreferencesStep = {
  args: {
    initialStep: 2
  },
  parameters: {
    docs: {
      description: {
        story: "The customization step where users can configure their preferences and settings. This step is designed to be optional and user-friendly."
      }
    }
  }
};

export const CompleteStep = {
  args: {
    initialStep: 3
  },
  parameters: {
    docs: {
      description: {
        story: "The completion step that celebrates successful onboarding and provides clear next steps. This creates a positive ending experience and guides users toward engagement."
      }
    }
  }
};