import React from "react";
import "./IntroSection.css";
import drum from "../../assets/drum.mp4";

const IntroSection = ({ scrollToStore, homeRef }) => {
  return (
    <div
      ref={homeRef}
      className="hero relative h-screen-h flex flex-col items-center justify-center bg-black text-white"
    >
      <div className="absolute inset-0 z-0">
        <div className="overlay xs:bg-black/60 md:bg-black/40 absolute inset-0"></div>
        <div className="background-video h-full w-full">
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={drum} />
          </video>
        </div>
      </div>

      <div className="heading relative text-center w-[md] flex flex-col items-center px-4 md:px-8 m-20">
        <h2 className="xs:text-md md:text-xl lg:text-2xl font-medium">
          Welcome to MontBitz
        </h2>
        <h1 className="xs:text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-bold mb-8">
          The Hub Of Your <br /> Potential Hits
        </h1>
        <h3 className="xs:w-80 md:w-3/4 xs:text-xs sm:text-sm md:text-base xl:text-lg mt-4 font-light">
          Unleash your musical creativity with our mind-crafted collection of
          high-quality beats made for your rap and Hip-Hop bangs.
        </h3>
      </div>

      <button
        onClick={scrollToStore}
        className="shop-button relative z-10 py-3 xs:px-28 sm:px-32 md:px-30 lg:px-12 text-xl rounded-lg text-black font-normal whitespace-nowrap"
      >
        Shop Now
      </button>
    </div>
  );
};

export default IntroSection;
