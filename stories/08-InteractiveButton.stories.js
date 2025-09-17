import React from "react";
import { Button } from "@vibe/core";

export default {
  title: "Components/Interactive Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    kind: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    onClick: () => console.log('Button clicked'),
  },
};

export const Interactive = {
  args: {
    kind: "primary",
    children: "Click me!",
  },
  play: async ({ args, canvasElement }) => {
    // This would be where you'd add interaction tests
    // For now, we'll just set up the action logging
    console.log('Button story loaded with interactions enabled');
  },
};

export const WithActions = {
  args: {
    kind: "secondary",
    children: "Button with Actions",
    onClick: () => console.log('Button clicked'),
    onMouseEnter: () => console.log('Mouse entered'),
    onMouseLeave: () => console.log('Mouse left'),
  },
};

export const Disabled = {
  args: {
    kind: "primary",
    children: "Disabled Button",
    disabled: true,
    onClick: () => console.log('Button clicked (disabled)'),
  },
};