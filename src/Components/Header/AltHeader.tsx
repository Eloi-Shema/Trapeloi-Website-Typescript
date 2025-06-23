import "./Header.css";
import logo_dark from "../../assets/logo-blue electric.png";
import logo_light from "../../assets/logo-purple.png";
import { Link } from "react-router-dom";
import dark_icon from "../../assets/icons/moon.svg";
import light_icon from "../../assets/icons/sun.svg";
import { switchTheme } from "../../hooks/switchTheme";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Avatar from "../Avatars/Avatars";

const AltHeader: React.FC = () => {
  const { theme, toggleTheme } = switchTheme();

  const { user, logout, authLoading } = useAuth();

  return (
    <header className="sticky inset-0 z-30 w-full px-10 py-5 shadow-lg header-content bg-white/90 dark:bg-black/80 shadow-black/5 dark:shadow-platinum/5">
      <Link to="/">
        {theme === "dark" ? (
          <img className="xs:w-32 md:w-36" src={logo_dark} alt="Logo" />
        ) : (
          <img className="xs:w-32 md:w-36" src={logo_light} alt="Logo" />
        )}
      </Link>

      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="mr-5 w-[18px] -rotate-[20deg]"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <img src={light_icon} alt="Light Mode Icon" className="invert" />
          ) : (
            <img src={dark_icon} alt="Dark Mode Icon" />
          )}
        </button>

        {user ? (
          <div className="group">
            <button className="flex items-center justify-center w-8 overflow-hidden rounded-full">
              <Avatar userName={user.userName} />
            </button>
            <div className="absolute right-0 z-50 items-center hidden px-2 py-4 bg-white rounded-md shadow-lg group-justify-center group-hover:block dark:bg-black/80 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="px-2 py-1 text-sm text-gray-700 truncate dark:text-gray-200">
                  {user.email}
                </p>
                <button
                  onClick={logout}
                  className="w-20 px-2 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  {authLoading ? (
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent border-b-transparent border-l-transparent animate-spin justify-self-center" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="text-white bg-black dark:bg-white dark:text-black login-btn xs:hidden md:block">
              Log In
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AltHeader;
