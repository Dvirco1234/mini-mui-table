import type { Meta, StoryObj } from '@storybook/react';
import { CustomFiltersDemo } from '@/components/demo/CustomFiltersDemo';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const meta: Meta<typeof CustomFiltersDemo> = {
  title: 'Demos/CustomFiltersDemo',
  component: CustomFiltersDemo,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Custom Filters Demo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This demo showcases a table with advanced custom filtering capabilities.
            Users can filter photos by album ID, title, and ID.
          </p>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomFiltersDemo>;

// The main story doesn't need args since the component fetches data internally
export const Default: Story = {};

// Mock implementation for when we don't want to make real API calls
export const Mocked: Story = {
  parameters: {
    mockData: true,
  },
};
