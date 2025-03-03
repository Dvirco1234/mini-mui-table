import React from 'react';
import { cn } from '@/lib/utils';
import { Column } from '@/types';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';

export interface TableSortersProps {
  columns: Column[];
  sortColumn?: string;
  sortDirection: 'asc' | 'desc' | '';
  onSort: (field: string, direction?: 'asc' | 'desc' | '') => void;
  className?: string;
}

const TableSorters: React.FC<TableSortersProps> = ({
  columns,
  sortColumn,
  sortDirection,
  onSort,
  className,
}) => {
  const handleSort = (column: Column) => {
    if (!column.sortable) return;
    
    if (sortColumn !== column.key) {
      // First click - sort ascending
      onSort(column.key, 'asc');
    } else if (sortDirection === 'asc') {
      // Second click - sort descending
      onSort(column.key, 'desc');
    } else {
      // Third click - clear sorting
      onSort('', '');
    }
  };

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
    <div className={cn("flex", className)}>
      {columns
        .filter(column => column.sortable !== false)
        .map(column => {
          const isActive = sortColumn === column.key;
          
          return (
            <div
              key={column.key}
              className="flex items-center justify-between cursor-pointer px-4 py-2"
              onClick={() => handleSort(column)}
            >
              <span>{column.header}</span>
              <div className="flex items-center ml-2">
                {isActive ? (
                  sortDirection === 'asc' ? (
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
        })}
    </div>
  );
};

export { TableSorters };
