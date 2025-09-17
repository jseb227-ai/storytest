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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95686&m=dev",
    },
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