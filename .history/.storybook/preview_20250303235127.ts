import type { Preview } from "@storybook/react";
import "../tailwind.config"; // Adjust the path to your Tailwind file
import "../src/app/globals.css"; // If you have a global styles file

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
