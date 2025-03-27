import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext/ThemeContext";

type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setNewTheme: (theme: Theme) => void;
}

export const switchTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("switchTheme must be used within a ThemeProvider");
  }

  return context;
};
