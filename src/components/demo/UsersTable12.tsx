'use client';

import { useState, useEffect } from 'react';
import { User, Column } from '@/types';
import { fetchUsers, FetchUsersParams } from '@/lib/api';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TablePagination,
  TableFilters,
  TableSorters
} from '@/components/ui/table';

const columns: Column[] = [
  { id: 'id', label: 'ID', sortable: true },
  { id: 'name', label: 'Name', sortable: true, filterable: true },
  { id: 'username', label: 'Username', sortable: true, filterable: true },
  { id: 'email', label: 'Email', sortable: true, filterable: true },
  { id: 'phone', label: 'Phone', sortable: true },
  { 
    id: 'website', 
    label: 'Website', 
    render: (row: User) => (
      <a 
        href={`https://${row.website}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {row.website}
      </a>
    )
  },
  { 
    id: 'company', 
    label: 'Company', 
    render: (row: User) => row.company.name
  },
];

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowHeight, setRowHeight] = useState<number | string>('auto');

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const params: FetchUsersParams = {
          page: currentPage,
          limit: pageSize,
          sort: sortField,
          order: sortOrder,
          filter: filters,
        };
        const { users, total } = await fetchUsers(params);
        setUsers(users);
        setTotalItems(total);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [currentPage, pageSize, sortField, sortOrder, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleRowHeightChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setRowHeight(value === 'auto' ? 'auto' : parseInt(value, 10));
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <TableFilters 
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <div className="flex items-center space-x-2">
          <label htmlFor="rowHeight" className="text-sm font-medium">Row Height:</label>
          <select 
            id="rowHeight" 
            value={rowHeight === 'auto' ? 'auto' : rowHeight.toString()} 
            onChange={handleRowHeightChange}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="auto">Auto</option>
            <option value="40">40px</option>
            <option value="60">60px</option>
            <option value="80">80px</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table rowHeight={rowHeight}>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell 
                  key={column.id}
                  className="font-medium"
                >
                  <TableSorters
                    column={column}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              users.map(user => (
                <TableRow key={user.id}>
                  {columns.map(column => (
                    <TableCell key={`${user.id}-${column.id}`}>
                      {column.render 
                        ? column.render(user)
                        : (user as any)[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 25, 50]}
        className="mt-4"
      />
    </div>
  );
}
