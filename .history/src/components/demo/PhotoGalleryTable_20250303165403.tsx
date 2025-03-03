"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Column, Columns, TableCellParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  IconChevronLeft,
  IconChevronRight,
  IconFilter,
} from "@tabler/icons-react";

// Define the Photo type based on JSONPlaceholder API
interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Custom Grid-Style Table Body
const CustomPhotoGrid = ({ data }: { data: Photo[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {data.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-500">
          No photos found matching your criteria.
        </div>
      ) : (
        data.map((photo) => (
          <div
            key={photo.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative aspect-square">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 text-white text-xs px-2 py-1">
                ID: {photo.id}
              </div>
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                Album: {photo.albumId}
              </div>
            </div>
            <div className="p-3">
              <h3
                className="text-sm font-medium line-clamp-2 h-10"
                title={photo.title}
              >
                {photo.title}
              </h3>
              <div className="mt-2 flex justify-end">
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded transition-colors"
                >
                  View Full Size
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Simple Custom Pagination
const SimpleCustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-4 border-t">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <IconChevronLeft className="mr-1" size={16} />
        Previous
      </Button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <IconChevronRight className="ml-1" size={16} />
      </Button>
    </div>
  );
};

// Dropdown Filter Component
const DropdownFilter = ({
  onFilterChange,
  albumIds,
}: {
  onFilterChange: (albumId: string) => void;
  albumIds: number[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("");

  const handleSelect = (albumId: string) => {
    setSelectedAlbum(albumId);
    onFilterChange(albumId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <IconFilter size={16} className="mr-2" />
        {selectedAlbum ? `Album ${selectedAlbum}` : "Filter by Album"}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-10 max-h-60 overflow-y-auto">
          <div
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() => handleSelect("")}
          >
            All Albums
          </div>

          {albumIds.map((id) => (
            <div
              key={id}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSelect(id.toString())}
            >
              Album {id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function PhotoGalleryTable() {
  // State for photos data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Filter state
  const [albumFilter, setAlbumFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
        setFilteredPhotos(data);

        // Extract unique album IDs
        const albums = [...new Set(data.map((photo) => photo.albumId))].sort(
          (a, b) => a - b
        );
        setUniqueAlbums(albums);

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
    if (albumFilter) {
      result = result.filter(
        (photo) => photo.albumId.toString() === albumFilter
      );
    }

    // Apply search query
    if (searchQuery) {
      result = result.filter((photo) =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPhotos(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [photos, albumFilter, searchQuery]);

  // Handle album filter change
  const handleAlbumFilterChange = (albumId: string) => {
    setAlbumFilter(albumId);
  };

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get current page data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredPhotos.slice(startIndex, endIndex);
  };

  // Define columns for the table (not used directly, but needed for Table props)
  const columns: Columns<Photo> = [
    { id: "id", label: "ID" },
    { id: "albumId", label: "Album ID" },
    { id: "title", label: "Title" },
    { id: "url", label: "URL" },
    { id: "thumbnailUrl", label: "Thumbnail URL" },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>

        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Search photos..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-64"
          />

          <DropdownFilter
            onFilterChange={handleAlbumFilterChange}
            albumIds={uniqueAlbums}
          />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {getCurrentPageData().length} of {filteredPhotos.length} photos
      </div>

      <Table<Photo>
        data={getCurrentPageData()}
        columns={columns}
        loading={loading}
        pagination={false}
        bordered={false}
        className="w-full"
        slots={{
          customBody: <CustomPhotoGrid data={getCurrentPageData()} />,
          customPagination: (
            <SimpleCustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ),
        }}
      />
    </div>
  );
}
