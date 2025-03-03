"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { User, Column, Columns } from "@/types";
import { fetchUsers, FetchUsersParams } from "@/lib/api";

const columns: Columns<User> = [
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
        className="text-blue-500 hover:underline"
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
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("asc");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: FetchUsersParams = {
        _page: currentPage,
        _limit: pageSize,
        _sort: sortField,
        _order: sortOrder,
      };

      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params[key] = value;
        }
      });

      const { data, total } = await fetchUsers(params);
      setData(data);
      setTotalItems(total);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, sortField, sortOrder, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSort = (field: string, order: "asc" | "desc") => {
    setSortField(field);
    setSortOrder(order);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when changing filters
  };

  return (
    <div className="table-container flex-1 overflow-auto">
      <Table<User>
        data={data}
        columns={columns}
        loading={loading}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        filters={filters}
        onFilterChange={handleFilterChange}
        bordered={true}
        className="w-full"
      />
    </div>
  );
}
