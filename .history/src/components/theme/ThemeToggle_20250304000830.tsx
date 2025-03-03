"use client";

import { Theme, useTheme } from "./ThemeProvider";
import { IconMoon, IconSun, IconDeviceDesktop } from "@tabler/icons-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <select
        value={theme}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setTheme(e.target.value as Theme)
        }
        className="bg-background border focus:ring-0 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>

      <div className="flex items-center justify-center w-8 h-8">
        {theme === "light" && <IconSun size={18} />}
        {theme === "dark" && <IconMoon size={18} />}
        {theme === "system" && <IconDeviceDesktop size={18} />}
      </div>
    </div>
  );
}
