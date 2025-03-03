"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Columns } from "@/types";

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export function PhotoTable() {
  // State for photos data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter state
  const [albumFilter, setAlbumFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [uniqueAlbums, setUniqueAlbums] = useState<number[]>([]);

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
        const albums = [...new Set(data.map((photo) => photo.albumId))];
        setUniqueAlbums(albums);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  // Apply filters and pagination
  useEffect(() => {
    let result = [...photos];

    // Apply album filter
    if (albumFilter) {
      result = result.filter(
        (photo) => photo.albumId.toString() === albumFilter
      );
    }

    // Apply title filter
    if (titleFilter) {
      result = result.filter((photo) =>
        photo.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }

    setFilteredPhotos(result);
  }, [photos, albumFilter, titleFilter]);

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPhotos.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  // Define columns for the table
  const columns: Columns<Photo> = [
    { id: "id", label: "ID", sortable: true },
    { id: "albumId", label: "Album ID", sortable: true },
    { id: "title", label: "Title", sortable: true },
    {
      id: "thumbnail",
      label: "Thumbnail",
      render: (photo: Photo) => (
        <div className="flex justify-center">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-16 h-16 object-cover rounded-md"
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
            className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors"
          >
            View Full
          </a>
        </div>
      ),
    },
  ];

  return (
    <Table
      data={getCurrentPageData()}
      columns={columns}
      loading={loading}
      // Pagination props
      pagination={{
        currentPage,
        pageSize,
        totalItems: filteredPhotos.length,
        pageSizeOptions: [5, 10, 25, 50],
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
      // Style props
      bordered
      className="w-full"
    />
  );
}
