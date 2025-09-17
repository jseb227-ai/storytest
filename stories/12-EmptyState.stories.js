import React from "react";
import { EmptyState } from "@vibe/core";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["default", "compact"],
    },
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
};

export const Default = {
  args: {
    title: "No items found",
    description: "There are no items to display at the moment. Try creating a new item or adjusting your filters.",
    layout: "default",
  },
};

export const Compact = {
  args: {
    title: "Empty folder",
    description: "This folder is empty. Add files to get started.",
    layout: "compact",
  },
};

export const WithMainAction = {
  args: {
    title: "No projects yet",
    description: "Create your first project to start organizing your work and collaborating with your team.",
    mainAction: {
      text: "Create Project",
      onClick: () => console.log("Create project clicked"),
    },
    layout: "default",
  },
};

export const WithBothActions = {
  args: {
    title: "No data available",
    description: "We couldn't find any data to display. You can import data or create new entries.",
    mainAction: {
      text: "Import Data",
      onClick: () => console.log("Import data clicked"),
    },
    supportingAction: {
      text: "Learn more",
      kind: "tertiary",
      onClick: () => console.log("Learn more clicked"),
    },
    layout: "default",
  },
};

export const NoTitle = {
  args: {
    description: "This empty state has no title, just a description explaining the current state.",
    layout: "default",
  },
};