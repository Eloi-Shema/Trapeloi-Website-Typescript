import React, { useState } from "react";
import "./FAQ.css";
import arrow from "../../assets/icons/up-icon.png";
import { motion } from "framer-motion";

const FAQ = () => {
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(true);
  const [isCollapsed3, setIsCollapsed3] = useState(true);
  const [isCollapsed4, setIsCollapsed4] = useState(true);
  const [isCollapsed5, setIsCollapsed5] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-self-center max-w-screen-md p-5"
    >
      <div className="flex flex-col items-center mb-24">
        <h1 className="text-4xl font-bold py-5">FAQs</h1>
        <p className="text-sm text-white/80 text-center">
          Find answers to your questions about purchasing beats, licensing, and
          how to use them.
        </p>
      </div>

      <div className="xs:w-full md:w-[47.95rem] mb-3">
        <hr className="opacity-60" />
        <div
          className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
          onClick={() => setIsCollapsed1(!isCollapsed1)}
        >
          <h2 className="font-semibold">How do I buy a beat?</h2>
          <img
            className={`${
              isCollapsed1 ? "rotate-180" : "rotate-0"
            } w-4 -mt-1 invert transition-all duration-500`}
            src={arrow}
            alt=""
          />
        </div>
        <p
          className={`${
            isCollapsed1 ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          } text-sm text-white/70 transition-all duration-300`}
        >
          Purchasing beats is simple! Browse our beat store collection, select
          the beat to your taste, and click the "Add to cart" button. You'll
          receive instant access to your download.
        </p>
      </div>

      <div className="xs:w-full md:w-[48rem] mb-3">
        <hr className="opacity-60" />
        <div
          className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
          onClick={() => setIsCollapsed2(!isCollapsed2)}
        >
          <h2 className="font-semibold">What is licensing?</h2>
          <img
            className={`${
              isCollapsed2 ? "rotate-180" : "rotate-0"
            } w-4 -mt-1 invert transition-all duration-500`}
            src={arrow}
            alt=""
          />
        </div>
        <p
          className={`${
            isCollapsed2 ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          } text-sm text-white/70 transition-all duration-300`}
        >
          Licensing is the legal permission to use a beat for your projects.
          Each beat comes with a specific license that outlines how you can use
          it. Make sure to read the terms before purchasing.{" "}
        </p>
      </div>

      <div className="xs:w-full md:w-[48rem] mb-3">
        <hr className="opacity-60" />
        <div
          className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
          onClick={() => setIsCollapsed3(!isCollapsed3)}
        >
          <h2 className="font-semibold">Can I use beats commercially?</h2>
          <img
            className={`${
              isCollapsed3 ? "rotate-180" : "rotate-0"
            } w-4 -mt-1 invert transition-all duration-500`}
            src={arrow}
            alt=""
          />
        </div>
        <p
          className={`${
            isCollapsed3 ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          } text-sm text-white/70 transition-all duration-300`}
        >
          Yes, you can use our beats commercially depending on the license you
          choose. Ensure you select the appropriate license for your intended
          use. Always check the details to avoid any issues.{" "}
        </p>
      </div>

      <div className="xs:w-full md:w-[48rem] mb-3">
        <hr className="opacity-60" />
        <div
          className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
          onClick={() => setIsCollapsed4(!isCollapsed4)}
        >
          <h2 className="font-semibold">What if I need help?</h2>
          <img
            className={`${
              isCollapsed4 ? "rotate-180" : "rotate-0"
            } w-4 -mt-1 invert transition-all duration-500`}
            src={arrow}
            alt=""
          />
        </div>
        <p
          className={`${
            isCollapsed4 ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          } text-sm text-white/70 transition-all duration-300`}
        >
          If you have any questions or need assistance, feel free to reach out
          through my contact page. I am here to help you navigate your
          purchases. Your satisfaction is my victory!{" "}
        </p>
      </div>

      <div className="xs:w-full md:w-[48rem] mb-3">
        <hr className="opacity-60" />
        <div
          className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
          onClick={() => setIsCollapsed5(!isCollapsed5)}
        >
          <h2 className="font-semibold">Are there refunds available?</h2>
          <img
            className={`${
              isCollapsed5 ? "rotate-180" : "rotate-0"
            } w-4 -mt-1 invert transition-all duration-500`}
            src={arrow}
            alt=""
          />
        </div>
        <p
          className={`${
            isCollapsed5 ? "max-h-0 opacity-0" : "max-h-32 opacity-100"
          } text-sm text-white/70 transition-all duration-300`}
        >
          Due to the digital nature of the beat, Refunds are not applicable once
          a beat has been downloaded. Please ensure you are certain before
          making a purchase. If you encounter issues, contact me for support.{" "}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-montserrat text-3xl font-semibold mt-5 py-5">
          Still have questions?
        </h1>
        <button className="border border-white/60 py-2 px-5 font-montserrat text-sm rounded-sm hover:bg-white/10 transition-all duration-150">
          Contact Me
        </button>
      </div>
    </motion.div>
  );
};

export default FAQ;
