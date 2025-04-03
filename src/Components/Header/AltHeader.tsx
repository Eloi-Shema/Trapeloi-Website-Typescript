import "./Header.css";
import logo_dark from "../../assets/logo-blue electric.png";
import logo_light from "../../assets/logo-purple.png";
import { Link } from "react-router-dom";
import dark_icon from "../../assets/icons/moon.svg";
import light_icon from "../../assets/icons/sun.svg";
import { switchTheme } from "../../hooks/switchTheme";

const AltHeader: React.FC = () => {
  const { theme, toggleTheme } = switchTheme();

  return (
    <header className="header-content fixed inset-0 py-8 xs:px-8 md:px-20 bg-white/90 dark:bg-black/80 shadow-lg shadow-black/5 dark:shadow-platinum/5 z-30">
      <Link to="/">
        {theme === "dark" ? (
          <img className="xs:w-32 md:w-36" src={logo_dark} alt="Logo" />
        ) : (
          <img className="xs:w-32 md:w-36" src={logo_light} alt="Logo" />
        )}
      </Link>

      <div className="">
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

        <Link to="/login">
          <button className="bg-black text-white dark:bg-white dark:text-black py-1 px-5 rounded-md">
            Log In
          </button>
        </Link>
      </div>
    </header>
  );
};

export default AltHeader;
