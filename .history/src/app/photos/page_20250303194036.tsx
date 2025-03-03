import { PhotoTable } from "@/components/demo/PhotoTable";

export default function PhotosPage() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <h2 className="text-2xl font-bold">Photos Table Demo</h2>
      <p className="text-gray-600 dark:text-gray-300">
        This demo showcases a table of photos with thumbnails, sorting, and
        pagination capabilities. Data is fetched from the JSONPlaceholder API.
      </p>
      <div className="flex-1">
        <PhotoTable />
      </div>
    </div>
  );
}
