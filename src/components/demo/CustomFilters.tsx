import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";

export function CustomFilters({
  onFiltersChange,
  filters,
  albumIds,
}: {
  onFiltersChange: (filters: {
    albumId?: string;
    title?: string;
    id?: string;
  }) => void;
  filters: { albumId?: string; title?: string; id?: string };
  albumIds: number[];
}) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Filters</h3>
        {(filters.albumId || filters.title || filters.id) && (
          <button
            onClick={clearFilters}
            className="flex items-center text-sm text-red-500 hover:text-red-700"
          >
            <IconX size={16} className="mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Album Filter */}
        <div>
          <label
            htmlFor="album-filter"
            className="block text-sm font-medium mb-1"
          >
            Album
          </label>
          <div className="relative">
            <select
              id="album-filter"
              value={filters.albumId || ""}
              onChange={(e) => handleFilterChange("albumId", e.target.value)}
              className="w-full p-2 border rounded-md pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">All Albums</option>
              {albumIds.map((id) => (
                <option key={id} value={id.toString()}>
                  Album {id}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <IconFilter size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Title Filter */}
        <div>
          <label
            htmlFor="title-filter"
            className="block text-sm font-medium mb-1"
          >
            Title
          </label>
          <div className="relative">
            <input
              id="title-filter"
              type="text"
              placeholder="Search by title..."
              value={filters.title || ""}
              onChange={(e) => handleFilterChange("title", e.target.value)}
              className="w-full p-2 border rounded-md pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <IconSearch size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* ID Filter */}
        <div>
          <label htmlFor="id-filter" className="block text-sm font-medium mb-1">
            ID
          </label>
          <div className="relative">
            <input
              id="id-filter"
              type="number"
              placeholder="Filter by ID..."
              value={filters.id || ""}
              onChange={(e) => handleFilterChange("id", e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {filters.albumId || filters.title || filters.id ? (
          <div className="flex flex-wrap gap-2">
            <span>Active filters:</span>
            {filters.albumId && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center">
                Album: {filters.albumId}
                <button
                  onClick={() => handleFilterChange("albumId", "")}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <IconX size={14} />
                </button>
              </span>
            )}
            {filters.title && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center">
                Title: {filters.title}
                <button
                  onClick={() => handleFilterChange("title", "")}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <IconX size={14} />
                </button>
              </span>
            )}
            {filters.id && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md flex items-center">
                ID: {filters.id}
                <button
                  onClick={() => handleFilterChange("id", "")}
                  className="ml-1 text-blue-500 hover:text-blue-700"
                >
                  <IconX size={14} />
                </button>
              </span>
            )}
          </div>
        ) : (
          <span>No active filters</span>
        )}
      </div>
    </div>
  );
}
