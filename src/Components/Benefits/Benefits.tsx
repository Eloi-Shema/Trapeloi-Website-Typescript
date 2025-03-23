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

const Benefits: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <h1 className="font-trap font-bold text-center xs:text-3xl md:text-4xl dark:text-platinum text-black py-10">
        Unlimited streams on
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center justify-center z-10"
      >
        <div className="flex flex-wrap xs:flex-col md:flex-row justify-evenly items-center justify-self-center w-full mb-10 md:gap-10">
          <SpotifyIcon />
          <AppleMusicIcon />
          <YoutubeIcon />
          <TidalIcon />
          <SoundcloudIcon />
        </div>
        <div className="flex flex-col items-center justify-center justify-self-center max-w-[850px] dark:bg-perfectBlue/15 bg-white/50 p-10 rounded-lg">
          <div>
            <p className="mb-20 px-5 xs:text-base md:text-xl text-center dark:text-platinum text-black">
              when You Get&nbsp;
              <span className="font-extrabold dark:text-white text-black">
                Trapeloi
              </span>
              &nbsp; beats, You have Full Control. You can use it commercially
              with &nbsp;
              <span className="royalty">Unlimited</span>
              &nbsp; streams and distribution.
            </p>

            <div className="flex justify-between p-5">
              <div className="text-center xs:w-40 md:w-72 ">
                <h3 className="stats font-trap font-bold xs:text-4xl md:text-5xl lg:text-6xl mb-2">
                  +30
                </h3>
                <p className="xs:text-xs md:text-base dark:text-white/70 text-black">
                  Beats sold to satisfied customers worldwide
                </p>
              </div>
              <div className="text-center xs:w-40 md:w-72">
                <h3 className="stats font-bold font-montserrat xs:text-4xl md:text-5xl lg:text-6xl mb-2">
                  100 %
                </h3>
                <p className="xs:text-xs md:text-base dark:text-white/70 text-black">
                  Customer satisfaction rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Benefits;
