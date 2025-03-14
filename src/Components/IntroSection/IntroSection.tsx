import React, { RefObject } from "react";
import "./IntroSection.css";
import logo from "../../assets/logo-white - 1.png";
import bgImage from "../../assets/ambient-studio.png";

interface IntroSectionProps {
  scrollToStore: () => void;
  homeRef: RefObject<HTMLDivElement | null>;
}

const IntroSection: React.FC<IntroSectionProps> = ({
  scrollToStore,
  homeRef,
}) => {
  return (
    <div
      ref={homeRef}
      className="hero relative h-screen-h flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0">
        <div className="overlay bg-black/65 absolute inset-0"></div>
        <div className="background-video h-full w-full">
          <img
            className="w-full h-full object-cover"
            src={bgImage}
            alt="Ambient studio"
          />
        </div>
      </div>

      <div
        className="heading relative text-center w-[md] flex flex-col items-center px-4 md:px-8 text-white/90 my-28
      "
      >
        <div className="flex items-center gap-2 mb-10 backdrop-blur-sm">
          <div className="font-trap xs:text-lg md:text-xl lg:text-2xl font-medium">
            Welcome to
          </div>
          <img className="xs:w-[72px] md:w-24" src={logo} alt="" />
        </div>
        <h1 className="font-trap xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white/90 backdrop-blur-sm">
          Find Your Sound.
          <br /> Own The Sound.
          <br /> Make Hits.
        </h1>
        <h3 className="font-trap xs:w-80 md:w-3/4 xs:text-sm sm:text-base md:text-lg xl:text-xl mt-4 backdrop-blur-sm">
          Pour your heart out with our Mind-crafted collection of high-quality
          beats.
        </h3>
      </div>

      <div className="shop-button relative border-2 border-platinum/70 text-xl rounded-md text-white font-normal hover:bg-white/10 backdrop-blur-sm">
        <button
          onClick={scrollToStore}
          className="py-3 xs:px-24 sm:px-32 md:px-30 lg:px-12 font-rethink whitespace-nowrap"
        >
          Get Your Sound
        </button>
      </div>
    </div>
  );
};

export default IntroSection;
