import React from "react";
import "./Benefits.css";
import { motion } from "framer-motion";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YoutubeIcon,
  TidalIcon,
  SoundcloudIcon,
} from "../icons/icons";
import speaker from "../../assets/speaker2.jpg";

const Benefits: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 -z-10">
        <div className="dark:bg-black/60 bg-platinum/80 absolute inset-0 backdrop-blur-lg"></div>
        <img
          src={speaker}
          alt="Speaker"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center z-10"
      >
        <div>
          <div>
            <h1 className="font-semibold text-center xs:text-3xl md:text-4xl dark:text-platinum text-black py-8">
              Unlimited streams on
            </h1>
            <div className="flex flex-wrap xs:flex-col md:flex-row justify-evenly items-center justify-self-center w-full mx-28 mb-20 px-10">
              <SpotifyIcon />
              <AppleMusicIcon />
              <YoutubeIcon />
              <TidalIcon />
              <SoundcloudIcon />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center justify-self-center max-w-[850px] dark:bg-black/70 bg-white/70 p-10 rounded-tl-[80px] rounded-tr-[80px]">
            <div>
              <p className="mb-20 px-5 xs:text-base md:text-xl text-center dark:text-platinum text-black">
                when You Get{" "}
                <span className="font-extrabold dark:text-white text-black">
                  Trapeloi
                </span>{" "}
                beats, &nbsp;You have full control over it. You can use it
                commercially with &nbsp;
                <span className="royalty italic p-1">
                  Life-time Royalty free
                </span>{" "}
                streams and distribution.
              </p>

              <div className="flex justify-between p-5">
                <div className="text-center xs:w-40 md:w-72 ">
                  <h3 className="stats font-montserrat font-bold sm:text-4xl md:text-5xl lg:text-6xl mb-2">
                    +30
                  </h3>
                  <p className="xs:text-xs md:text-base dark:text-white/70 text-black">
                    Beats sold to satisfied customers worldwide
                  </p>
                </div>
                <div className="text-center xs:w-40 md:w-72">
                  <h3 className="stats font-bold font-montserrat sm:text-4xl md:text-5xl lg:text-6xl mb-2">
                    100%
                  </h3>
                  <p className="xs:text-xs md:text-base dark:text-white/70 text-black">
                    Customer satisfaction rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Benefits;
