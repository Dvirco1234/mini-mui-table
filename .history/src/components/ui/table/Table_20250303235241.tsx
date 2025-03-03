import { cn } from "@/lib/utils";
import { Columns } from "@/types";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";
import { TablePagination } from "./TablePagination";
import { TableFilters } from "./TableFilters";
import { TableSorters } from "./TableSorters";
import { IconLoader2 } from "@tabler/icons-react";
import { forwardRef, ReactNode } from "react";

export interface TableSlots {
  customFilters?: React.ReactNode;
  customPagination?: React.ReactNode;
  customHead?: React.ReactNode;
  customBody?: React.ReactNode;
}

export interface PaginationOptions {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export interface TableProps<T = Record<string, unknown>>
  extends React.HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: Columns<T>;
  slots?: TableSlots;
  loading?: boolean;

  // Pagination props
  pagination?: null | PaginationOptions;

  // Sorting props
  sortField?: string;
  sortOrder?: "asc" | "desc" | "none";
  onSort?: (field: string, order?: "asc" | "desc") => void;
  disableColumnSorting?: boolean;

  // Filter props
  filters?: Record<string, string>;
  onFilterChange?: (field: string, value: string) => void;

  // Style props
  bordered?: boolean;
  className?: string;
  rowHeight?: number | string;
}

// Define the component as a generic function
function TableComponent<T>(
  {
    className,
    data = [],
    columns,
    slots = {},
    loading = false,

    // Pagination props
    pagination = null,

    // Sorting props
    sortField,
    sortOrder = "asc",
    onSort,
    disableColumnSorting = false,

    // Filter props
    filters = {},
    onFilterChange,

    // Style props
    bordered = true,
    rowHeight,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>
) {
  // Extract pagination options
  const paginationEnabled = pagination !== null;
  const paginationOptions: PaginationOptions = pagination || {};

  const {
    currentPage = 1,
    pageSize = 10,
    totalItems = 0,
    pageSizeOptions = [5, 10, 25, 50],
    onPageChange,
    onPageSizeChange,
  } = paginationOptions;

  const totalPages = Math.ceil(totalItems / pageSize);
  const filterableColumns = columns.filter((column) => column.filterable);
  const hasFilters = filterableColumns.length > 0;

  const handleSort = (field: string, order?: "asc" | "desc") => {
    if (onSort) {
      onSort(field, order);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(field, value);
    }
  };

  return (
    <div className="table-container w-full h-full flex flex-col">
      {/* Show customFilters if it exists. If not show filters if there are filters */}
      {slots.customFilters ??
        (hasFilters && onFilterChange && (
          <TableFilters
            columns={columns}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        ))}

      <div className={cn("flex-1 relative", bordered && "rounded-md border")}>
        <div className="absolute inset-0 overflow-auto">
          {loading && (
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 flex items-center justify-center">
              <IconLoader2 className="animate-spin text-primary" size={32} />
            </div>
          )}
          <table
            ref={ref}
            className={cn(
              "w-full caption-bottom text-sm min-h-[200px]",
              className
            )}
            {...props}
          >
            {slots.customHead ?? (
              <TableHead>
                <TableRow rowHeight={rowHeight}>
                  {columns.map((column) => (
                    <TableCell key={column.id} className="font-medium">
                      {!disableColumnSorting &&
                      column.sortable !== false &&
                      onSort ? (
                        <TableSorters
                          column={column}
                          sortField={sortField}
                          sortOrder={sortOrder}
                          onSort={handleSort}
                        />
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
            )}

            {slots.customBody ?? (
              <TableBody>
                {data.length === 0 && !loading ? (
                  <TableRow rowHeight={rowHeight}>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} rowHeight={rowHeight}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof typeof row];

                        return (
                          <TableCell
                            key={`${rowIndex}-${column.id}`}
                            style={{
                              width: column.width,
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                            }}
                          >
                            {(column.render?.(row) as ReactNode) ??
                              (value as ReactNode)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </table>
        </div>
      </div>

      {slots.customPagination ??
        (paginationEnabled && onPageChange && onPageSizeChange && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            pageSizeOptions={pageSizeOptions}
            className="mt-4"
          />
        ))}
    </div>
  );
}

// Create a type for the Table component that preserves the generic parameter
type TableComponent = <T = Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> }
) => React.ReactElement;

// Use forwardRef and cast it to the correct type
export const Table = forwardRef(TableComponent) as TableComponent;
