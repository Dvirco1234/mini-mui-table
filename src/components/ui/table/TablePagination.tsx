import React from 'react';
import { cn } from '@/lib/utils';

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50],
  className,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={cn("flex items-center justify-between px-2 py-4", className)}>
      <div className="text-sm text-gray-500">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            className="h-8 w-16 rounded-md border border-gray-300 bg-white"
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center justify-center rounded-md p-1 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md p-1 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export { TablePagination };
