"use client";

import { Table } from "@/components/ui/table";
import { User, Column } from "@/types";
import { fetchUsers, FetchUsersParams } from "@/lib/api";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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

async function fetchData(params: FetchUsersParams) {
  const { users, total } = await fetchUsers(params);
  return { data: users, total };
}

export default function Home() {
  return (
    <div className="mx-auto py-10 px-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Material-UI Table Clone</h1>
        <ThemeToggle />
      </div>
      <div className="table-container flex-1 overflow-auto">
        <Table
          columns={columns}
          fetchData={fetchData}
          initialPageSize={5}
          bordered={true}
        />
      </div>
    </div>
  );
}
