"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Users Table", path: "/users" },
  { name: "Photos Table", path: "/photos" },
  { name: "Custom Filters", path: "/custom-filters" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Material-UI Table Clone</h1>
        <ThemeToggle />
      </div>
      
      <nav className="mb-8">
        <ul className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`px-4 py-2 rounded-md inline-block transition-colors ${
                  pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
