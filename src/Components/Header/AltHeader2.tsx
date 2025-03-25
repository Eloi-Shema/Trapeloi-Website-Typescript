import "./Header.css";
import logo_dark from "../../assets/logo-blue electric.png";
import logo_light from "../../assets/logo-purple.png";
import { Link } from "react-router-dom";
import dark_icon from "../../assets/icons/dark-icon.png";
import light_icon from "../../assets/icons/light-icon.png";
import { switchTheme } from "../../hooks/switchTheme";

const AltHeader2: React.FC = () => {
  const { theme, toggleTheme } = switchTheme();

  return (
    <header className="header-content fixed inset-0 py-8 xs:px-8 md:px-20 bg-white/90 dark:bg-black/80 z-30">
      <Link to="/">
        {theme === "dark" ? (
          <img className="xs:w-32 md:w-36" src={logo_dark} alt="Logo" />
        ) : (
          <img className="xs:w-32 md:w-36" src={logo_light} alt="Logo" />
        )}
      </Link>

      <div className="menu-links">
        <button
          onClick={toggleTheme}
          className="mr-10 w-[18px]"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <img src={light_icon} alt="Light Mode Icon" className="invert" />
          ) : (
            <img src={dark_icon} alt="Dark Mode Icon" />
          )}
        </button>
      </div>
    </header>
  );
};

export default AltHeader2;
