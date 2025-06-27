import React, { useEffect, useState } from "react";
import "./Header.css";
import logo_dark from "../../assets/logo-blue electric.png";
import logo_light from "../../assets/logo-purple.png";
import logo from "../../assets/logo-white.png";
import cart_icon from "../../assets/icons/cart.svg";
import close_icon from "../../assets/icons/close.svg";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import { switchTheme } from "../../hooks/switchTheme";
import { motion } from "framer-motion";
import { AnimatedCheck, AnimatedX } from "../../utils/icons/icons";
import { useAuth } from "../../contexts/Auth/AuthContext";
import Avatar from "../Avatars/Avatars";

interface HeaderProps {
  toggleCart: () => void;
  cartCount: number;
  cartNotification?: string | null;
  warning?: string | null;
  animate?: boolean | null;
  scrollToStore: () => void;
  scrollToPricing: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleCart,
  cartCount,
  cartNotification,
  warning,
  animate,
  scrollToStore,
  scrollToPricing,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { user, logout, authLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return (): void => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { theme } = switchTheme();

  return (
    <div className="fixed inset-0 h-[60px] transition-all duration-300 z-30">
      {isScrolled ? (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: isScrolled ? 0 : -100, opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative px-10 py-5 shadow-lg header-content bg-white/90 dark:bg-black/80 shadow-black/5 dark:shadow-platinum/5 backdrop-blur-sm"
        >
          <Link to="/">
            {theme === "dark" ? (
              <img className="xs:w-32 md:w-36" src={logo_dark} alt="Logo" />
            ) : (
              <img
                className="xs:w-32 md:w-36"
                src={logo_light}
                alt="Trapeloi"
              />
            )}
          </Link>

          {cartNotification && (
            <div className="absolute z-10 flex items-center px-4 py-2 text-sm transition-all bg-green-700 rounded-md top-16 xs:right-4 sm:right-10 font-kanit whitespace-nowrap">
              {cartNotification} {""}
              <span>
                <AnimatedCheck />
              </span>
            </div>
          )}

          {warning && (
            <div
              className={`absolute top-16 xs:right-4 sm:right-10 flex items-center text-sm font-kanit bg-red-700 ${
                animate ? "animation-shake" : ""
              } py-2 px-4 rounded-md transition-all whitespace-nowrap z-10`}
            >
              {warning}{" "}
              <span className="ml-1">
                <AnimatedX />
              </span>
            </div>
          )}
          <div className="flex items-center font-semibold text-black dark:text-white">
            <ThemeToggle />

            <h4
              className="mr-5 cursor-pointer xs:hidden md:block"
              onClick={scrollToStore}
            >
              Store
            </h4>
            <h4
              className="mr-5 cursor-pointer xs:hidden md:block"
              onClick={scrollToPricing}
            >
              Pricing
            </h4>
            <div className="mr-5 cursor-pointer cart" onClick={toggleCart}>
              <img src={cart_icon} alt="" className="w-6 dark:invert" />
              <p
                className={`${
                  cartCount === 0 ? "hidden" : "block"
                } bg-red-700 text-white`}
              >
                {cartCount}
              </p>
            </div>

            {user ? (
              <div className="group">
                <button className="flex items-center justify-center overflow-hidden rounded-full xs:w-0 md:w-8">
                  <Avatar userName={user.email} />
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
            <button className="w-5 dark:invert md:hidden" onClick={toggleMenu}>
              <img
                className={`${
                  isOpen ? "rotate-0" : "rotate-45"
                } w-5 transition-all duration-200`}
                src={close_icon}
                alt="Close Menu"
              />
            </button>
          </div>
        </motion.header>
      ) : (
        <header className="relative px-10 py-5 bg-transparent header-content">
          <Link to="/">
            <img className="xs:w-32 md:w-36" src={logo} alt="Trapeloi" />
          </Link>

          <div className="flex items-center font-semibold text-white">
            <ThemeToggle />

            <h4
              className="mr-5 cursor-pointer xs:hidden md:block"
              onClick={scrollToStore}
            >
              Store
            </h4>
            <h4
              className="mr-5 cursor-pointer xs:hidden md:block"
              onClick={scrollToPricing}
            >
              Pricing
            </h4>
            <div className="mr-5 cursor-pointer cart" onClick={toggleCart}>
              <img src={cart_icon} alt="Cart icon" className="w-6 invert" />
              <p
                className={`${
                  cartCount === 0 ? "hidden" : "block"
                } bg-red-700 text-white`}
              >
                {cartCount}
              </p>
            </div>

            {user ? (
              <div className="group">
                <button className="flex items-center justify-center overflow-hidden rounded-full xs:w-0 md:w-8">
                  <Avatar userName={user.email} />
                </button>
                <div className="absolute right-0 z-50 items-center hidden px-2 py-4 bg-white rounded-md shadow-lg group-justify-center group-hover:block dark:bg-black/70 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="px-2 py-1 text-sm text-gray-700 truncate dark:text-gray-200">
                      {user.email}
                    </p>
                    <button
                      onClick={logout}
                      className="w-20 px-2 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
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
                <button className="text-black bg-white login-btn xs:hidden md:block">
                  Log In
                </button>
              </Link>
            )}
            <button className="w-5 dark:invert md:hidden" onClick={toggleMenu}>
              <img
                className={`${
                  isOpen ? "rotate-0" : "rotate-45"
                } w-5 dark:invert-0 invert transition-all duration-200`}
                src={close_icon}
                alt="Close Menu"
              />
            </button>
          </div>
        </header>
      )}

      {isOpen && (
        <div className="absolute right-0 px-6 py-3 text-sm font-semibold text-black bg-platinum/80 dark:bg-bgBlack/40 backdrop-blur-md dark:text-white rounded-tl-md rounded-bl-md md:hidden">
          {user ? (
            <>
              <div className="flex items-center mb-4">
                <Avatar userName={user.userName} />
                <p className="px-2 py-1 text-sm text-gray-700 truncate w-36 dark:text-gray-200">
                  {user.email}
                </p>
              </div>
              <h4 onClick={scrollToStore} className="mb-5 cursor-pointer">
                Beat Store
              </h4>
              <h4 onClick={scrollToPricing} className="mb-5 cursor-pointer">
                Pricing
              </h4>

              <button
                onClick={logout}
                className="w-20 px-5 py-1 mb-4 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent border-b-transparent border-l-transparent animate-spin justify-self-center" />
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <>
              <h4 onClick={scrollToStore} className="mb-5 cursor-pointer">
                Beat Store
              </h4>
              <h4 onClick={scrollToPricing} className="mb-5 cursor-pointer">
                Pricing
              </h4>
              <Link to="/login">
                <button className="px-5 py-1 mb-4 text-white bg-black rounded-md dark:bg-white dark:text-black">
                  Log In
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
