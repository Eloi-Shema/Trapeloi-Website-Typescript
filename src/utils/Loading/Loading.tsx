import { motion } from "framer-motion";
import logo from "../../assets/logo-white.png";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="dark:bg-bgBlack bg-platinum flex flex-col items-center justify-center h-screen"
    >
      <img
        className="dark:invert-0 invert w-36 mb-5 animate-pulse"
        src={logo}
        alt=""
      />
      <div className="w-[160px] h-[2px] dark:bg-bgBlack bg-platinum rounded overflow-hidden">
        <div className="loading w-[20%] h-full dark:bg-white/90 bg-black"></div>
      </div>
    </motion.div>
  );
};

export default Loading;
