type Theme = "light" | "dark";

export const getDefaultTheme = (): Theme => {
  try {
    if (typeof window === "undefined") return "dark";

    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      return savedTheme;
    }

    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      } else {
        return "light";
      }
    }

    return "dark";
  } catch (error) {
    console.error("Error getting default theme:", error);
    return "dark";
  }
};

//set/apply theme
export const applyThemeMode = (theme: Theme): void => {
  try {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  } catch (error) {
    console.error("Error applying theme:", error);
  }
};
