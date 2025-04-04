import React, { useState } from "react";
import arrow from "../../assets/icons/arrow.svg";
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
    <div className="flex flex-col items-center justify-self-center w-full my-10">
      <h1 className="text-4xl font-trap font-bold py-5 dark:text-white text-black">
        FAQs
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center justify-self-center px-5 dark:bg-black bg-platinum"
      >
        <div className="flex flex-col items-center mb-20">
          <p className="text-sm text-center dark:text-white/80 text-black">
            Find answers to your questions about purchasing beats, licensing,
            and how to use them.
          </p>
        </div>

        {fAQData.map((item) => (
          <div
            key={item.id}
            className="xs:w-full lg:max-w-screen-lg md:px-5 mb-3"
          >
            <hr className="opacity-60 dark:invert-0 invert" />
            <div
              className="flex items-center justify-between py-6 opacity-90 cursor-pointer"
              onClick={() => toggleCollapse(item.id)}
            >
              <h2 className="font-semibold dark:text-white text-black">
                {item.question}
              </h2>
              <img
                className={`${
                  collapsedStates[item.id] ? "rotate-180" : "rotate-0"
                } w-4 -mt-1 dark:invert transition-all duration-500`}
                src={arrow}
                alt="toggle arrow"
              />
            </div>
            <p
              className={`${
                collapsedStates[item.id]
                  ? "max-h-0 opacity-0"
                  : "max-h-32 opacity-100"
              } text-sm dark:text-white text-black transition-all duration-300`}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;
