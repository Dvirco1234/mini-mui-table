import React from 'react';
import { cn } from '@/lib/utils';
import { Column } from '@/types';

export interface TableSortersProps {
  column: Column;
  sortField?: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
  className?: string;
}

const TableSorters: React.FC<TableSortersProps> = ({
  column,
  sortField,
  sortOrder,
  onSort,
  className,
}) => {
  if (!column.sortable) {
    return <span className={className}>{column.label}</span>;
  }

  return (
    <button
      className={cn(
        "flex items-center space-x-1 font-medium",
        "cursor-pointer hover:text-gray-700",
        className
      )}
      onClick={() => onSort(column.id)}
      type="button"
    >
      <span>{column.label}</span>
      {sortField === column.id && (
        <span className="ml-1">
          {sortOrder === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </button>
  );
};

export { TableSorters };
