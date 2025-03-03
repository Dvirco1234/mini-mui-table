# Material-UI Table Clone

A mini version of Material-UI's React Table component with server-side pagination, sorting, and filtering capabilities.

## Features

- Reusable table components
- Server-side pagination
- Column sorting
- Data filtering
- Responsive design with Tailwind CSS
- Fully typed with TypeScript
- Comprehensive test coverage
- Generic type support for strongly-typed tables

## Installation

```bash
npm install mini-mui-table
```

## Usage

### Basic Table

```tsx
import { Table } from 'mini-mui-table';

function SimpleTable() {
  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' }
  ];
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
  return (
    <Table<typeof data[0]>
      columns={columns}
      data={data}
    />
  );
}
```

### Table with Pagination

```tsx
import { useState } from 'react';
import { Table, PaginationOptions } from 'mini-mui-table';

function PaginatedTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Example data
  const data = [...Array(50)].map((_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`
  }));
  
  const totalItems = data.length;
  
  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' }
  ];
  
  const paginationOptions: PaginationOptions = {
    currentPage,
    pageSize,
    totalItems,
    pageSizeOptions: [5, 10, 25, 50],
    onPageChange: setCurrentPage,
    onPageSizeChange: setPageSize
  };
  
  return (
    <Table
      columns={columns}
      data={currentData}
      pagination={paginationOptions}
    />
  );
}
```

### Table with Filters and Sorting

```tsx
import { useState, useEffect } from 'react';
import { Table } from 'mini-mui-table';

function FilterableSortableTable() {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('asc');
  const [filters, setFilters] = useState({});
  
  const columns = [
    { id: 'id', label: 'ID', sortable: true },
    { id: 'name', label: 'Name', sortable: true, filterable: true },
    { id: 'email', label: 'Email', sortable: true, filterable: true }
  ];
  
  // Example data
  const allData = [...Array(50)].map((_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    email: `person${i + 1}@example.com`
  }));
  
  useEffect(() => {
    // Filter data
    let filteredData = [...allData];
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(item => 
          String(item[key]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    });
    
    // Sort data
    if (sortField && sortOrder) {
      filteredData.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    setData(filteredData);
  }, [sortField, sortOrder, filters]);
  
  const handleSort = (field: string, order: 'asc' | 'desc' | '') => {
    setSortField(field);
    setSortOrder(order);
  };
  
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <Table
      columns={columns}
      data={data}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
      filters={filters}
      onFilterChange={handleFilterChange}
    />
  );
}
```

## API Reference

### Table

The main component that renders a complete table with optional pagination, sorting, and filtering.

| Prop | Type | Description |
|------|------|-------------|
| data | T[] | Array of data items to display |
| columns | Columns<T> | Column definitions |
| slots | TableSlots | Optional custom components for parts of the table |
| loading | boolean | Whether the table is in a loading state |
| pagination | null \| PaginationOptions | Pagination configuration object |
| sortField | string | Current sort field |
| sortOrder | 'asc' \| 'desc' \| '' | Current sort order |
| onSort | function | Callback when sort changes |
| disableColumnSorting | boolean | Whether to disable sorting on all columns |
| filters | Record<string, string> | Current filter values |
| onFilterChange | function | Callback when filter changes |
| bordered | boolean | Whether to show borders |
| className | string | Additional CSS classes |
| rowHeight | number \| string | Height for table rows |

### PaginationOptions

Configuration for table pagination.

| Prop | Type | Description |
|------|------|-------------|
| currentPage | number | Current page number |
| pageSize | number | Number of items per page |
| totalItems | number | Total number of items |
| pageSizeOptions | number[] | Available page size options |
| onPageChange | function | Callback when page changes |
| onPageSizeChange | function | Callback when page size changes |

### TablePagination

Standalone pagination component.

| Prop | Type | Description |
|------|------|-------------|
| currentPage | number | Current page number |
| totalPages | number | Total number of pages |
| pageSize | number | Number of items per page |
| totalItems | number | Total number of items |
| onPageChange | function | Callback when page changes |
| onPageSizeChange | function | Callback when page size changes |
| pageSizeOptions | number[] | Available page size options |
| className | string | Additional CSS classes |

### TableSorters

Enables sorting on specific columns.

| Prop | Type | Description |
|------|------|-------------|
| columns | Column[] | Array of column definitions |
| sortColumn | string | Current sort column |
| sortDirection | 'asc' \| 'desc' \| '' | Current sort direction |
| onSort | function | Callback when sort changes |
| className | string | Additional CSS classes |

### TableFilters

Allows filtering data based on specific columns.

| Prop | Type | Description |
|------|------|-------------|
| columns | Column[] | Column definitions |
| filters | object | Current filter values |
| onFilterChange | function | Callback when filter changes |
| className | string | Additional CSS classes |

## Development

### Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/mini-mui-table.git
cd mini-mui-table

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## License

MIT
