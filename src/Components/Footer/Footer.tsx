import React from "react";
import "./Footer.css";
import logo from "../../assets/logo-white.png";
import { GmailIcon, YoutubePlayIcon, InstagramIcon } from "../icons/icons";
import { Link } from "react-router-dom";

interface FooterProps {
  scrollToHome: () => void;
  scrollToStore: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToHome, scrollToStore }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer dark:bg-blueGreen/[7%] bg-white/50 px-10 py-5">
      <div className="flex xs:flex-col lg:flex-row items-center justify-evenly mb-5">
        <img
          className="xs:w-40 lg:w-52 invert dark:invert-0"
          src={logo}
          alt=""
        />
        <div className="w-full flex justify-evenly items-center my-10">
          <div className="flex flex-col xs:mr-10 md:mr-0 whitespace-nowrap">
            <p
              onClick={scrollToHome}
              className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all duration-300 font-trap cursor-pointer"
            >
              Back to Top &#8613;
            </p>
            <p
              onClick={scrollToStore}
              className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all duration-300 font-trap cursor-pointer"
            >
              Shop
            </p>
            <Link to={"/about"}>
              <p className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all du font-trapration-300 cursor-pointer">
                About
              </p>
            </Link>
          </div>

          <div className="flex flex-col whitespace-nowrap">
            <Link to={"/terms"}>
              <p className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all duration-300 font-trap cursor-pointer">
                Licensing Terms
              </p>
            </Link>

            <Link to={"/privacy"}>
              <p
                onClick={scrollToStore}
                className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all duration-300 font-trap cursor-pointer"
              >
                Privacy
              </p>
            </Link>

            <p className="dark:text-white/70 dark:hover:text-white text-black/60 hover:text-black font-medium mb-5 xs:text-sm md:text-base transition-all du font-trapration-300 cursor-pointer">
              Contact
            </p>
          </div>
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

      <div className="">
        <hr className="dark:invert-0 invert py-3 opacity-50" />
        <div className="flex justify-center">
          <p className="xs:text-sm dark:text-white/60 text-black/80">
            &copy; {currentYear} Trapeloi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
