import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn("[&_tr]:border-b", className)}
        {...props}
      />
    );
  }
);

TableHead.displayName = "TableHead";

export { TableHead };
