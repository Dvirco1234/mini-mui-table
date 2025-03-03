import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { UserTable } from "@/components/demo/UserTable";
import { CustomFiltersDemo } from "@/components/demo/CustomFiltersDemo";

export default function Home() {
  return (
    <div className="mx-auto py-10 px-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Material-UI Table Clone</h1>
        <ThemeToggle />
      </div>
      <UserTable />
      {/* <CustomFiltersDemo /> */}
    </div>
  );
}
