# Material-UI Table Clone

A mini version of Material-UI's React Table component with server-side pagination, sorting, and filtering capabilities.

## Features

- Reusable table components
- Server-side pagination
- Column sorting
- Data filtering
- Responsive design with Tailwind CSS
- Fully typed with TypeScript
- Storybook documentation
- Comprehensive test coverage

## Installation

```bash
npm install mini-mui-table
```

## Usage

### Basic Table

```jsx
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell 
} from 'mini-mui-table';

function SimpleTable() {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
```

### Table with Pagination

```jsx
import { useState } from 'react';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TablePagination 
} from 'mini-mui-table';

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
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Get current page data
  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </>
  );
}
```

### Table with Filters and Sorting

```jsx
import { useState, useEffect } from 'react';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TableFilters,
  TableSorters 
} from 'mini-mui-table';

function FilterableSortableTable() {
  const [data, setData] = useState([]);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
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
    filteredData.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    setData(filteredData);
  }, [sortField, sortOrder, filters]);
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
  
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <>
      <TableFilters
        columns={columns}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column.id}>
                <TableSorters
                  column={column}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              {columns.map(column => (
                <TableCell key={`${item.id}-${column.id}`}>
                  {item[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
```

## API Reference

### Table

The main wrapper component for the table.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Table content |
| className | string | Additional CSS classes |

### TableHead

Represents the header section of the table.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | TableRow elements |
| className | string | Additional CSS classes |

### TableBody

Contains the rows of the table.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | TableRow elements |
| className | string | Additional CSS classes |

### TableRow

Represents a single row in the table.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | TableCell elements |
| className | string | Additional CSS classes |

### TableCell

Represents a single cell in the table.

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Cell content |
| className | string | Additional CSS classes |

### TablePagination

Handles pagination functionality.

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

### TableFilters

Allows filtering data based on specific columns.

| Prop | Type | Description |
|------|------|-------------|
| columns | Column[] | Column definitions |
| filters | object | Current filter values |
| onFilterChange | function | Callback when filter changes |
| className | string | Additional CSS classes |

### TableSorters

Enables sorting on specific columns.

| Prop | Type | Description |
|------|------|-------------|
| column | Column | Column definition |
| sortField | string | Current sort field |
| sortOrder | 'asc' \| 'desc' | Current sort order |
| onSort | function | Callback when sort changes |
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

### Storybook

```bash
# Run Storybook
npm run storybook
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for NPM

```bash
# Build the library
npm run build:lib
```

## License

MIT
