import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@/components/layout/Navigation';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const meta: Meta<typeof Navigation> = {
  title: 'Layout/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="px-4 pb-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <div className="px-4 pb-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
