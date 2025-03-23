import React from "react";
import "./Newsletter.css";
import { motion } from "framer-motion";

const Newsletter: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col items-center justify-center p-5 dark:bg-black bg-platinum py-10"
    >
      <div className="text-center">
        <h1 className="xs:text-3xl md:text-4xl font-trap font-bold dark:text-platinum text-black">
          Get Your Custom Beat
        </h1>
        <p className="text-sm mb-16 max-w-screen-md dark:text-platinum text-black">
          Connect with me for personalized beats and music production services
          tailored to your unique taste
        </p>
      </div>
      <button className="border-2 dark:border-white/60 border-black dark:text-white text-black py-2 px-5 font-montserrat text-sm rounded-sm hover:bg-black/5 dark:hover:bg-white/15 transition-all duration-150">
        Contact Me
      </button>
    </motion.div>
  );
};

export default Newsletter;
