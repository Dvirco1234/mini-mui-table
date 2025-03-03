/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import { TableSorters } from "@/components/ui/table";
import { Column } from "@/types";

describe("TableSorters", () => {
  const columns: Column[] = [
    {
      id: "name",
      label: "Name",
      sortable: true,
    },
    {
      id: "email",
      label: "Email",
      sortable: true,
    },
    {
      id: "age",
      label: "Age",
      sortable: false,
    },
  ];

  it("renders sortable columns with sort indicators", () => {
    render(
      <TableSorters
        columns={columns}
        sortColumn=""
        sortDirection="asc"
        onSort={() => {}}
      />
    );

    // Should render sortable columns
    const nameHeader = screen.getByText("Name");
    const emailHeader = screen.getByText("Email");

    expect(nameHeader).toBeInTheDocument();
    expect(emailHeader).toBeInTheDocument();

    // Should not render non-sortable column
    const ageHeader = screen.queryByText("Age");
    expect(ageHeader).not.toBeInTheDocument();
  });

  it("shows active sort column with correct direction indicator", () => {
    const { rerender } = render(
      <TableSorters
        columns={columns}
        sortColumn="name"
        sortDirection="asc"
        onSort={() => {}}
      />
    );

    // Check for ascending indicator on name column
    const nameHeader = screen.getByText("Name");
    expect(nameHeader.parentElement).toHaveTextContent(/name/i);

    // Rerender with descending sort
    rerender(
      <TableSorters
        columns={columns}
        sortColumn="name"
        sortDirection="desc"
        onSort={() => {}}
      />
    );

    // Check for descending indicator on name column
    expect(nameHeader.parentElement).toHaveTextContent(/name/i);
  });

  it("calls onSort with column key and direction when clicked", () => {
    const onSort = jest.fn();
    render(
      <TableSorters
        columns={columns}
        sortColumn=""
        sortDirection="asc"
        onSort={onSort}
      />
    );

    // Click on name column
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    // First click should sort ascending
    expect(onSort).toHaveBeenCalledWith("name", "desc");
  });

  it("toggles sort order when clicked multiple times", () => {
    const onSort = jest.fn();
    const { rerender } = render(
      <TableSorters
        columns={columns}
        sortColumn=""
        sortDirection="asc"
        onSort={onSort}
      />
    );

    // First click
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);
    expect(onSort).toHaveBeenCalledWith("name", "desc");

    // Update props to reflect first click result
    rerender(
      <TableSorters
        columns={columns}
        sortColumn="name"
        sortDirection="desc"
        onSort={onSort}
      />
    );

    // Reset mock to check next call
    onSort.mockReset();

    // Second click should change from desc to asc
    fireEvent.click(nameHeader);
    expect(onSort).toHaveBeenCalledWith("name", "");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TableSorters
        columns={columns}
        sortColumn=""
        sortDirection="asc"
        onSort={() => {}}
        className="custom-class"
      />
    );

    const sortersContainer = container.firstChild;
    expect(sortersContainer).toHaveClass("custom-class");
  });
});
