import React, { RefObject } from "react";
import "./Pricing.css";
import { motion } from "framer-motion";

interface PricingProps {
  pricingRef: RefObject<HTMLDivElement | null>;
}

const Pricing: React.FC<PricingProps> = ({ pricingRef }) => {
  return (
    <div ref={pricingRef}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="py-8"
      >
        <h1 className="text-center xs:text-3xl lg:text-4xl dark:text-white text-black font-trap font-bold mb-14">
          Pricing Plans
        </h1>
        <div className="flex xs:flex-col md:flex-row flex-wrap items-center justify-evenly md:px-32">
          <div className="w-72 border-2 border-gray-400 rounded-md p-6 mr-5 mb-10 dark:bg-bgBlack/10 bg-white/20">
            <h3 className="font-semibold text-xl dark:text-platinum text-black text-center mb-4">
              Non-Exclusive
            </h3>
            <h3 className="font-semibold text-4xl dark:text-platinum text-black text-center mb-6">
              Free
            </h3>
            <ul className="list py-5 mb-5 leading-10">
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> MP3
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> WAV Track
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-red-600">&#10006;</span> STEM Tracks
              </li>

              <li className="dark:text-platinum text-black font-medium">
                <span className="text-red-600">&#10006;</span> Non-Exclusive
                rights
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> Commercial Use
              </li>
            </ul>
            <button className="flex justify-self-center dark:bg-white/90 bg-bgBlack dark:text-black text-white py-2 px-[64px] rounded-md font-montserrat font-semibold whitespace-nowrap transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="recommended-plan relative w-72 rounded-md p-6 mr-5 mb-10 dark:bg-blueGreen/10 bg-niceGreen/5">
            <h3 className="font-semibold text-xl dark:text-platinum text-black text-center mb-4">
              Exclusive
            </h3>
            <div className="flex items-center justify-self-center mb-6">
              <p className="font-kanit font-semibold mr-2 dark:text-white/70 text-black">
                up to
              </p>
              <h3 className="font-semibold text-4xl dark:text-platinum text-black text-center">
                $149.99
              </h3>
            </div>
            <ul className="list py-5 mb-5 leading-10">
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> MP3
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> WAV track
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> STEM tracks
              </li>

              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> Exclusive
                rights
              </li>
              <li className="dark:text-platinum text-black font-medium">
                <span className="text-green-600">&#10004;</span> Commercial Use
              </li>
            </ul>
            <button className="flex justify-self-center dark:bg-blueGreen/90 dark:hover:bg-blueGreen bg-niceGreen hover:bg-niceGreen/90 dark:text-black text-white py-2 px-[64px] rounded-md font-montserrat font-semibold whitespace-nowrap transition-all duration-150">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
