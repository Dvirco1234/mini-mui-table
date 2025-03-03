import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";

interface SimpleUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const meta: Meta<typeof Table> = {
  title: "Components/Table/Base",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const simpleData: SimpleUser[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Viewer",
  },
];

const simpleColumns: Columns<SimpleUser> = [
  { id: "id", label: "ID", sortable: true },
  { id: "name", label: "Name", sortable: true },
  { id: "email", label: "Email", sortable: true },
  { id: "role", label: "Role", sortable: true },
];

export const Basic: Story = {
  args: {
    data: simpleData,
    columns: simpleColumns,
    bordered: true,
    className: "w-full",
  },
};

export const WithPagination: Story = {
  args: {
    data: simpleData,
    columns: simpleColumns,
    bordered: true,
    className: "w-full",
    pagination: {
      currentPage: 1,
      pageSize: 3,
      totalItems: simpleData.length,
      pageSizeOptions: [3, 5, 10],
      onPageChange: () => {},
      onPageSizeChange: () => {},
    },
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns: simpleColumns,
    bordered: true,
    className: "w-full",
    loading: true,
  },
};

export const NoResults: Story = {
  args: {
    data: [],
    columns: simpleColumns,
    bordered: true,
    className: "w-full",
    loading: false,
  },
};
