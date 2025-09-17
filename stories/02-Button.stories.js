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
      options: ["xs", "small", "medium", "large"],
    },
    kind: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "negative", "positive", "dark"],
    },
    disabled: {
      control: "boolean",
    },
    active: {
      control: "boolean",
    },
    leftIcon: {
      control: "text",
    },
    rightIcon: {
      control: "text",
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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95689&m=dev",
    },
  },
};

export const Tertiary = {
  args: {
    children: "Button",
    kind: "tertiary",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95693&m=dev",
    },
  },
};