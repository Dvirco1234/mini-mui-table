/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '@/components/ui/table';
import { Columns } from '@/types';

// Define test interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

describe('Table (Comprehensive)', () => {
  // Test data
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  ];

  // Test columns
  const columns: Columns<User> = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true, filterable: true },
    { id: 'email', label: 'Email', sortable: true, filterable: true },
    { 
      id: 'role', 
      label: 'Role', 
      sortable: true,
      render: (user) => <span data-testid="custom-role">{user.role}</span>
    },
  ];

  const onSort = jest.fn();
  const onFilterChange = jest.fn();
  const onPageChange = jest.fn();
  const onPageSizeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with generic type support', () => {
    render(
      <Table<User>
        data={users}
        columns={columns}
      />
    );

    // Check that all data is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('renders custom cell content using render function', () => {
    render(
      <Table<User>
        data={users}
        columns={columns}
      />
    );

    // Check that custom rendered content is present
    const customRoles = screen.getAllByTestId('custom-role');
    expect(customRoles.length).toBe(3);
    expect(customRoles[0]).toHaveTextContent('Admin');
  });

  it('supports sorting functionality', () => {
    render(
      <Table<User>
        data={users}
        columns={columns}
        sortField="name"
        sortOrder="asc"
        onSort={onSort}
      />
    );

    // Click on a sortable column header
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);

    // Should call onSort with correct parameters
    expect(onSort).toHaveBeenCalledWith('name', 'desc');
  });

  it('supports filtering functionality', () => {
    const filters = { name: 'John', email: '' };
    
    render(
      <Table<User>
        data={users}
        columns={columns}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    );

    // Find filter inputs
    const nameFilter = screen.getByPlaceholderText('Filter by Name');
    
    // Change filter value
    fireEvent.change(nameFilter, { target: { value: 'Jane' } });
    
    // Should call onFilterChange with correct parameters
    expect(onFilterChange).toHaveBeenCalledWith('name', 'Jane');
  });

  it('supports pagination with pagination object', () => {
    render(
      <Table<User>
        data={users}
        columns={columns}
        pagination={{
          currentPage: 1,
          pageSize: 10,
          totalItems: 30,
          pageSizeOptions: [5, 10, 25],
          onPageChange,
          onPageSizeChange,
        }}
      />
    );

    // Check that pagination is rendered
    expect(screen.getByText(/showing 1-3 of 30 items/i)).toBeInTheDocument();
    
    // Click next page button
    const nextButton = screen.getByLabelText(/next page/i);
    fireEvent.click(nextButton);
    
    // Should call onPageChange with correct page number
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables pagination when pagination is null', () => {
    render(
      <Table<User>
        data={users}
        columns={columns}
        pagination={null}
      />
    );

    // Pagination should not be rendered
    expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/next page/i)).not.toBeInTheDocument();
  });

  it('applies bordered style when bordered prop is true', () => {
    const { container } = render(
      <Table<User>
        data={users}
        columns={columns}
        bordered
      />
    );

    const table = container.querySelector('table');
    expect(table).toHaveClass('border-collapse', 'border');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Table<User>
        data={users}
        columns={columns}
        className="custom-table-class"
      />
    );

    const tableContainer = container.firstChild;
    expect(tableContainer).toHaveClass('custom-table-class');
  });

  it('renders empty state when no data is provided', () => {
    render(
      <Table<User>
        data={[]}
        columns={columns}
      />
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });
});
