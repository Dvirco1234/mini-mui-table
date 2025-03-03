import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { UserTable } from "@/components/demo/UserTable";
import { CustomFiltersDemo } from "@/components/demo/CustomFiltersDemo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Mini MUI Table
      </h1>
      <p className="text-xl text-center max-w-2xl">
        A lightweight, customizable table component inspired by Material-UI
        tables. Use the navigation above to explore different table demos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        <FeatureCard
          title="Type-Safe"
          description="Built with TypeScript for type safety and better developer experience."
          icon="🛡️"
        />
        <FeatureCard
          title="Customizable"
          description="Easily customize columns, sorting, filtering, and pagination."
          icon="🎨"
        />
        <FeatureCard
          title="Responsive"
          description="Works great on all screen sizes with a mobile-friendly design."
          icon="📱"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
