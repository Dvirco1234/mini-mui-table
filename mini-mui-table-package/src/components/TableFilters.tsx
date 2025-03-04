import React from 'react';
import { cn } from '../lib/utils';
import { Column } from '../types';

export interface TableFiltersProps {
  columns: Column[];
  filters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  className?: string;
}

/**
 * TableFilters component that renders a set of filters for each filterable column.
 * Currently only supports text-based filtering.
 */
const TableFilters: React.FC<TableFiltersProps> = ({
  columns,
  filters,
  onFilterChange,
  className,
}) => {
  const filterableColumns = columns.filter(column => column.filterable);
  
  if (filterableColumns.length === 0) {
    return null;
  }
  
  return (
    <div className={cn("flex flex-wrap gap-4 mb-4", className)}>
      {filterableColumns.map(column => (
        <div key={`filter-${column.id}`} className="flex items-center">
          <label htmlFor={`filter-${column.id}`} className="mr-2 text-sm font-medium">
            {column.label}:
          </label>
          <input
            id={`filter-${column.id}`}
            type="text"
            className="rounded-md border bg-background outline-none border-gray-300 focus:border-blue-500 focus:dark:border-white px-3 py-1 text-sm"
            value={filters[column.id] || ''}
            onChange={(e) => onFilterChange(column.id, e.target.value)}
            placeholder={`Filter by ${column.label.toLowerCase()}`}
          />
        </div>
      ))}
    </div>
  );
};

export { TableFilters };
