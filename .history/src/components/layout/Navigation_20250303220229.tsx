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
    <div className="w-full flex">
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Material-UI Table Clone</h1>
        <ThemeToggle />
      </div>

      <nav className="border-b pb-4 ">
        <ul className="flex flex-wrap gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`text-base font-medium transition-colors hover:underline ${
                  pathname === item.path
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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
