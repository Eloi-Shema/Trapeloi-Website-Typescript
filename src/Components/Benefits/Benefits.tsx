import React, { useEffect, useState } from "react";
import "./Benefits.css";
import { motion } from "framer-motion";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YoutubeIcon,
  TidalIcon,
  SoundcloudIcon,
} from "../../utils/icons/icons";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Benefits: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [animCount, setAnimCount] = useState(false);

  useEffect(() => {
    if (inView) setAnimCount(true);
  }, [inView]);

  return (
    <div className="relative w-full h-full">
      <h1 className="py-10 font-bold text-center text-black font-trap xs:text-3xl md:text-4xl dark:text-platinum">
        Unlimited streams on
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="z-10 flex flex-col items-center justify-center"
      >
        <div className="flex flex-wrap items-center w-full mb-10 xs:flex-col md:flex-row justify-evenly justify-self-center md:gap-10">
          <SpotifyIcon />
          <AppleMusicIcon />
          <YoutubeIcon />
          <TidalIcon />
          <SoundcloudIcon />
        </div>
        <div className=" relative flex flex-col items-center justify-center justify-self-center max-w-[850px] p-10">
          <div className="absolute inset-0 xs:dark:bg-bgBlack md:dark:bg-perfectBlue/15 bg-white animate-pulse rounded-t-[40px] "></div>
          <div className="z-10 ">
            <p className="px-5 mb-20 text-center text-black xs:text-base md:text-xl dark:text-platinum">
              With&nbsp;
              <span className="font-extrabold text-black dark:text-white">
                Trapeloi
              </span>
              &nbsp; beats, You have Full Control. You can use any beat on this
              store for both personal and commercial use with &nbsp;
              <span className="royalty">Unlimited</span>
              &nbsp; streams and distribution.
            </p>

            <div className="flex justify-between p-5">
              <div className="text-center xs:w-40 md:w-72 ">
                <h3 className="mb-2 font-bold stats font-trap xs:text-4xl md:text-5xl lg:text-6xl">
                  {animCount && (
                    <CountUp
                      start={0}
                      end={30}
                      duration={2.5}
                      prefix="+"
                      scrollSpyDelay={500}
                      className="stats"
                    />
                  )}
                </h3>
                <p className="text-black xs:text-xs md:text-base dark:text-white/70">
                  Beats sold to satisfied customers worldwide
                </p>
              </div>
              <div ref={ref} className="text-center xs:w-40 md:w-72">
                <h3 className="mb-2 font-bold stats font-montserrat xs:text-4xl md:text-5xl lg:text-6xl">
                  {animCount && (
                    <CountUp
                      start={0}
                      end={100}
                      duration={3}
                      suffix="%"
                      scrollSpyDelay={500}
                      style={{ fontFamily: "Montserrat" }}
                      className="stats"
                    />
                  )}
                </h3>
                <p className="text-black xs:text-xs md:text-base dark:text-white/70">
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
