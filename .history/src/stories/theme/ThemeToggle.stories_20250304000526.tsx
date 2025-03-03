import type { Meta, StoryObj } from "@storybook/react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const meta: Meta<typeof ThemeToggle> = {
  title: "Theme/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    defaultTheme: "light",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const DarkModeDefault: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export const SystemDefault: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="system" storageKey="storybook-theme">
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
