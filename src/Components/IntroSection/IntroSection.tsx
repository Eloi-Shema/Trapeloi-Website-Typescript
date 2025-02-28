import React, { RefObject } from "react";
import "./IntroSection.css";
import IntrosectionBackground from "../theme/Dark/DarkIntrosectionBackground";
import LightIntrosectionBackground from "../theme/Light/LightIntrosectionBackground";
import { switchTheme } from "../../hooks/switchTheme";
import logo from "../../assets/logo-white.png";

interface IntroSectionProps {
  scrollToStore: () => void;
  homeRef: RefObject<HTMLDivElement | null>;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  scrollToStore,
  homeRef,
}) => {
  const { theme } = switchTheme();
  return (
    <div
      ref={homeRef}
      className="hero relative h-screen-h flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0">
        <div className="overlay dark:bg-black/50 bg-white/30 absolute inset-0"></div>
      </div>
      {theme === "dark" ? (
        <IntrosectionBackground />
      ) : (
        <LightIntrosectionBackground />
      )}

      <div className="heading relative text-center w-[md] flex flex-col items-center px-4 md:px-8 m-20 text-black/90 dark:text-white/90">
        <div className="flex items-center gap-2 mb-10 backdrop-blur-sm">
          <div className="xs:text-md md:text-xl lg:text-2xl font-medium">
            Welcome to
          </div>
          <img
            className="xs:w-[72px] md:w-24 mt-1 dark:invert-0 invert"
            src={logo}
            alt=""
          />
        </div>
        <h1 className="xs:text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8 text-black/90 dark:text-white/90">
          The Hub Of Your <br /> Potential Hits
        </h1>
        <h3 className="xs:w-80 md:w-3/4 xs:text-xs sm:text-sm md:text-base xl:text-lg mt-4 font-light backdrop-blur-sm">
          Unleash your musical creativity with our mind-crafted collection of
          high-quality beats made for your rap and Hip-Hop bangs.
        </h3>
      </div>

      <div className="shop-button relative  text-xl rounded-md dark:text-black text-white font-normal z-10">
        <button
          onClick={scrollToStore}
          className="py-3 xs:px-28 sm:px-32 md:px-30 lg:px-12 whitespace-nowrap"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
