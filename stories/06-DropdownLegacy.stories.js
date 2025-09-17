import React from "react";
import { Dropdown } from "@vibe/core";

export default {
  title: "Components/Dropdown (Legacy)",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs", "deprecated"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    searchable: {
      control: { type: "boolean" },
    },
    clearable: {
      control: { type: "boolean" },
    },
    multi: {
      control: { type: "boolean" },
    },
  },
};

const defaultOptions = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
];

export const Default = {
  args: {
    placeholder: "Select an option",
    options: defaultOptions,
    size: "medium",
    onOptionSelect: (option) => console.log("Selected:", option),
  },
};

export const Large = {
  args: {
    placeholder: "Large dropdown",
    options: defaultOptions,
    size: "large",
    onOptionSelect: (option) => console.log("Selected:", option),
  },
};

export const Searchable = {
  args: {
    placeholder: "Search for an option",
    options: defaultOptions,
    size: "medium",
    searchable: true,
    onOptionSelect: (option) => console.log("Selected:", option),
  },
};

export const MultiSelect = {
  args: {
    placeholder: "Select multiple options",
    options: defaultOptions,
    size: "medium",
    multi: true,
    clearable: true,
    onOptionSelect: (option) => console.log("Selected:", option),
  },
};

export const LongOptions = {
  args: {
    placeholder: "Select a country",
    options: [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "Japan", value: "jp" },
      { label: "Brazil", value: "br" },
    ],
    size: "large",
    searchable: true,
    onOptionSelect: (option) => console.log("Selected:", option),
  },
};