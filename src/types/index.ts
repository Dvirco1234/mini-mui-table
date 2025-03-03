import React from "react";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * By default, columns are sortable and filterable.
 * To prevent - explicitly make it false
 */
export interface Column<R = any> {
  id: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: R) => React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

/**
 * Parameters passed to the column render function
 */
export interface TableCellParams<R = any> {
  /**
   * The row data
   */
  row: R;
  
  /**
   * The column definition
   */
  column: Column<R>;
  
  /**
   * The row index
   */
  rowIndex: number;
  
  /**
   * The column index
   */
  colIndex: number;
  
  /**
   * The field value from the row
   */
  value: any;
  
  /**
   * Whether the cell is being edited
   */
  isEditing?: boolean;
  
  /**
   * Whether the cell has focus
   */
  hasFocus?: boolean;
}

/**
 * Type for a collection of columns with proper row type inference
 */
export type Columns<R = any> = Column<R>[];
