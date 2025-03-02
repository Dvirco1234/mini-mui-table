import { UsersTable } from "@/components/demo/UsersTable";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Material-UI Table Clone</h1>
      <UsersTable />
    </div>
  );
}
