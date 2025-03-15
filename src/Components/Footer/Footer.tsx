import React from "react";
import "./Footer.css";
import logoGreen from "../../assets/logo-green.png";
import logoWhite from "../../assets/logo-white.png";
import { GmailIcon, YoutubePlayIcon, InstagramIcon } from "../icons/icons";
import { switchTheme } from "../../hooks/switchTheme";

interface FooterProps {
  scrollToHome: () => void;
  scrollToStore: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToHome, scrollToStore }) => {
  const currentYear = new Date().getFullYear();

  const { theme } = switchTheme();
  return (
    <div className="footer dark:bg-blueGreen/[7%] bg-niceGreen/5 rounded-3xl px-8 pb-5 mt-10">
      <div className="flex xs:flex-col lg:flex-row items-center justify-evenly h-52">
        {theme === "dark" ? (
          <img className="xs:w-40 lg:w-52" src={logoWhite} alt="" />
        ) : (
          <img className="xs:w-40 lg:w-52" src={logoGreen} alt="" />
        )}
        <div className="lg:w-1/4 flex justify-between whitespace-nowrap">
          <p
            onClick={scrollToHome}
            className="dark:text-white/80 dark:hover:text-white text-black/60 hover:text-black font-semibold mr-5 xs:text-sm md:text-base transition-all duration-300 cursor-pointer"
          >
            Back to Top &#8613;
          </p>
          <p
            onClick={scrollToStore}
            className="dark:text-white/80 dark:hover:text-white text-black/60 hover:text-black font-semibold mr-5 xs:text-sm md:text-base transition-all duration-300 cursor-pointer"
          >
            Shop Beats
          </p>
          <p className="dark:text-white/80 dark:hover:text-white text-black/60 hover:text-black font-semibold mr-5 xs:text-sm md:text-base transition-all duration-300 cursor-pointer">
            About Me
          </p>
        </div>

        <div className="relative flex items-center">
          <a href="https://youtube.com/@montbitz?si=alkpyf7prIwloq9A">
            <YoutubePlayIcon />
          </a>
          <a>
            <InstagramIcon />
          </a>

          <a>
            <GmailIcon />
          </a>
        </div>
      </div>

      <hr className="dark:invert-0 invert opacity-50" />
      <div className="flex justify-between py-2">
        <p className="xs:text-[9px] md:text-xs dark:text-white/60 text-black/80">
          &copy; {currentYear} Trapeloi. All rights reserved.
        </p>
        <div className="privacy flex">
          <p className="xs:text-[9px] md:text-xs dark:text-white/60 text-black/80">
            Privacy Policy
          </p>
          <p className="xs:text-[9px] md:text-xs dark:text-white/60 text-black/80">
            Terms of use
          </p>
          <p className="xs:text-[9px] md:text-xs dark:text-white/60 text-black/80">
            Cookie Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
