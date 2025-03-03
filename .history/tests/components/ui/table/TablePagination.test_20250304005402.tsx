import { render, screen, fireEvent } from "@testing-library/react";
import { TablePagination } from "@/components/ui/table";

describe("TablePagination", () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    pageSize: 10,
    totalItems: 50,
    onPageChange: jest.fn(),
    onPageSizeChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination information correctly", () => {
    render(<TablePagination {...defaultProps} />);

    // Should show current page info
    expect(screen.getByText(/showing 11-20 of 50 items/i)).toBeInTheDocument();
  });

  it("renders page size selector with options", () => {
    render(
      <TablePagination {...defaultProps} pageSizeOptions={[5, 10, 25, 50]} />
    );

    const pageSizeSelector = screen.getByRole("combobox");
    expect(pageSizeSelector).toBeInTheDocument();

    // Open the dropdown
    fireEvent.click(pageSizeSelector);

    // Check that options are rendered
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("calls onPageChange when navigation buttons are clicked", () => {
    render(<TablePagination {...defaultProps} />);

    // Previous page button
    const prevButton = screen.getByLabelText(/previous page/i);
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);

    // Next page button
    const nextButton = screen.getByLabelText(/next page/i);
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables previous button on first page", () => {
    render(<TablePagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByLabelText(/previous page/i);
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<TablePagination {...defaultProps} currentPage={5} />);

    const nextButton = screen.getByLabelText(/next page/i);
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageSizeChange when page size is changed", () => {
    render(
      <TablePagination {...defaultProps} pageSizeOptions={[5, 10, 25, 50]} />
    );

    const pageSizeSelector = screen.getByRole("combobox");

    // Change page size
    fireEvent.change(pageSizeSelector, { target: { value: "25" } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it("does not render page size selector when pageSizeOptions is not provided", () => {
    render(<TablePagination {...defaultProps} />);

    const pageSizeSelector = screen.queryByRole("combobox");
    expect(pageSizeSelector).not.toBeInTheDocument();
  });

  it("handles single page case correctly", () => {
    render(
      <TablePagination
        {...defaultProps}
        currentPage={1}
        totalPages={1}
        totalItems={5}
      />
    );

    // Should show correct item count
    expect(screen.getByText(/showing 1-5 of 5 items/i)).toBeInTheDocument();

    // Both navigation buttons should be disabled
    const prevButton = screen.getByLabelText(/previous page/i);
    const nextButton = screen.getByLabelText(/next page/i);

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
