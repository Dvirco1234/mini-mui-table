# Mini MUI Table

A reusable Material UI-inspired table component with sorting, filtering, and pagination.

## Installation

```bash
npm install @dvirco123/mini-mui-table
```

## Usage

```jsx
import { Table } from "@dvirco123/mini-mui-table";

// Example usage
const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
];

const data = [
  { name: "John Doe", email: "john@example.com", role: "Admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "User" },
];

function MyComponent() {
  return (
    <Table
      columns={columns}
      data={data}
      pagination={{
        currentPage: 1,
        pageSize: 10,
        totalItems: data.length,
        onPageChange: (page) => console.log(`Page changed to ${page}`),
        onPageSizeChange: (size) => console.log(`Page size changed to ${size}`),
      }}
      onSort={(field, order) =>
        console.log(`Sort by ${field} in ${order} order`)
      }
      onFilterChange={(field, value) =>
        console.log(`Filter ${field} by ${value}`)
      }
    />
  );
}
```

## Features

- 🔄 Sorting - Sort your data by any column
- 🔍 Filtering - Filter your data with built-in or custom filters
- 📄 Pagination - Navigate through large datasets with ease
- 🎨 Customizable - Easily customize the appearance and behavior
- 🌙 Dark Mode Support - Works seamlessly with light and dark themes
- 📱 Responsive - Looks great on all devices

## Tailwind CSS Setup

This component uses Tailwind CSS. If you're using Tailwind in your project, add the following to your tailwind.config.js:

````js
module.exports = {
  content: [
    // ...
    "./node_modules/@dvirco123/mini-mui-table/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
};

## API Reference

### Table Props

| Prop           | Type                                                     | Description                                            |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------ |
| data           | `T[]`                                                    | Array of data to display in the table                  |
| columns        | `Column<T>[]`                                            | Array of column definitions                            |
| loading        | `boolean`                                                | Whether the table is in a loading state                |
| pagination     | `PaginationOptions \| null`                              | Pagination configuration or null to disable pagination |
| sortField      | `string`                                                 | Current sort field                                     |
| sortOrder      | `"asc" \| "desc" \| ""`                                  | Current sort order                                     |
| onSort         | `(field: string, order?: "asc" \| "desc" \| "") => void` | Callback when sorting changes                          |
| filters        | `Record<string, string>`                                 | Current filter values                                  |
| onFilterChange | `(field: string, value: string) => void`                 | Callback when a filter changes                         |
| bordered       | `boolean`                                                | Whether to show borders around the table               |
| rowHeight      | `number \| string`                                       | Height of table rows                                   |
| slots          | `TableSlots`                                             | Custom components to render in place of default ones   |

### Column Definition

```typescript
interface Column<R = any> {
  id: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: R) => React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}
````

### Pagination Options

```typescript
interface PaginationOptions {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}
```

## License

MIT
