import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          className
        )}
        {...props}
      />
    );
  }
);

TableRow.displayName = "TableRow";

export { TableRow };
