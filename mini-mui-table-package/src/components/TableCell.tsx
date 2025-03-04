import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0 group", className)}
        {...props}
      />
    );
  }
);

TableCell.displayName = "TableCell";

export { TableCell };
