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
      className="hero relative xs:h-[820px] md:h-[900px] w-screen flex flex-col items-center justify-center justify-self-center"
    >
      <div className="absolute inset-0">
        <div className="overlay dark:bg-black/70 bg-black/50 absolute inset-0"></div>
        <div className="background-video h-full w-full">
          <img
            className="w-full h-full object-cover"
            src={bgImage}
            alt="Ambient studio"
          />
        </div>
      </div>

      <div
        className="heading relative text-center flex flex-col items-center justify-center text-white/90 gap-14
      "
      >
        <div className="flex items-center gap-2 backdrop-blur-sm">
          <div className="font-trap xs:text-lg md:text-xl lg:text-2xl font-medium">
            Welcome to
          </div>
          <img className="xs:w-[72px] md:w-24" src={logo} alt="" />
        </div>
        <h1 className="font-trap xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/90">
          Find Your Sound.
          <br /> Own The Sound.
          <br /> Make Hits.
        </h1>
        <h3 className="font-trap xs:w-80 md:w-3/4 xs:text-sm sm:text-base md:text-lg xl:text-xl mt-4 backdrop-blur-sm">
          Pour your heart out with our Mind-crafted collection of high-quality
          beats.
        </h3>
        <div className="shop-button relative text-xl rounded-md text-black font-montserrat font-normal backdrop-blur-sm">
          <button
            onClick={scrollToStore}
            className="py-3 xs:px-24 md:px-30 lg:px-12 whitespace-nowrap"
          >
            Get Your Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
