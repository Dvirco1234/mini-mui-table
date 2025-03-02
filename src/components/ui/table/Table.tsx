import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn(
            "w-full caption-bottom text-sm",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = "Table";

export { Table };
