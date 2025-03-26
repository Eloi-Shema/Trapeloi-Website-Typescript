import { createContext, useEffect, useState } from "react";
import { applyThemeMode, getDefaultTheme } from "../utils/ThemeMode/themeMode";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setNewTheme: (newTheme: Theme) => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return getDefaultTheme();
  }); //initialize theme

  useEffect(() => {
    applyThemeMode(theme);
  }, [theme]); //apply theme when state changes

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }; //toggle between dark and light mode

  const setNewTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  }; //set a specific theme

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setNewTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setNewTheme: () => {},
}); //context with dark mode as default
