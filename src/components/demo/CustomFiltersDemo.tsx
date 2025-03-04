"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";
import { CustomFilters } from "./CustomFilters";

// Define the Photo type based on JSONPlaceholder API
interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

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
          {/* eslint-disable-next-line */}
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
      <div className="text-sm text-gray-500 mb-2">
        Showing {filteredPhotos.length} of {photos.length} photos
      </div>

      <Table
        data={getCurrentPageData()}
        columns={columns}
        loading={loading}
        pagination={{
          currentPage,
          pageSize,
          totalItems: filteredPhotos.length,
          pageSizeOptions: [5, 10, 25, 50],
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }}
        bordered={true}
        className="w-full"
        slots={{
          customFilters: (
            <CustomFilters
              onFiltersChange={handleFiltersChange}
              filters={filters}
              albumIds={uniqueAlbumIds}
            />
          ),
        }}
      />
    </>
  );
}
