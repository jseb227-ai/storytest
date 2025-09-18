

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-designs",
    {
      "name": "storybook-addon-tag-badges",
      "options": {
        "badges": [
          {
            "value": "new",
            "color": "#28a745",
            "title": "New"
          },
          {
            "value": "stable",
            "color": "#0066cc",
            "title": "Stable"
          },
          {
            "value": "deprecated",
            "color": "#dc2626",
            "title": "Deprecated"
          }
        ]
      }
    }
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "features": {
    "buildStoriesJson": false
  }
};
export default config;