"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { User, Column } from "@/types";
import { fetchUsers, FetchUsersParams } from "@/lib/api";

const columns: Column[] = [
  { id: "id", label: "ID", sortable: true },
  { id: "name", label: "Name", sortable: true, filterable: true },
  { id: "username", label: "Username", sortable: true, filterable: true },
  { id: "email", label: "Email", sortable: true, filterable: true },
  { id: "phone", label: "Phone", sortable: true },
  {
    id: "website",
    label: "Website",
    render: (row: User) => (
      <a
        href={`https://${row.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {row.website}
      </a>
    ),
  },
  {
    id: "company",
    label: "Company",
    render: (row: User) => row.company.name,
  },
];

export function UserTable() {
  // State for table data and controls
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Sorting state
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("asc");

  // Filtering state
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Fetch data when dependencies change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const params: FetchUsersParams = {
          page: currentPage,
          limit: pageSize,
          sort: sortField,
          order: sortOrder,
          filter: filters,
        };
        const { users, total } = await fetchUsers(params);
        setData(users);
        setTotalItems(total);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, pageSize, sortField, sortOrder, filters]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Handle sorting
  const handleSort = (field: string, order?: "asc" | "desc") => {
    if (!field) {
      // Clear sorting
      setSortField(undefined);
      setSortOrder("none");
    } else if (order) {
      // Set specific order
      setSortField(field);
      setSortOrder(order);
    } else {
      // Toggle order
      if (sortField === field) {
        setSortOrder(sortOrder === "asc" ? "desc" : "none");
        if (sortOrder === "desc") {
          setSortField(undefined);
        }
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    }
  };

  // Handle filtering
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when applying filters
  };

  return (
    <Table
      data={data}
      columns={columns}
      loading={loading}
      pagination={{
        currentPage,
        pageSize,
        totalItems,
        pageSizeOptions: [5, 10, 25, 50],
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange
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
}
