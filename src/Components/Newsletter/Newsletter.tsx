import React from "react";
import "./Newsletter.css";
import { motion } from "framer-motion";

const Newsletter: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-5 dark:bg-black bg-platinum/90"
    >
      <div className="text-center">
        <h1 className="xs:text-3xl md:text-4xl font-bold dark:text-platinum text-black py-5">
          Get Your Custom Beat
        </h1>
        <p className="text-sm mb-10 max-w-screen-md dark:text-platinum text-black">
          Connect with me for personalized beats and music production services
          tailored to your unique taste
        </p>
      </div>
      <div className="flex xs:flex-col md:flex-row items-center justify-center py-4">
        <input
          className="w-80 p-3 md:mr-5 xs:mb-4 md:mb-0 rounded-md dark:text-white text-black outline-none dark:bg-white/15 bg-black/5 border-2 dark:border-white/50 border-gray-700/50 focus:bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400"
          type="email"
          placeholder="example@mail.com"
        />
        <button className="xs:w-32 md:w-28 bg-black/90 dark:bg-platinum/90 dark:text-black text-white px-4 py-3 rounded-md transition-all duration-150 font-montserrat font-medium">
          Sign Up
        </button>
      </div>
      <p className="text-xs text-center dark:text-white/70 text-black/70 font-montserrat">
        By clicking Sign Up you're confirming that you agree with our&nbsp;
        <span className="dark:text-white text-black hover:underline cursor-pointer">
          Terms and Conditions
        </span>
        .
      </p>
    </motion.div>
  );
};

export default Newsletter;
