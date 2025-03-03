import type { Meta, StoryObj } from '@storybook/react';
import { CustomFilters } from '@/components/demo/CustomFilters';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useState } from 'react';

const meta: Meta<typeof CustomFilters> = {
  title: 'Components/CustomFilters',
  component: CustomFilters,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-4 border rounded-md">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomFilters>;

// Interactive example with state
const InteractiveCustomFilters = () => {
  const [filters, setFilters] = useState<{
    albumId?: string;
    title?: string;
    id?: string;
  }>({});

  const handleFiltersChange = (newFilters: {
    albumId?: string;
    title?: string;
    id?: string;
  }) => {
    setFilters(newFilters);
  };

  const albumIds = [1, 2, 3, 4, 5];

  return (
    <div>
      <CustomFilters
        onFiltersChange={handleFiltersChange}
        filters={filters}
        albumIds={albumIds}
      />
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium mb-2">Current Filters:</h3>
        <pre className="text-sm">{JSON.stringify(filters, null, 2)}</pre>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    filters: {},
    albumIds: [1, 2, 3, 4, 5],
    onFiltersChange: () => {},
  },
};

export const WithValues: Story = {
  args: {
    filters: {
      albumId: '2',
      title: 'test',
    },
    albumIds: [1, 2, 3, 4, 5],
    onFiltersChange: () => {},
  },
};

export const Interactive: Story = {
  render: () => <InteractiveCustomFilters />,
};
