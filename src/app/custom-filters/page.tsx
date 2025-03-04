import { CustomFiltersDemo } from "@/components/demo/CustomFiltersDemo";

export default function CustomFiltersPage() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold">
        Custom Filters Demo - advanced custom filtering
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        This demo showcases a table with advanced custom filtering capabilities.
        Users can filter photos by album ID, title, and photo ID with a
        user-friendly interface.
      </p>
      <CustomFiltersDemo />
    </div>
  );
}
