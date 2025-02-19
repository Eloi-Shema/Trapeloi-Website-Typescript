import React from "react";
import "./Benefits.css";
import { motion } from "framer-motion";

const Benefits: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center px-5 py-10"
    >
      <h1 className="font-semibold text-center xs:text-2xl md:text-3xl xl:text-4xl py-8 text-white/90">
        Experience the MontBitz touch in your upcoming Music
      </h1>
      <div>
        <p className="mb-10 text-center text-white/70">
          When you collaborate with MontBitz,&nbsp;You gain &nbsp;
          <span className="royalty italic p-1">
            Life-time Royalty free access
          </span>
          &nbsp; to high-quality sound that elevates your music.
        </p>

        <div className="flex justify-between p-5">
          <div className="text-center">
            <h3 className="stats font-bold text-4xl mb-2">+100</h3>
            <p className="text-xs text-white/70">
              Beats sold to satisfied customers worldwide
            </p>
          </div>
          <div className="text-center">
            <h3 className="stats font-bold text-4xl mb-2">94%</h3>
            <p className="text-xs text-white/70">Customer satisfaction rate</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Benefits;
