import "@vibe/core/tokens";
// import "vibe-storybook-components/index.css"; // Temporarily disabled due to Storybook 9 incompatibility

// Initialize injected styles object for @vibe/core
globalThis.injectedStyles = {};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    },

    options: {
      storySort: {
        order: ['Components', 'Flows', ['Onboarding Flow', ['Docs', '*']]]
      }
    },

    toolbar: {
      'storybook/create-story': { hidden: true }
    }
  },

  tags: ['autodocs']
};

export default preview;