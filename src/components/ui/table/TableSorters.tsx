import React from 'react';
import { cn } from '@/lib/utils';
import { Column } from '@/types';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

export interface TableSortersProps {
  column: Column;
  sortField?: string;
  sortOrder: 'asc' | 'desc' | 'none';
  onSort: (field: string, order?: 'asc' | 'desc') => void;
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

  const handleSort = () => {
    if (sortField !== column.id) {
      // First click - sort ascending
      onSort(column.id, 'asc');
    } else if (sortOrder === 'asc') {
      // Second click - sort descending
      onSort(column.id, 'desc');
    } else {
      // Third click - clear sorting
      onSort('');
    }
  };

  const isActive = sortField === column.id;

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-between cursor-pointer",
        className
      )}
      onClick={handleSort}
    >
      <span>{column.label}</span>
      <div className="flex items-center">
        {isActive ? (
          sortOrder === 'asc' ? (
            <IconArrowUp size={16} className="text-primary" />
          ) : (
            <IconArrowDown size={16} className="text-primary" />
          )
        ) : (
          <IconArrowUp size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>
    </div>
  );
};

export { TableSorters };
