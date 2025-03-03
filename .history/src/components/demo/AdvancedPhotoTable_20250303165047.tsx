"use client";

import { useState, useEffect, useCallback } from "react";
import { Table } from "@/components/ui/table";
import { Column, Columns, TableCellParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react";

// Define the Photo type based on JSONPlaceholder API
interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Advanced Custom Pagination Component
const AdvancedPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of page range
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed before the range
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add the range of pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed after the range
      if (endPage < totalPages - 1) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IconChevronLeft size={16} />
          </Button>
          
          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              page < 0 ? (
                <span key={`ellipsis-${index}`} className="px-2">...</span>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="w-9 h-9"
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              )
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <IconChevronRight size={16} />
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-2">
          Page {currentPage} of {totalPages}
        </div>
      </CardContent>
    </Card>
  );
};

// Advanced Custom Filters Component
const AdvancedFilters = ({
  onFiltersChange,
  albumIds,
}: {
  onFiltersChange: (filters: { albumId?: number; titleSearch?: string; idRange?: [number, number] }) => void;
  albumIds: number[];
}) => {
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | undefined>(undefined);
  const [idRange, setIdRange] = useState<[number, number]>([1, 5000]);
  
  // Debounce filter changes
  const debouncedFilterChange = useCallback(
    (filters: { albumId?: number; titleSearch?: string; idRange?: [number, number] }) => {
      const timeoutId = setTimeout(() => {
        onFiltersChange(filters);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    },
    [onFiltersChange]
  );
  
  // Update filters when inputs change
  useEffect(() => {
    const filters = {
      albumId: selectedAlbumId,
      titleSearch: titleSearch || undefined,
      idRange: idRange,
    };
    
    debouncedFilterChange(filters);
  }, [titleSearch, selectedAlbumId, idRange, debouncedFilterChange]);
  
  // Reset all filters
  const resetFilters = () => {
    setTitleSearch("");
    setSelectedAlbumId(undefined);
    setIdRange([1, 5000]);
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title Search */}
          <div className="space-y-2">
            <label htmlFor="title-search" className="text-sm font-medium">
              Search by Title
            </label>
            <div className="relative">
              <Input
                id="title-search"
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
                placeholder="Search photo titles..."
                className="pl-8"
              />
              <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Album Filter */}
          <div className="space-y-2">
            <label htmlFor="album-filter" className="text-sm font-medium">
              Filter by Album
            </label>
            <select
              id="album-filter"
              value={selectedAlbumId || ""}
              onChange={(e) => setSelectedAlbumId(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">All Albums</option>
              {albumIds.map((id) => (
                <option key={id} value={id}>
                  Album {id}
                </option>
              ))}
            </select>
          </div>
          
          {/* ID Range Filter */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="id-range" className="text-sm font-medium">
                ID Range
              </label>
              <span className="text-sm text-muted-foreground">
                {idRange[0]} - {idRange[1]}
              </span>
            </div>
            <Slider
              id="id-range"
              min={1}
              max={5000}
              step={100}
              value={idRange}
              onValueChange={(value) => setIdRange(value as [number, number])}
              className="py-2"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export function AdvancedPhotoTable() {
  // State for photos data
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uniqueAlbumIds, setUniqueAlbumIds] = useState<number[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Filter state
  const [filters, setFilters] = useState<{
    albumId?: number;
    titleSearch?: string;
    idRange?: [number, number];
  }>({});

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
        const albumIds = [...new Set(data.map((photo) => photo.albumId))];
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
    if (filters.albumId !== undefined) {
      result = result.filter((photo) => photo.albumId === filters.albumId);
    }

    // Apply title search
    if (filters.titleSearch) {
      result = result.filter((photo) =>
        photo.title.toLowerCase().includes(filters.titleSearch!.toLowerCase())
      );
    }

    // Apply ID range filter
    if (filters.idRange) {
      const [min, max] = filters.idRange;
      result = result.filter((photo) => photo.id >= min && photo.id <= max);
    }

    setFilteredPhotos(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [photos, filters]);

  // Handle filter changes
  const handleFiltersChange = (newFilters: {
    albumId?: number;
    titleSearch?: string;
    idRange?: [number, number];
  }) => {
    setFilters(newFilters);
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

  // Define columns for the table
  const columns: Columns<Photo> = [
    { id: "id", label: "ID", sortable: true },
    { id: "albumId", label: "Album ID", sortable: true },
    {
      id: "title",
      label: "Title",
      sortable: true,
      width: "40%",
    },
    {
      id: "thumbnail",
      label: "Thumbnail",
      render: (photo: Photo) => (
        <div className="flex justify-center">
          <img
            src={photo.thumbnailUrl}
            alt={photo.title}
            className="w-16 h-16 object-cover rounded-md transition-all hover:scale-150 hover:z-10"
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
          <button
            onClick={() => window.open(photo.thumbnailUrl, "_blank")}
            className="px-3 py-1 bg-gray-500 text-white rounded-md text-xs hover:bg-gray-600 transition-colors"
          >
            Thumbnail
          </button>
        </div>
      ),
    },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Photo Gallery</h2>
        <div className="text-sm text-muted-foreground">
          Showing {filteredPhotos.length} of {photos.length} photos
        </div>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        onFiltersChange={handleFiltersChange}
        albumIds={uniqueAlbumIds}
      />

      {/* Table */}
      <Table<Photo>
        data={getCurrentPageData()}
        columns={columns}
        loading={loading}
        pagination={false}
        bordered={true}
        className="w-full"
      />

      {/* Custom Pagination */}
      {!loading && filteredPhotos.length > 0 && (
        <AdvancedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
