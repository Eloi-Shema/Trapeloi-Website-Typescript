import React from "react";
import "./Newsletter.css";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-5"
    >
      <div className="text-center">
        <h1 className="xs:text-3xl md:text-4xl font-bold py-5">
          Get Your Custom Beat
        </h1>
        <p className="text-sm mb-10 max-w-screen-md text-white/80">
          Connect with me for personalized beats and music production services
          tailored to your unique taste
        </p>
      </div>
      <div className="flex xs:flex-col md:flex-row items-center justify-center py-4">
        <input
          className="w-80 p-3 md:mr-5 xs:mb-4 md:mb-0 rounded-md text-white outline-none bg-white/10 border-2 border-white/50 focus:bg-transparent"
          type="text"
          placeholder="example@mail.com"
        />
        <button className="xs:w-32 md:w-28 border-2 border-white/50 px-4 py-3 rounded-md hover:bg-white/10 transition-all duration-150 font-montserrat">
          Sign Up
        </button>
      </div>
      <p className="text-xs text-center text-white/70 font-montserrat">
        By clicking Sign Up you're confirming that you agree with our&nbsp;
        <span className="text-white hover:underline cursor-pointer">
          Terms and Conditions
        </span>
        .
      </p>
    </motion.div>
  );
};

export default Newsletter;
