import { UserTable } from "@/components/demo/UserTable";

export default function UsersPage() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold">Users Table Demo</h2>
      <p className="text-gray-600 dark:text-gray-300">
        This demo showcases a table of users with sorting, filtering, and
        pagination capabilities. Data is fetched from the JSONPlaceholder API.
      </p>
      <UserTable />
    </div>
  );
}
