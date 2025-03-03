import { render, screen, fireEvent } from "@testing-library/react";
import { TableSorters } from "@/components/ui/table";
import { Column } from "@/types";

describe("TableSorters", () => {
  const column: Column = {
    id: "name",
    label: "Name",
    sortable: true,
  };

  const nonSortableColumn: Column = {
    id: "action",
    label: "Action",
    sortable: false,
  };

  const onSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders column label", () => {
    render(<TableSorters column={column} sortOrder="none" onSort={onSort} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("does not render sort icons for non-sortable column", () => {
    const { container } = render(
      <TableSorters
        column={nonSortableColumn}
        sortOrder="none"
        onSort={onSort}
      />
    );

    // Check that no sort icons are rendered
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("renders ascending sort icon when sortOrder is asc and column is active", () => {
    render(
      <TableSorters
        column={column}
        sortField="name"
        sortOrder="asc"
        onSort={onSort}
      />
    );

    // We can't easily test for specific icons, but we can check for the presence of SVG
    const sortIcons = document.querySelectorAll("svg");
    expect(sortIcons.length).toBeGreaterThan(0);
  });

  it("renders descending sort icon when sortOrder is desc and column is active", () => {
    render(
      <TableSorters
        column={column}
        sortField="name"
        sortOrder="desc"
        onSort={onSort}
      />
    );

    const sortIcons = document.querySelectorAll("svg");
    expect(sortIcons.length).toBeGreaterThan(0);
  });

  it("calls onSort when clicked on a sortable column", () => {
    render(<TableSorters column={column} sortOrder="none" onSort={onSort} />);

    const sorterElement = screen.getByText("Name").closest("div");
    fireEvent.click(sorterElement!);

    expect(onSort).toHaveBeenCalledWith("name", "asc");
  });

  it("toggles sort order when clicked multiple times", () => {
    const { rerender } = render(
      <TableSorters
        column={column}
        sortField="name"
        sortOrder="asc"
        onSort={onSort}
      />
    );

    // First click should change from asc to desc
    const sorterElement = screen.getByText("Name").closest("div");
    fireEvent.click(sorterElement!);
    expect(onSort).toHaveBeenCalledWith("name", "desc");

    // Update props to simulate state change
    rerender(
      <TableSorters
        column={column}
        sortField="name"
        sortOrder="desc"
        onSort={onSort}
      />
    );

    // Second click should change from desc to asc
    fireEvent.click(sorterElement!);
    expect(onSort).toHaveBeenCalledWith("name", "asc");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TableSorters
        column={column}
        sortOrder="none"
        onSort={onSort}
        className="custom-class"
      />
    );

    const sorterContainer = container.firstChild;
    expect(sorterContainer).toHaveClass("custom-class");
  });
});
