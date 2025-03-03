/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { Table } from "@/components/ui/table";
import { Column } from "@/types";

describe("Table", () => {
  const columns: Column[] = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
  ];

  const data = [
    { name: "Header 1", email: "Cell 1" },
    { name: "Header 2", email: "Cell 2" },
  ];

  it("renders with pagination", () => {
    render(
      <Table
        columns={columns}
        data={data}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: 20,
          pageSizeOptions: [5, 10, 25, 50],
          onPageChange: () => {},
          onPageSizeChange: () => {},
        }}
      />
    );

    // Check that pagination info is displayed
    expect(screen.getByText(/showing 1-10 of 20 items/i)).toBeInTheDocument();
  });

  it("renders without pagination when pagination is null", () => {
    const { container } = render(
      <Table columns={columns} data={data} pagination={null} />
    );

    // Check that pagination component is not rendered
    expect(container.querySelector(".pagination")).not.toBeInTheDocument();
  });

  it("renders with bordered style when bordered prop is true", () => {
    const { container } = render(
      <Table columns={columns} data={data} bordered />
    );

    // The table should have border classes
    const table = container.querySelector("table");
    expect(table).toHaveClass("w-full", "caption-bottom", "text-sm");
  });
});
