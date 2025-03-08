import React, { useState } from "react";
import "./Ratings.css";
import { ratings } from "./ratings.ts";

const Ratings: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const topRatings = ratings.slice(0, 6);
  const bottomRatings = ratings.slice(6, 12);

  return (
    <div className="w-full p-5 dark:bg-black bg-platinum">
      <h1 className="py-5 text-4xl font-bold text-center mb-14 dark:text-white text-black">
        Client Feedback
      </h1>
      <div className="relative flex overflow-hidden">
        <div className="absolute top-0 left-0 h-full xs:dark:w-16 lg:dark:w-60 xs:w-16 lg:w-28 bg-gradient-to-r dark:from-black from-platinum/90 to-transparent z-10"></div>

        <div className="absolute top-0 right-0 h-full xs:dark:w-16 lg:dark:w-60 xs:w-16 lg:w-28 bg-gradient-to-l dark:from-black from-platinum/90 to-transparent z-10"></div>

        <div className="right-to-left flex">
          {topRatings.concat(topRatings).map((rating, index) => (
            <div
              key={index}
              className="rating relative flex flex-col flex-shrink-0 w-80 h-56 p-4 mr-10 mb-14 px-3 rounded-xl dark:bg-bgBlack bg-white/60"
            >
              <p
                className={`${
                  isExpanded ? "whitespace-normal" : "comment"
                } font-semibold text-md dark:text-white text-black`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {rating.comment}
              </p>
              <div className="absolute bottom-1 text-sm">
                <img
                  className="w-10 rounded-[50%] mb-4"
                  src={rating.profile}
                  alt=""
                />
                <p className="font-medium dark:text-white text-black">
                  {rating.name}
                </p>
                <p className="dark:text-white/70 text-black/80">
                  {rating.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="absolute top-0 left-0 h-full xs:dark:w-16 lg:dark:w-60 xs:w-16 lg:w-28 bg-gradient-to-r dark:from-black from-platinum/90 to-transparent z-10"></div>

        <div className="absolute top-0 right-0 h-full xs:dark:w-16 lg:dark:w-60 xs:w-16 lg:w-28 bg-gradient-to-l dark:from-black from-platinum/90 to-transparent z-10"></div>

        <div className="left-to-right flex">
          {bottomRatings.concat(bottomRatings).map((rating, index) => (
            <div
              key={index}
              className="rating relative flex flex-col flex-shrink-0 w-80 h-56 p-4 mr-10 mb-14 px-3 rounded-xl dark:bg-bgBlack bg-white/60"
            >
              <p
                className={`${
                  isExpanded ? "whitespace-normal" : "comment"
                } font-semibold text-md dark:text-white text-black`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {rating.comment}
              </p>
              <div className="absolute bottom-1 text-sm">
                <img
                  className="w-10 rounded-[50%] mb-4"
                  src={rating.profile}
                  alt=""
                />
                <p className="font-medium dark:text-white text-black">
                  {rating.name}
                </p>
                <p className="dark:text-white/70 text-black/80">
                  {rating.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
