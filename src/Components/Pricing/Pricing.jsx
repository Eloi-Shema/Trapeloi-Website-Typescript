import React from "react";
import "./Pricing.css";
import premium_icon from "../../assets/icons/premium.png";
import { motion } from "framer-motion";

const Pricing = ({ pricingRef }) => {
  return (
    <div ref={pricingRef}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-8"
      >
        <h1 className="text-center text-4xl font-bold mb-14">Track Plans</h1>
        <div className="flex xs:flex-col md:flex-row flex-wrap items-center justify-evenly md:px-32">
          <div className="w-72 border border-gray-400 rounded-md p-6 mr-5 mb-10">
            <h3 className="font-semibold text-xl opacity-80 text-center mb-4">
              Non-Exclusive
            </h3>
            <h3 className="font-semibold text-4xl text-center mb-6">Free</h3>
            <ul className="list py-5 mb-5 leading-10">
              <li>
                <span className="text-green-600">&#10004;</span> MP3
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> WAV Track
              </li>
              <li className="text-white/70">
                <span className="text-red-600">&#10006;</span> Stem Tracks
              </li>
              <li className="text-white/70">
                <span className="text-red-600">&#10006;</span> No Producer Tag
              </li>
              <li className="text-white/70">
                <span className="text-red-600">&#10006;</span> Non-Exclusive
                rights
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> Royalty Free
              </li>
            </ul>
            <button className="flex justify-self-center bg-white/90 hover:bg-white/80 text-black py-2 px-[64px] rounded-md font-montserrat font-semibold whitespace-nowrap transition-all duration-150">
              Learn More
            </button>
          </div>

          <div className="recommended-plan relative w-72 rounded-md p-6 mr-5 mb-10">
            <img
              className="absolute -top-7 -left-[34px] w-16"
              src={premium_icon}
              alt=""
            />
            <h3 className="font-semibold text-xl opacity-80 text-center mb-4">
              Exclusive
            </h3>
            <div className="flex items-center justify-self-center mb-6">
              <p className="font-kanit font-semibold mr-2 text-white/70">
                up to
              </p>
              <h3 className="font-semibold text-4xl text-center">$149.99</h3>
            </div>
            <ul className="list py-5 mb-5 leading-10">
              <li>
                <span className="text-green-600">&#10004;</span> MP3
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> WAV track
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> stem tracks
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> No Producer Tag
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> Exclusive
                rights
              </li>
              <li>
                <span className="text-green-600">&#10004;</span> Royalty Free
              </li>
            </ul>
            <button className="flex justify-self-center bg-goldYellow/90 hover:bg-goldYellow text-black py-2 px-[64px] rounded-md font-montserrat font-semibold whitespace-nowrap transition-all duration-150">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
