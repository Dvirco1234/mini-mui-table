import { render, screen } from "@testing-library/react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";

// Define a simple data interface for testing
interface TestData {
  id: number;
  name: string;
  email: string;
}

describe("Table", () => {
  // Sample test data
  const testData: TestData[] = [
    { id: 1, name: "Header 1", email: "Cell 1" },
    { id: 2, name: "Header 2", email: "Cell 2" },
  ];

  // Define columns for the test data
  const columns: Columns<TestData> = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
  ];

  it("renders correctly with data and columns", () => {
    render(<Table<TestData> data={testData} columns={columns} />);

    // Check that column headers are rendered
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();

    // Check that data is rendered
    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
    expect(screen.getByText("Cell 1")).toBeInTheDocument();
    expect(screen.getByText("Cell 2")).toBeInTheDocument();
  });

  it("renders with pagination", () => {
    render(
      <Table<TestData>
        data={testData}
        columns={columns}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: 20,
          onPageChange: () => {},
          onPageSizeChange: () => {},
        }}
      />
    );

    // Check that pagination info is displayed
    expect(screen.getByText(/showing 1-2 of 20 items/i)).toBeInTheDocument();
  });

  it("renders without pagination when pagination is null", () => {
    render(
      <Table<TestData> data={testData} columns={columns} pagination={null} />
    );

    // Pagination should not be present
    expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
  });

  it("renders with bordered style when bordered prop is true", () => {
    const { container } = render(
      <Table<TestData> data={testData} columns={columns} bordered />
    );

    const table = container.querySelector("table");
    expect(table).toHaveClass("border-collapse", "border");
  });
});
