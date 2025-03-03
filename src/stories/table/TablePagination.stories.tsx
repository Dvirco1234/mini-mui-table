import type { Meta, StoryObj } from '@storybook/react';
import { TablePagination } from '@/components/ui/table';

const meta: Meta<typeof TablePagination> = {
  title: 'Components/Table/Pagination',
  component: TablePagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof TablePagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    pageSize: 10,
    totalItems: 50,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    pageSizeOptions: [5, 10, 25, 50],
    className: '',
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    pageSizeOptions: [5, 10, 25, 50],
    className: '',
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    pageSizeOptions: [5, 10, 25, 50],
    className: '',
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    pageSizeOptions: [5, 10, 25, 50],
    className: '',
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    totalItems: 5,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    pageSizeOptions: [5, 10, 25, 50],
    className: '',
  },
};
