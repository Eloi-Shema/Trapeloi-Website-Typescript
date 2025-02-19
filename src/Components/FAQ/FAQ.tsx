import React, { useState } from "react";
import "./FAQ.css";
import arrow from "../../assets/icons/up-icon.png";
import { motion } from "framer-motion";

interface FAQItemsTypes {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const fAQData: FAQItemsTypes[] = [
    {
      id: 1,
      question: "How do I buy a beat?",
      answer:
        'Purchasing beats is simple! Browse our beat store collection, select the beat to your taste, and click the "Add to cart" button. You\'ll receive instant access to your download.',
    },
    {
      id: 2,
      question: "What is licensing?",
      answer:
        "Licensing is the legal permission to use a beat for your projects. Each beat comes with a specific license that outlines how you can use it. Make sure to read the terms before purchasing.",
    },
    {
      id: 3,
      question: "Can I use beats commercially?",
      answer:
        "Yes, you can use our beats commercially depending on the license you choose. Ensure you select the appropriate license for your intended use. Always check the details to avoid any issues.",
    },
    {
      id: 4,
      question: "What if I need help?",
      answer:
        "If you have any questions or need assistance, feel free to reach out through my contact page. I am here to help you navigate your purchases. Your satisfaction is my victory!",
    },
    {
      id: 5,
      question: "Are there refunds available?",
      answer:
        "Due to the digital nature of the beat, Refunds are not applicable once a beat has been downloaded. Please ensure you are certain before making a purchase. If you encounter issues, contact me for support.",
    },
  ];

  const [collapsedStates, setCollapsedStates] = useState<
    Record<number, boolean>
  >({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleCollapse = (id: number): void => {
    setCollapsedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      {fAQData.map((item) => (
        <div key={item.id} className="xs:w-full md:w-[47.95rem] mb-3">
          <hr className="opacity-60" />
          <div
            className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
            onClick={() => toggleCollapse(item.id)}
          >
            <h2 className="font-semibold">{item.question}</h2>
            <img
              className={`${
                collapsedStates[item.id] ? "rotate-180" : "rotate-0"
              } w-4 -mt-1 invert transition-all duration-500`}
              src={arrow}
              alt="toggle arrow"
            />
          </div>
          <p
            className={`${
              collapsedStates[item.id]
                ? "max-h-0 opacity-0"
                : "max-h-32 opacity-100"
            } text-sm text-white/70 transition-all duration-300`}
          >
            {item.answer}
          </p>
        </div>
      ))}

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
