import { UserTable } from "@/components/demo/UserTable";
import { IconBrandGithub, IconBrandNpm } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto py-10 px-4 h-full flex flex-col max-w-7xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Mini MUI Table</h1>
        <p className="text-xl mb-6">
          A lightweight, customizable React table component inspired by Material
          UI with sorting, filtering, and pagination
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <Link
            href="https://www.npmjs.com/package/@dvirco123/mini-mui-table"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <IconBrandNpm />
            NPM Package
          </Link>

          <Link
            href="https://github.com/Dvirco1234/mini-mui-table"
            target="_blank"
            className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            <IconBrandGithub />
            GitHub Repository
          </Link>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8 max-w-3xl mx-auto text-left">
          <h2 className="text-2xl font-semibold mb-3">About This Project</h2>
          <p className="mb-4">
            Mini MUI Table is a reusable React component that provides a
            powerful and flexible way to display tabular data in your
            applications. Built with TypeScript and styled with Tailwind CSS, it
            offers a clean, modern UI with essential features:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Sorting by columns</li>
            <li>Filtering data</li>
            <li>Pagination with customizable page sizes</li>
            <li>Responsive design</li>
            <li>Customizable styling</li>
            <li>TypeScript support with generics</li>
          </ul>
          <p>
            This demo page showcases the table component in action. Explore the
            features below!
          </p>
        </div>
      </div>
    </div>
  );
}
