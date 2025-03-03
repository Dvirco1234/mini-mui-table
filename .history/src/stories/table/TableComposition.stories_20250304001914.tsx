import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFilters,
  TableSorters,
} from "@/components/ui/table";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

// Create a component that demonstrates table composition
const TableComposition = () => {
  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Sample data
  const data = [
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

  // Define columns
  const columns = [
    { id: "id", label: "ID", sortable: true, filterable: true },
    { id: "name", label: "Name", sortable: true, filterable: true },
    { id: "email", label: "Email", sortable: true, filterable: true },
    { id: "role", label: "Role", sortable: true, filterable: true },
  ];

  // Handle sort
  const handleSort = (field: string, order?: "asc" | "desc") => {
    setSortField(field);
    if (order) {
      setSortOrder(order);
    }
  };

  // Handle filter change
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Apply filters and sorting
  const getFilteredAndSortedData = () => {
    let result = [...data];

    // Apply filters
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        result = result.filter((item) =>
          String(item[field as keyof typeof item])
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a];
        const bValue = b[sortField as keyof typeof b];

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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Manual Table Composition</h2>
      <p className="text-gray-600 dark:text-gray-300">
        This example shows how to manually compose a table using the individual
        table components.
      </p>

      {/* Filters */}
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSorters
                    column={column}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-8"
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-bold">Using the Table Component</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This example shows the same functionality using the high-level Table
          component.
        </p>

        <Table
          data={data}
          columns={columns}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          filters={filters}
          onFilterChange={handleFilterChange}
          bordered
        />
      </div>
    </div>
  );
};

// Define meta
const meta: Meta<typeof TableComposition> = {
  title: "Components/Table/Composition",
  component: TableComposition,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light" storageKey="storybook-theme">
        <div className="p-6 max-w-5xl mx-auto">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TableComposition>;

// Default story
export const Default: Story = {};
