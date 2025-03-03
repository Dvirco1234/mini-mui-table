"use client";

import { useState } from "react";
import { UserTable } from "@/components/demo/UserTable";
import { PhotoTable } from "@/components/demo/PhotoTable";
// import { AdvancedPhotoTable } from "@/components/demo/AdvancedPhotoTable";
import { PhotoGalleryTable } from "@/components/demo/PhotoGalleryTable";

type DemoType = "users" | "photos" | "advancedPhotos" | "photoGallery";

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<DemoType>("users");

  const renderDemo = () => {
    switch (activeDemo) {
      case "users":
        return <UserTable />;
      case "photos":
        return <PhotoTable />;
      // case "advancedPhotos":
      //   return <AdvancedPhotoTable />;
      case "photoGallery":
        return <PhotoGalleryTable />;
      default:
        return <UserTable />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col p-8">
      <h1 className="text-3xl font-bold mb-6">Mini MUI Table Demo</h1>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveDemo("users")}
            className={`px-4 py-2 rounded-md ${
              activeDemo === "users"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Users Table
          </button>
          <button
            onClick={() => setActiveDemo("photos")}
            className={`px-4 py-2 rounded-md ${
              activeDemo === "photos"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Photos Table
          </button>
          {/* <button
            onClick={() => setActiveDemo("advancedPhotos")}
            className={`px-4 py-2 rounded-md ${
              activeDemo === "advancedPhotos"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Advanced Photos
          </button> */}
          <button
            onClick={() => setActiveDemo("photoGallery")}
            className={`px-4 py-2 rounded-md ${
              activeDemo === "photoGallery"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Photo Gallery
          </button>
        </div>
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden p-4 bg-white">
        {renderDemo()}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Mini MUI Table Demo - A type-safe table component
      </footer>
    </main>
  );
}
