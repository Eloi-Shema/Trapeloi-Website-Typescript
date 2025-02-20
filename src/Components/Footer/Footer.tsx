import React from "react";
import "./Footer.css";
import logo from "../../assets/logo blue.png";
import youtube from "../../assets/icons/youtube-icon.png";
import instagram from "../../assets/icons/instagram-white-icon.png";

interface FooterProps {
  scrollToHome: () => void;
  scrollToStore: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToHome, scrollToStore }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer p-10 mt-5 xs:rounded-tr-[60px] md:rounded-tr-full">
      <img className="logo w-32 -ml-6" src={logo} alt="" />
      <div className="flex items-center h-52">
        <ul className="foot-link xs:mr-20 md:mr-60 whitespace-nowrap">
          <li onClick={scrollToHome}>Home</li>
          <li onClick={scrollToStore}>Shop Beats</li>
          <li>Contact</li>
          <li>Help</li>
        </ul>
        <div>
          <h4 className="font-semibold">Address:</h4>
          <p className="text-xs text-white/70 mb-8">Kigali, Rwanda</p>
          <h4 className="font-semibold">Contact:</h4>
          <p className="text-xs text-white/70 cursor-pointer hover:underline">
            montbitz@gmail.com
          </p>
        </div>
      </div>
      <div className="relative flex items-center mb-8">
        <img
          className="ig-icon w-5 mr-4 cursor-pointer"
          src={instagram}
          alt=""
        />
        <a href="https://youtube.com/@montbitz?si=alkpyf7prIwloq9A">
          <img
            className="yt-icon w-6 invert cursor-pointer"
            src={youtube}
            alt=""
          />
        </a>
      </div>
      <hr />
      <div className="flex justify-between py-2">
        <p className="xs:text-[9px] md:text-xs text-white/80">
          &copy; {currentYear} MontBitz. All rights reserved.
        </p>
        <div className="privacy flex">
          <p className="xs:text-[9px] md:text-xs">Privacy Policy</p>
          <p className="xs:text-[9px] md:text-xs">Terms of use</p>
          <p className="xs:text-[9px] md:text-xs">Cookie Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
