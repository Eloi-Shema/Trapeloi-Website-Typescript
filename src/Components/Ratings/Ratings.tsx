import React, { useEffect, useState } from "react";
import "./Ratings.css";
import { ratings } from "./ratings.ts";

const Ratings: React.FC = () => {
  const [width, setWidth] = useState<string>("smallScreen");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = (): void => {
      const widthCheck = window.innerWidth;
      setWidth(widthCheck < 768 ? "smallScreen" : "bigScreen");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-5">
      <h1 className="py-5 text-4xl font-bold text-center mb-14">
        Client Feedback
      </h1>
      <div className="relative flex w-full overflow-hidden">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className={`${
              width === "smallScreen"
                ? "small-rating w-64 px-3"
                : "big-rating w-80 p-4"
            } relative flex flex-col flex-shrink-0 mr-10 mb-14 px-3 rounded-xl`}
          >
            <p
              className={`${
                isExpanded ? "whitespace-normal" : "comment"
              } mb-6 font-semibold text-md`}
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
              <p className="font-medium">{rating.name}</p>
              <p className="text-white/70">{rating.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;
