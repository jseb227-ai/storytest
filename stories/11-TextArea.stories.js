import { TextArea } from "@vibe/core";

export default {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    value: {
      control: { type: "text" },
    },
    placeholder: {
      control: { type: "text" },
    },
    label: {
      control: { type: "text" },
    },
    helpText: {
      control: { type: "text" },
    },
    maxLength: {
      control: { type: "number" },
    },
    success: {
      control: { type: "boolean" },
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
    resize: {
      control: { type: "boolean" },
    },
    showCharCount: {
      control: { type: "boolean" },
    },
    allowExceedingMaxLength: {
      control: { type: "boolean" },
    },
  },
};

export const Default = {
  args: {
    placeholder: "Enter your text here...",
    label: "Default TextArea",
  },
};

export const WithValue = {
  args: {
    value: "This is some sample text in the textarea.",
    label: "TextArea with Value",
    helpText: "This textarea has predefined content",
  },
};

export const Small = {
  args: {
    size: "small",
    placeholder: "Small textarea",
    label: "Small Size",
  },
};

export const Large = {
  args: {
    size: "large",
    placeholder: "Large textarea",
    label: "Large Size",
  },
};

export const WithCharacterCount = {
  args: {
    placeholder: "Type something...",
    label: "Character Count Example",
    maxLength: 100,
    showCharCount: true,
    helpText: "Try typing to see the character counter",
  },
};

export const WithCharacterLimit = {
  args: {
    placeholder: "Maximum 50 characters",
    label: "Character Limit",
    maxLength: 50,
    showCharCount: true,
    allowExceedingMaxLength: false,
    helpText: "You cannot exceed the 50 character limit",
  },
};

export const Success = {
  args: {
    value: "Valid input!",
    label: "Success State",
    success: true,
    helpText: "This input is valid",
  },
};

export const Error = {
  args: {
    value: "Invalid input",
    label: "Error State",
    error: true,
    helpText: "Please correct this input",
  },
};

export const Disabled = {
  args: {
    value: "This textarea is disabled",
    label: "Disabled TextArea",
    disabled: true,
    helpText: "This field cannot be edited",
  },
};

export const ReadOnly = {
  args: {
    value: "This textarea is read-only",
    label: "Read-Only TextArea",
    readOnly: true,
    helpText: "This field is for display only",
  },
};

export const Resizable = {
  args: {
    placeholder: "You can resize this textarea vertically",
    label: "Resizable TextArea",
    resize: true,
    helpText: "Drag the corner to resize",
  },
};

export const LongContent = {
  args: {
    value: "This is a textarea with a lot of content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    label: "Long Content Example",
    resize: true,
    helpText: "This textarea contains longer text content",
  },
};