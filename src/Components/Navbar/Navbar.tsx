import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo_dark from "../../assets/logo-blue electric.png";
import logo_light from "../../assets/logo-black (2).png";
import cart_icon from "../../assets/icons/cart-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import { Link } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import { switchTheme } from "../../hooks/switchTheme";

interface NavbarProps {
  toggleCart: () => void;
  cartCount: number;
  warning?: string | null;
  animate?: boolean | null;
  scrollToStore: () => void;
  scrollToPricing: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  toggleCart,
  cartCount,
  warning,
  animate,
  scrollToStore,
  scrollToPricing,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
    <div className="header">
      {isScrolled ? (
        <div className="header-content relative py-8 pr-4 bg-gray-300/90 dark:bg-bgBlack/50 backdrop-blur-sm">
          <Link to="/">
            {theme === "dark" ? (
              <img
                className="xs:w-40 md:w-48 xl:w-52"
                src={logo_dark}
                alt="Logo"
              />
            ) : (
              <img
                className="xs:w-40 md:w-48 xl:w-52"
                src={logo_light}
                alt="Logo"
              />
            )}
          </Link>
          {warning && (
            <p
              className={`font-kanit absolute top-16 xs:right-4 sm:right-10 text-sm bg-red-700 ${
                animate ? "animation-shake" : ""
              } py-2 px-4 rounded-md transition-all whitespace-nowrap z-10`}
            >
              {warning}
            </p>
          )}
          <div className="menu-links dark:text-white text-black">
            <ThemeToggle />

            <h4 onClick={scrollToStore}>Beat Store</h4>
            <h4 onClick={scrollToPricing}>Pricing</h4>
            <div className="cart cursor-pointer" onClick={toggleCart}>
              <img src={cart_icon} alt="" className="dark:invert" />
              <p
                className={`${
                  cartCount === 0 ? "hidden" : "block"
                } bg-red-700 dark:bg-red-500 text-white`}
              >
                {cartCount}
              </p>
            </div>
            <Link to="/login">
              <button className="login-btn bg-perfectBlue text-white dark:bg-white dark:text-black">
                Log In
              </button>
            </Link>
            <button className="dark:invert md:hidden w-5" onClick={toggleMenu}>
              <img
                className={`${
                  isOpen ? "rotate-0" : "rotate-45"
                } w-[14px] transition-all duration-200`}
                src={close_icon}
                alt="Close Menu"
              />
            </button>
          </div>
        </div>
      ) : (
        <div className="header-content relative py-8 pr-4 bg-transparent backdrop-blur-sm">
          <Link to="/">
            {theme === "dark" ? (
              <img
                className="xs:w-40 md:w-48 xl:w-52"
                src={logo_dark}
                alt="Logo"
              />
            ) : (
              <img
                className="xs:w-40 md:w-48 xl:w-52 invert"
                src={logo_light}
                alt="Logo"
              />
            )}
          </Link>

          <div className="menu-links text-white">
            <ThemeToggle />

            <h4 onClick={scrollToStore}>Beat Store</h4>
            <h4 onClick={scrollToPricing}>Pricing</h4>
            <div className="cart cursor-pointer" onClick={toggleCart}>
              <img src={cart_icon} alt="" className="invert" />
              <p
                className={`${
                  cartCount === 0 ? "hidden" : "block"
                } bg-red-700 text-white`}
              >
                {cartCount}
              </p>
            </div>
            <Link to="/login">
              <button className="login-btn bg-white text-black">Log In</button>
            </Link>
            <button className="dark:invert md:hidden w-5" onClick={toggleMenu}>
              <img
                className={`${
                  isOpen ? "rotate-0" : "rotate-45"
                } w-[14px] dark:invert-0 invert transition-all duration-200`}
                src={close_icon}
                alt="Close Menu"
              />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 bg-platinum dark:bg-bgBlack/40 dark:backdrop-blur-sm dark:text-white text-black text-sm px-6 py-3 rounded-b-md">
          <h4 onClick={scrollToStore} className="mb-5 cursor-pointer">
            Beat Store
          </h4>
          <h4 onClick={scrollToPricing} className="mb-5 cursor-pointer">
            Pricing
          </h4>
          <Link to="/login">
            <button className="bg-black text-white dark:bg-white dark:text-black px-5 py-1 mb-4 rounded-md">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
