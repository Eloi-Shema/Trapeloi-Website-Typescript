import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo blue.png";
import cart_icon from "../../assets/icons/cart-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import { Link } from "react-router-dom";

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

  return (
    <div className="header">
      <div
        className={`header-content relative ${
          isScrolled ? "bg-black/90" : "bg-transparent"
        } py-8 pr-4`}
      >
        <Link to="/">
          <img className="xs:w-40 md:w-48 xl:w-52" src={logo} alt="Logo" />
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
        <div className="menu-links">
          <h4 onClick={scrollToStore}>Beat Store</h4>
          <h4 onClick={scrollToPricing}>Pricing</h4>
          <div className="cart cursor-pointer" onClick={toggleCart}>
            <img src={cart_icon} alt="" />
            <p className={`${cartCount === 0 ? "hidden" : "block"}`}>
              {cartCount}
            </p>
          </div>
          <Link to="/login">
            <button className="login-btn">Log In</button>
          </Link>
          <button className="invert md:hidden w-5" onClick={toggleMenu}>
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

      {isOpen && (
        <div className="absolute right-0 bg-bgBlack/80 text-white text-sm px-6 py-3">
          <h4 onClick={scrollToStore} className="mb-5 cursor-pointer">
            Beat Store
          </h4>
          <h4 onClick={scrollToPricing} className="mb-5 cursor-pointer">
            Pricing
          </h4>
          <Link to="/login">
            <button className="px-5 py-1 mb-4 border-2 border-gray-300 rounded-md">
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
