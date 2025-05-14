import { Moon, Sun } from "lucide-react";

import { Button } from "@/features/shared/components/ui/Button";
import { useTheme } from "../context/ThemeProvider";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Button
        className="justify-start p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        variant="ghost"
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-6 w-6" />
            Light Mode
          </>
        ) : (
          <>
            <Moon className="h-6 w-6" />
            Dark Mode
          </>
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

export default ThemeToggle;
