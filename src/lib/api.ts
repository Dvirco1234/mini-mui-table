import { User } from '@/types';

export interface FetchUsersParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc' | 'none';
  filter?: Record<string, string>;
}

export async function fetchUsers({
  page = 1,
  limit = 25,
  sort,
  order = 'asc',
  filter,
}: FetchUsersParams = {}): Promise<{ users: User[]; total: number }> {
  let url = `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`;
  
  if (sort && order !== 'none') {
    url += `&_sort=${sort}&_order=${order}`;
  }
  
  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        url += `&${key}_like=${value}`;
      }
    });
  }
  
  const response = await fetch(url);
  const total = Number(response.headers.get('x-total-count') || '0');
  const users = await response.json();
  
  return { users, total };
}
