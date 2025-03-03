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
export interface Column {
  id: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: unknown) => React.ReactNode;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}
