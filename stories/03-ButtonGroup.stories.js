import React from "react";
import { Button } from "@vibe/core";

// Simple ButtonGroup implementation using CSS flexbox
const ButtonGroup = ({ children, size, disabled, ...props }) => {
  return React.createElement("div", {
    style: {
      display: "flex",
      gap: "0",
      borderRadius: "var(--border-radius-small)",
      overflow: "hidden",
      border: "1px solid var(--ui-border-color)"
    },
    ...props
  }, 
  React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child, {
      ...child.props,
      size: size || child.props.size,
      disabled: disabled || child.props.disabled,
      style: {
        ...child.props.style,
        borderRadius: "0",
        border: "none",
        borderRight: index < React.Children.count(children) - 1 ? "1px solid var(--ui-border-color)" : "none"
      }
    });
  }));
};

export default {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export const Default = {
  render: () => 
    React.createElement(ButtonGroup, null,
      React.createElement(Button, { kind: "secondary" }, "First"),
      React.createElement(Button, { kind: "secondary" }, "Second"),
      React.createElement(Button, { kind: "secondary" }, "Third")
    ),
};

export const WithSelection = {
  render: () => {
    const [selected, setSelected] = React.useState("option2");
    
    return React.createElement(ButtonGroup, null,
      React.createElement(Button, { 
        kind: selected === "option1" ? "primary" : "secondary",
        onClick: () => setSelected("option1")
      }, "Option 1"),
      React.createElement(Button, { 
        kind: selected === "option2" ? "primary" : "secondary",
        onClick: () => setSelected("option2")
      }, "Option 2"),
      React.createElement(Button, { 
        kind: selected === "option3" ? "primary" : "secondary",
        onClick: () => setSelected("option3")
      }, "Option 3")
    );
  },
};

export const MixedKinds = {
  render: () => 
    React.createElement(ButtonGroup, null,
      React.createElement(Button, { kind: "primary" }, "Primary"),
      React.createElement(Button, { kind: "secondary" }, "Secondary"),
      React.createElement(Button, { kind: "tertiary" }, "Tertiary")
    ),
};

export const Small = {
  args: {
    size: "small",
  },
  render: (args) => 
    React.createElement(ButtonGroup, args,
      React.createElement(Button, { kind: "secondary" }, "Small"),
      React.createElement(Button, { kind: "secondary" }, "Button"),
      React.createElement(Button, { kind: "secondary" }, "Group")
    ),
};

export const Large = {
  args: {
    size: "large",
  },
  render: (args) => 
    React.createElement(ButtonGroup, args,
      React.createElement(Button, { kind: "secondary" }, "Large"),
      React.createElement(Button, { kind: "secondary" }, "Button"),
      React.createElement(Button, { kind: "secondary" }, "Group")
    ),
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (args) => 
    React.createElement(ButtonGroup, args,
      React.createElement(Button, { kind: "secondary" }, "Disabled"),
      React.createElement(Button, { kind: "secondary" }, "Button"),
      React.createElement(Button, { kind: "secondary" }, "Group")
    ),
};

export const SegmentedControl = {
  render: () => {
    const [view, setView] = React.useState("list");
    
    return React.createElement("div", null,
      React.createElement("p", 
        { style: { marginBottom: "16px", color: "var(--secondary-text-color)" } },
        `Current view: ${view}`
      ),
      React.createElement(ButtonGroup, null,
        React.createElement(Button, { 
          kind: view === "list" ? "primary" : "secondary",
          onClick: () => setView("list")
        }, "List"),
        React.createElement(Button, { 
          kind: view === "grid" ? "primary" : "secondary",
          onClick: () => setView("grid")
        }, "Grid"),
        React.createElement(Button, { 
          kind: view === "cards" ? "primary" : "secondary",
          onClick: () => setView("cards")
        }, "Cards")
      )
    );
  },
};