import type { Meta, StoryObj } from '@storybook/react';
import { 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TableFilters,
  TableSorters
} from '@/components/ui/table';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

// Define a meta object for the TableHead component
const meta: Meta = {
  title: 'Components/Table/BuildingBlocks',
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

// TableHead Stories
export const Head: StoryObj<typeof TableHead> = {
  render: () => (
    <table className="w-full border-collapse">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <tbody>
        <tr>
          <td className="p-4 border">1</td>
          <td className="p-4 border">John Doe</td>
          <td className="p-4 border">john@example.com</td>
        </tr>
      </tbody>
    </table>
  ),
};

// TableBody Stories
export const Body: StoryObj<typeof TableBody> = {
  render: () => (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-4 border">ID</th>
          <th className="p-4 border">Name</th>
          <th className="p-4 border">Email</th>
        </tr>
      </thead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
        </TableRow>
      </TableBody>
    </table>
  ),
};

// TableRow Stories
export const Row: StoryObj<typeof TableRow> = {
  render: () => (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-4 border">ID</th>
          <th className="p-4 border">Name</th>
          <th className="p-4 border">Email</th>
        </tr>
      </thead>
      <tbody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
        <tr className="border-b">
          <td className="p-4">2</td>
          <td className="p-4">Jane Smith</td>
          <td className="p-4">jane@example.com</td>
        </tr>
      </tbody>
    </table>
  ),
};

// TableRow with custom height
export const RowWithCustomHeight: StoryObj<typeof TableRow> = {
  render: () => (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-4 border">ID</th>
          <th className="p-4 border">Name</th>
          <th className="p-4 border">Email</th>
        </tr>
      </thead>
      <tbody>
        <TableRow rowHeight={80}>
          <TableCell>1</TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
        </TableRow>
      </tbody>
    </table>
  ),
};

// TableCell Stories
export const Cell: StoryObj<typeof TableCell> = {
  render: () => (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="p-4 border">Regular Cell</th>
          <th className="p-4 border">Custom Cell</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-4 border">Regular table cell</td>
          <TableCell className="bg-gray-100 dark:bg-gray-800">
            Custom styled table cell
          </TableCell>
        </tr>
      </tbody>
    </table>
  ),
};

// TableFilters Stories
export const Filters: StoryObj<typeof TableFilters> = {
  render: () => {
    const columns = [
      { id: 'name', label: 'Name', filterable: true },
      { id: 'email', label: 'Email', filterable: true },
      { id: 'role', label: 'Role', filterable: true },
    ];
    
    const filters = {
      name: 'John',
      email: '',
    };
    
    return (
      <TableFilters 
        columns={columns} 
        filters={filters} 
        onFilterChange={() => {}} 
      />
    );
  },
};

// TableSorters Stories
export const Sorters: StoryObj<typeof TableSorters> = {
  render: () => {
    const column = { id: 'name', label: 'Name', sortable: true };
    
    return (
      <div className="flex flex-col gap-4">
        <div className="p-2 border">
          <h3 className="mb-2 text-sm font-medium">Not Sorted:</h3>
          <TableSorters 
            column={column} 
            sortField="" 
            sortOrder="none" 
            onSort={() => {}} 
          />
        </div>
        
        <div className="p-2 border">
          <h3 className="mb-2 text-sm font-medium">Sorted Ascending:</h3>
          <TableSorters 
            column={column} 
            sortField="name" 
            sortOrder="asc" 
            onSort={() => {}} 
          />
        </div>
        
        <div className="p-2 border">
          <h3 className="mb-2 text-sm font-medium">Sorted Descending:</h3>
          <TableSorters 
            column={column} 
            sortField="name" 
            sortOrder="desc" 
            onSort={() => {}} 
          />
        </div>
        
        <div className="p-2 border">
          <h3 className="mb-2 text-sm font-medium">Non-sortable Column:</h3>
          <TableSorters 
            column={{ id: 'actions', label: 'Actions', sortable: false }} 
            sortField="" 
            sortOrder="none" 
            onSort={() => {}} 
          />
        </div>
      </div>
    );
  },
};
