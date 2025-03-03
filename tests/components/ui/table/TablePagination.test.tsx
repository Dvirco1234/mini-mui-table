/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { TablePagination } from '@/components/ui/table';

describe('TablePagination', () => {
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

  it('renders pagination information correctly', () => {
    render(<TablePagination {...defaultProps} />);

    // Check page info
    expect(screen.getByText(/page 2 of 5/i)).toBeInTheDocument();
    
    // Check items info
    expect(screen.getByText(/showing 11-20 of 50 items/i)).toBeInTheDocument();
  });

  it('renders page size selector with correct options', () => {
    render(
      <TablePagination {...defaultProps} pageSizeOptions={[5, 10, 25, 50]} />
    );

    const pageSizeSelector = screen.getByRole('combobox');
    expect(pageSizeSelector).toBeInTheDocument();

    // Check that all page size options are rendered
    [5, 10, 25, 50].forEach(size => {
      expect(screen.getByText(size.toString())).toBeInTheDocument();
    });
  });

  it('calls onPageChange when navigation buttons are clicked', () => {
    render(<TablePagination {...defaultProps} />);

    // Previous page button
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);

    // Next page button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(<TablePagination {...defaultProps} currentPage={1} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<TablePagination {...defaultProps} currentPage={5} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageSizeChange when page size is changed', () => {
    render(
      <TablePagination {...defaultProps} pageSizeOptions={[5, 10, 25, 50]} />
    );

    const pageSizeSelector = screen.getByRole('combobox');
    fireEvent.change(pageSizeSelector, { target: { value: '25' } });

    expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('does not render page size selector when pageSizeOptions is not provided', () => {
    render(<TablePagination {...defaultProps} />);

    const pageSizeSelector = screen.queryByRole("combobox");
    expect(pageSizeSelector).not.toBeInTheDocument();
  });

  it('handles single page case correctly', () => {
    render(
      <TablePagination
        {...defaultProps}
        currentPage={1}
        totalPages={1}
        totalItems={5}
      />
    );

    // Both navigation buttons should be disabled
    const prevButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();

    // Page info should show 1 of 1
    expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument();
  });
});
