import type { Preview } from "@storybook/react";
import "../src/index.css"; // Adjust the path to your Tailwind file
import "../src/globals.css"; // If you have a global styles file

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
