"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";
import { IconFilter, IconSearch, IconX } from "@tabler/icons-react";

// Define the Photo type based on JSONPlaceholder API
interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Custom Filters Component
const CustomFilters = ({
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
}) => {
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
};

export function CustomFiltersDemo() {
  // State for photos data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueAlbumIds, setUniqueAlbumIds] = useState<number[]>([]);

  // Filter state
  const [filters, setFilters] = useState<{
    albumId?: string;
    title?: string;
    id?: string;
  }>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch photos from JSONPlaceholder API
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const data: Photo[] = await response.json();
        setPhotos(data);

        // Extract unique album IDs
        const albumIds = [...new Set(data.map((photo) => photo.albumId))].sort(
          (a, b) => a - b
        );
        setUniqueAlbumIds(albumIds);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...photos];

    // Apply album filter
    if (filters.albumId) {
      result = result.filter(
        (photo) => photo.albumId.toString() === filters.albumId
      );
    }

    // Apply title filter
    if (filters.title) {
      result = result.filter((photo) =>
        photo.title.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }

    // Apply ID filter
    if (filters.id) {
      result = result.filter((photo) =>
        photo.id.toString().includes(filters.id!)
      );
    }

    setFilteredPhotos(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [photos, filters]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: {
    albumId?: string;
    title?: string;
    id?: string;
  }) => {
    setFilters(newFilters);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPhotos.slice(startIndex, endIndex);
  };

  // Define columns for the table
  const columns: Columns<Photo> = [
    { id: "id", label: "ID", sortable: true },
    { id: "albumId", label: "Album ID", sortable: true },
    { id: "title", label: "Title", sortable: true, width: "40%" },
    {
      id: "thumbnail",
      label: "Thumbnail",
      render: (photo: Photo) => (
        <div className="flex justify-center">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-12 h-12 object-cover rounded-md"
            loading="lazy"
          />
        </div>
      ),
    },
    {
      id: "actions",
      label: "Actions",
      render: (photo: Photo) => (
        <div className="flex justify-center space-x-2">
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors"
          >
            View
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* <h2 className="text-2xl font-bold mb-4">Custom Filters Demo</h2> */}

      {/* Table */}
      <Table<Photo>
        data={getCurrentPageData()}
        columns={columns}
        loading={loading}
        // Pagination props
        pagination={true}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredPhotos.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 25, 50]}
        // Style props
        bordered={true}
        className="w-full"
        slots={{
          customFilters: (
            <>
              {/* Custom Filters */}
              <CustomFilters
                onFiltersChange={handleFiltersChange}
                filters={filters}
                albumIds={uniqueAlbumIds}
              />

              {/* Filter Stats */}
              <div className="text-sm text-gray-500 mb-2">
                Showing {filteredPhotos.length} of {photos.length} photos
              </div>
            </>
          ),
        }}
      />
    </>
  );
}
