import { Button } from "@vibe/core";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    kind: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
  },
};

export const Primary = {
  args: {
    children: "Button",
    kind: "primary",
  },
};

export const Secondary = {
  args: {
    children: "Button",
    kind: "secondary",
  },
};

export const Large = {
  args: {
    size: "large",
    children: "Button",
  },
};

export const Small = {
  args: {
    size: "small",
    children: "Button",
  },
};