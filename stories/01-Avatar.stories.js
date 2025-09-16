import React from "react";
import { Avatar } from "@vibe/core";

export default {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: { type: "text" },
    },
    backgroundColor: {
      control: { type: "color" },
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
};

export const Default = {
  args: {
    text: "AB",
  },
};

export const WithCustomColor = {
  args: {
    text: "JD",
    backgroundColor: "var(--primary-color)",
  },
};

export const Small = {
  args: {
    text: "SM",
    size: "small",
  },
};

export const Large = {
  args: {
    text: "LG",
    size: "large",
  },
};

export const SingleLetter = {
  args: {
    text: "A",
    backgroundColor: "#ff6b35",
  },
};

export const ThreeLetters = {
  args: {
    text: "ABC",
    backgroundColor: "#4ecdc4",
  },
};