import type { Meta, StoryObj } from '@storybook/react';
import { PhotoTable } from '@/components/demo/PhotoTable';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const meta: Meta<typeof PhotoTable> = {
  title: 'Demos/PhotoTable',
  component: PhotoTable,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Photos Table Demo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This demo showcases a table of photos with thumbnails, sorting, and
            pagination capabilities. Data is fetched from the JSONPlaceholder API.
          </p>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PhotoTable>;

// The main story doesn't need args since the component fetches data internally
export const Default: Story = {};

// Mock implementation for when we don't want to make real API calls
export const Mocked: Story = {
  parameters: {
    mockData: true,
  },
};
