import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Column } from '@/types';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TablePagination } from './TablePagination';
import { TableFilters } from './TableFilters';
import { TableSorters } from './TableSorters';
import { IconLoader2 } from '@tabler/icons-react';


export interface TableProps<T = any> extends React.HTMLAttributes<HTMLTableElement> {
  data?: T[];
  columns: Column[];
  loading?: boolean;
  fetchData?: (params: FetchDataParams) => Promise<{ data: T[]; total: number }>;
  initialPage?: number;
  initialPageSize?: number;
  initialSortField?: string;
  initialSortOrder?: 'asc' | 'desc' | 'none';
  initialFilters?: Record<string, string>;
  pageSizeOptions?: number[];
  bordered?: boolean;
  className?: string;
  rowHeight?: number | string;
  columnWidths?: (string | number)[];
}

export interface FetchDataParams {
  page: number;
  limit: number;
  sort?: string;
  order: 'asc' | 'desc' | 'none';
  filter?: Record<string, string>;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ 
    className, 
    data: initialData,
    columns,
    loading: externalLoading,
    fetchData,
    initialPage = 1,
    initialPageSize = 10,
    initialSortField,
    initialSortOrder = 'asc',
    initialFilters = {},
    pageSizeOptions = [5, 10, 25, 50],
    bordered = true,
    rowHeight,
    columnWidths,
    ...props 
  }, ref) => {
    const [data, setData] = useState<any[]>(initialData || []);
    const [loading, setLoading] = useState(externalLoading || !initialData);
    const [totalItems, setTotalItems] = useState(initialData?.length || 0);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sortField, setSortField] = useState<string | undefined>(initialSortField);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>(initialSortOrder);
    const [filters, setFilters] = useState<Record<string, string>>(initialFilters);

    useEffect(() => {
      if (initialData) {
        setData(initialData);
        setTotalItems(initialData.length);
        return;
      }

      if (!fetchData) return;

      const loadData = async () => {
        setLoading(true);
        try {
          const params: FetchDataParams = {
            page: currentPage,
            limit: pageSize,
            sort: sortField,
            order: sortOrder,
            filter: filters,
          };
          const { data, total } = await fetchData(params);
          setData(data);
          setTotalItems(total);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [currentPage, pageSize, sortField, sortOrder, filters, fetchData, initialData]);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page when changing page size
    };

    const handleSort = (field: string, order?: 'asc' | 'desc') => {
      if (!field) {
        // Clear sorting
        setSortField(undefined);
        setSortOrder('none');
      } else if (order) {
        // Set specific order
        setSortField(field);
        setSortOrder(order);
      } else {
        // Toggle order
        if (sortField === field) {
          setSortOrder(sortOrder === 'asc' ? 'desc' : 'none');
          if (sortOrder === 'desc') {
            setSortField(undefined);
          }
        } else {
          setSortField(field);
          setSortOrder('asc');
        }
      }
    };

    const handleFilterChange = (field: string, value: string) => {
      setFilters(prev => ({
        ...prev,
        [field]: value,
      }));
      setCurrentPage(1); // Reset to first page when applying filters
    };

    const totalPages = Math.ceil(totalItems / pageSize);

    const filterableColumns = columns.filter(column => column.filterable);
    const hasFilters = filterableColumns.length > 0;

    return (
      <div className="w-full h-full flex flex-col">
        {hasFilters && (
          <TableFilters 
            columns={columns}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        )}

        <div className={cn("flex-1 overflow-auto", bordered && "rounded-md border")}>
          <div className="w-full h-full overflow-auto flex flex-col relative">
            <table
              ref={ref}
              className={cn(
                "w-full caption-bottom text-sm ",
                className
              )}
              {...props}
            >
              {columnWidths && (
                <colgroup>
                  {columnWidths.map((width, i) => (
                    <col key={i} style={{ width }} />
                  ))}
                </colgroup>
              )}
              <TableHead>
                <TableRow rowHeight={rowHeight}>
                  {columns.map(column => (
                    <TableCell 
                      key={column.id}
                      className="font-medium"
                    >
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
                {loading && data.length > 0 && (
                  <div className="absolute inset-0 bg-gray-100/50  flex items-center justify-center">
                  <IconLoader2 className="animate-spin text-primary" size={32}/>
                </div>
                )}
                {loading ? (
                  data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} rowHeight={rowHeight}>
                      {columns.map(column => (
                        <TableCell key={`${rowIndex}-${column.id}`}>
                          {column.render 
                            ? column.render(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : data.length === 0 ? (
                  <TableRow rowHeight={rowHeight}>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((row, rowIndex) => (
                    <TableRow key={rowIndex} rowHeight={rowHeight}>
                      {columns.map(column => (
                        <TableCell key={`${rowIndex}-${column.id}`}>
                          {column.render 
                            ? column.render(row)
                            : row[column.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </table>
          </div>
        </div>

        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={pageSizeOptions}
          className="mt-4"
        />
      </div>
    );
  }
);

Table.displayName = 'Table';

export { Table };
