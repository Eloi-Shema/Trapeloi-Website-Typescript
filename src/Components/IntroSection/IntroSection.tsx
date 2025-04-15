import React, { RefObject } from "react";
import "./IntroSection.css";
import logo from "../../assets/logo-white - 1.png";
import bgImage from "../../assets/studio.webp";
import bgImage2 from "../../assets/studio2.webp";

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
      className="hero relative h-[900px] w-screen flex flex-col items-center justify-center justify-self-center"
    >
      <div className="absolute inset-0">
        <div className="overlay dark:bg-black/70 bg-black/60 absolute inset-0"></div>
        <div className="h-full w-full">
          {/* responsive image */}
          <picture>
            <source
              srcSet={bgImage2}
              type="image/webp"
              media="(max-width: 767px)"
            />

            <source
              srcSet={bgImage}
              type="image/webp"
              media="(min-width: 768px)"
            />

            <img
              src={bgImage}
              alt="Studio image"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>
      </div>

      <div className="heading relative text-center flex flex-col items-center justify-center text-white/90 gap-10">
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
        <div className="shop-button relative bg-platinum text-xl rounded-md text-black font-montserrat font-normal backdrop-blur-sm">
          <button
            onClick={scrollToStore}
            className="py-3 xs:px-20 md:px-30 lg:px-12 whitespace-nowrap"
          >
            Get Your Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
