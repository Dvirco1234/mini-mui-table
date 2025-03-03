"use client";

import { PhotoTable } from "@/components/demo/PhotoTable";
import { UserTable } from "@/components/demo/UserTable";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Home() {
  return (
    <div className="mx-auto py-10 px-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Material-UI Table Clone</h1>
        <ThemeToggle />
      </div>
      <UserTable />
      <PhotoTable />
    </div>
  );
}
