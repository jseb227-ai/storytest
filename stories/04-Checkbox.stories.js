import React from "react";
import { Checkbox } from "@vibe/core";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export const Default = {
  args: {
    text: "Default checkbox",
    checked: false,
  },
};

export const Checked = {
  args: {
    text: "Checked checkbox",
    checked: true,
  },
};

export const Disabled = {
  args: {
    text: "Disabled checkbox",
    disabled: true,
  },
};

export const DisabledChecked = {
  args: {
    text: "Disabled checked checkbox",
    checked: true,
    disabled: true,
  },
};