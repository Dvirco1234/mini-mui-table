import { render, screen, fireEvent } from "@testing-library/react";
import { TableFilters } from "@/components/ui/table";
import { Column } from "@/types";

describe("TableFilters", () => {
  const columns: Column[] = [
    { id: "name", label: "Name", filterable: true },
    { id: "email", label: "Email", filterable: true },
    { id: "role", label: "Role", filterable: false },
  ];

  const filters = {
    name: "John",
    email: "",
  };

  const onFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter inputs for filterable columns", () => {
    render(
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    );

    // Should render inputs for filterable columns
    const nameInput = screen.getByPlaceholderText("Filter by name");
    const emailInput = screen.getByPlaceholderText("Filter by email");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    // Should not render input for non-filterable column
    const roleInput = screen.queryByPlaceholderText("Filter by role");
    expect(roleInput).not.toBeInTheDocument();
  });

  it("displays current filter values", () => {
    render(
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    );

    const nameInput = screen.getByPlaceholderText(
      "Filter by name"
    ) as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText(
      "Filter by email"
    ) as HTMLInputElement;

    expect(nameInput.value).toBe("John");
    expect(emailInput.value).toBe("");
  });

  it("calls onFilterChange when input value changes", () => {
    render(
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    );

    const nameInput = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(nameInput, { target: { value: "Jane" } });

    expect(onFilterChange).toHaveBeenCalledWith("name", "Jane");
  });

  it("applies custom className", () => {
    const { container } = render(
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={onFilterChange}
        className="custom-class"
      />
    );

    const filtersContainer = container.firstChild;
    expect(filtersContainer).toHaveClass("custom-class");
  });
});
