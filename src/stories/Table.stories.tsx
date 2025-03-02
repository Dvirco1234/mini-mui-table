import type { Meta, StoryObj } from '@storybook/react';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TablePagination 
} from '@/components/ui/table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bob Johnson</TableCell>
          <TableCell>bob@example.com</TableCell>
          <TableCell>Editor</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithPagination: Story = {
  render: () => (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TablePagination
        currentPage={1}
        totalPages={5}
        pageSize={10}
        totalItems={50}
        onPageChange={() => {}}
        className="mt-4"
      />
    </div>
  ),
};
