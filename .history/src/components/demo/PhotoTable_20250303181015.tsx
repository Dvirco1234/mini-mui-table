"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { Column, Columns, TableCellParams } from "@/types";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select } from "@/components/ui/select";

// Define the Photo type based on JSONPlaceholder API
interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

// Custom Pagination Component
// const CustomPagination = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }: {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }) => {
//   return (
//     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-md mt-4">
//       <div className="text-sm text-gray-700 dark:text-gray-300">
//         Page {currentPage} of {totalPages}
//       </div>
//       <div className="flex space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(1)}
//           disabled={currentPage === 1}
//         >
//           First
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(totalPages)}
//           disabled={currentPage === totalPages}
//         >
//           Last
//         </Button>
//       </div>
//     </div>
//   );
// };

// Custom Filters Component
// const CustomFilters = ({
//   onAlbumFilterChange,
//   onTitleFilterChange,
//   albumFilter,
//   titleFilter,
//   albums,
// }: {
//   onAlbumFilterChange: (albumId: string) => void;
//   onTitleFilterChange: (title: string) => void;
//   albumFilter: string;
//   titleFilter: string;
//   albums: number[];
// }) => {
//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-4">
//       <div className="flex-1">
//         <label htmlFor="album-filter" className="block text-sm font-medium mb-1">
//           Filter by Album
//         </label>
//         <Select
//           id="album-filter"
//           value={albumFilter}
//           onChange={(e) => onAlbumFilterChange(e.target.value)}
//           className="w-full"
//         >
//           <option value="">All Albums</option>
//           {albums.map((albumId) => (
//             <option key={albumId} value={albumId.toString()}>
//               Album {albumId}
//             </option>
//           ))}
//         </Select>
//       </div>
//       <div className="flex-1">
//         <label htmlFor="title-filter" className="block text-sm font-medium mb-1">
//           Search by Title
//         </label>
//         <Input
//           id="title-filter"
//           type="text"
//           placeholder="Search photos..."
//           value={titleFilter}
//           onChange={(e) => onTitleFilterChange(e.target.value)}
//           className="w-full"
//         />
//       </div>
//     </div>
//   );
// };

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

  // Calculate total pages
  const totalPages = Math.ceil(filteredPhotos.length / pageSize);

  return (
    <div className="table-container flex-1 overflow-auto">
      {/* Custom Filters */}
      {/* <CustomFilters
        onAlbumFilterChange={setAlbumFilter}
        onTitleFilterChange={setTitleFilter}
        albumFilter={albumFilter}
        titleFilter={titleFilter}
        albums={uniqueAlbums}
      /> */}

      <Table<Photo>
        data={getCurrentPageData()}
        columns={columns}
        loading={loading}
        // Disable built-in pagination since we're using custom
        pagination={false}
        // Style props
        bordered={true}
        className="w-full"

        // Custom slots
        // slots={{
        //   customPagination: (
        //     <CustomPagination
        //       currentPage={currentPage}
        //       totalPages={totalPages}
        //       onPageChange={handlePageChange}
        //     />
        //   ),
        //   customFilters: null, // We're rendering our custom filters outside the table
        // }}
      />
    </div>
  );
}
