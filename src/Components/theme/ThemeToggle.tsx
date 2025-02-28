import React from "react";
import { switchTheme } from "../../hooks/switchTheme";
import dark_icon from "../../assets/icons/dark-icon.png";
import light_icon from "../../assets/icons/light-icon.png";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = switchTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`mr-5 w-[18px] ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <img src={light_icon} alt="Light Mode Icon" className="invert" />
      ) : (
        <img src={dark_icon} alt="Dark Mode Icon" />
      )}
    </button>
  );
};

export default ThemeToggle;
