import React from "react";
import { Dropdown } from "@vibe/core";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
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
  },
};

export const WithValue = {
  args: {
    placeholder: "Select an option",
    options: defaultOptions,
    value: defaultOptions[1],
  },
};

export const Disabled = {
  args: {
    placeholder: "Disabled dropdown",
    options: defaultOptions,
    disabled: true,
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
  },
};