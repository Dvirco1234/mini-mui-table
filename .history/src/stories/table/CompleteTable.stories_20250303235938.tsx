import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

interface CompleteTableItem {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
}

// Create a component with internal state for the complete demo
const CompleteTableDemo = () => {
  const [data] = useState<CompleteTableItem[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastLogin: "2023-12-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      lastLogin: "2023-12-05",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "inactive",
      lastLogin: "2023-11-20",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "active",
      lastLogin: "2023-12-10",
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "Viewer",
      status: "pending",
      lastLogin: "2023-11-15",
    },
    {
      id: 6,
      name: "Diana Miller",
      email: "diana@example.com",
      role: "User",
      status: "active",
      lastLogin: "2023-12-08",
    },
    {
      id: 7,
      name: "Edward Davis",
      email: "edward@example.com",
      role: "Admin",
      status: "inactive",
      lastLogin: "2023-10-30",
    },
    {
      id: 8,
      name: "Fiona Clark",
      email: "fiona@example.com",
      role: "Editor",
      status: "active",
      lastLogin: "2023-12-12",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Handle sorting
  const handleSort = (field: string, order?: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order ?? "asc");
  };

  // Handle filter change
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Apply filters and sorting
  const getFilteredAndSortedData = () => {
    let result = [...data];

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        result = result.filter((item) =>
          String(item[field as keyof CompleteTableItem])
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof CompleteTableItem];
        const bValue = b[sortField as keyof CompleteTableItem];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortOrder === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      });
    }

    return result;
  };

  const filteredAndSortedData = getFilteredAndSortedData();

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredAndSortedData.slice(startIndex, endIndex);
  };

  // Define columns
  const columns: Columns<CompleteTableItem> = [
    {
      id: "id",
      label: "ID",
      sortable: true,
      filterable: true,
      width: "10%",
    },
    {
      id: "name",
      label: "Name",
      sortable: true,
      filterable: true,
      width: "20%",
    },
    {
      id: "email",
      label: "Email",
      sortable: true,
      filterable: true,
      width: "25%",
    },
    {
      id: "role",
      label: "Role",
      sortable: true,
      filterable: true,
      width: "15%",
    },
    {
      id: "status",
      label: "Status",
      sortable: true,
      filterable: true,
      width: "15%",
      render: (item: CompleteTableItem) => {
        const statusColors = {
          active:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
          inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          pending:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[item.status]
            }`}
          >
            {item.status}
          </span>
        );
      },
    },
    {
      id: "lastLogin",
      label: "Last Login",
      sortable: true,
      filterable: true,
      width: "15%",
      render: (item: CompleteTableItem) => {
        const date = new Date(item.lastLogin);
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <Table
      data={getCurrentPageData()}
      columns={columns}
      pagination={{
        currentPage,
        pageSize,
        totalItems: filteredAndSortedData.length,
        pageSizeOptions: [5, 10, 25],
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
      filters={filters}
      onFilterChange={handleFilterChange}
      bordered={true}
      className="w-full"
    />
  );
};

const meta: Meta<typeof CompleteTableDemo> = {
  title: "Components/Table/CompleteTable",
  component: CompleteTableDemo,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Complete Table Demo</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This demo showcases a table with all features: pagination, sorting,
            and filtering.
          </p>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CompleteTableDemo>;

export const Default: Story = {};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
};
