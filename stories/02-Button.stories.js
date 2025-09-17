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

export const Large = {
  args: {
    size: "large",
    children: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95760&m=dev",
    },
  },
};

export const Small = {
  args: {
    size: "small",
    children: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95775&m=dev",
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

export const Medium = {
  args: {
    size: "medium",
    children: "Button",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/fOlte4EUiA3VAEzIpIlk9G/Vibe-UI-Kit-by-monday.com--Community-?node-id=46939-95765&m=dev",
    },
  },
};

// States
export const Hover = {
  args: {
    children: "Hover",
  },
};

export const Active = {
  args: {
    children: "Active",
    active: true,
  },
};

export const Disabled = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

// Icons
export const IconLeft = {
  args: {
    children: "Icon left",
    leftIcon: "icon",
  },
};

export const IconRight = {
  args: {
    children: "Icon right",
    rightIcon: "icon",
  },
};

export const Default = {
  args: {
    children: "Default",
  },
};

// Colors
export const ColorPrimary = {
  args: {
    children: "Primary",
    color: "primary",
  },
};

export const ColorNegative = {
  args: {
    children: "Primary",
    color: "negative",
  },
};

export const ColorPositive = {
  args: {
    children: "Primary",
    color: "positive",
  },
};

export const ColorDark = {
  args: {
    children: "Primary",
    color: "dark",
  },
};

// XS Size
export const ExtraSmall = {
  args: {
    size: "xs",
    children: "XS",
  },
};