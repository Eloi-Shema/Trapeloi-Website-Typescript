import React from "react";
import "./Footer.css";
import logo from "../../assets/logo-white.png";
import { YoutubePlayIcon } from "../icons/icons";
import { InstagramIcon } from "../icons/icons";

interface FooterProps {
  scrollToHome: () => void;
  scrollToStore: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToHome, scrollToStore }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer p-10 dark:bg-black bg-platinum">
      <img className="w-32 invert dark:invert-0 -ml-3" src={logo} alt="" />
      <div className="flex items-center h-52">
        <ul className="foot-link xs:mr-20 md:mr-60 whitespace-nowrap">
          <li onClick={scrollToHome} className="dark:text-white text-black">
            Home
          </li>
          <li onClick={scrollToStore} className="dark:text-white text-black">
            Shop Beats
          </li>
          <li className="dark:text-white text-black">Contact</li>
          <li className="dark:text-white text-black">Help</li>
        </ul>
        <div>
          <h4 className="font-semibold dark:text-white text-black">Address:</h4>
          <p className="text-xs dark:text-white/70 text-black/70 mb-8">
            Kigali, Rwanda
          </p>
          <h4 className="font-semibold dark:text-white text-black">Contact:</h4>
          <p className="text-xs dark:text-white/70 text-black/70 cursor-pointer hover:underline">
            montbitz@gmail.com
          </p>
        </div>
      </div>
      <div className="relative flex items-center mb-8">
        <a href="https://youtube.com/@montbitz?si=alkpyf7prIwloq9A">
          <YoutubePlayIcon />
        </a>
        <a>
          <InstagramIcon />
        </a>
      </div>
      <hr className="dark:invert-0 invert" />
      <div className="flex justify-between py-2">
        <p className="xs:text-[9px] md:text-xs dark:text-white/80 text-black/80">
          &copy; {currentYear} Trapeloi. All rights reserved.
        </p>
        <div className="privacy flex">
          <p className="xs:text-[9px] md:text-xs dark:text-white/80 text-black/80">
            Privacy Policy
          </p>
          <p className="xs:text-[9px] md:text-xs dark:text-white/80 text-black/80">
            Terms of use
          </p>
          <p className="xs:text-[9px] md:text-xs dark:text-white/80 text-black/80">
            Cookie Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
