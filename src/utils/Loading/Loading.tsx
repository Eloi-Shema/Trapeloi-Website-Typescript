import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./Loading.css";
import logo from "../../assets/logo-white.png";

const Loading = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className="dark:bg-bgBlack bg-platinum flex flex-col items-center justify-center h-screen">
      <img
        className="dark:invert-0 invert w-36 mb-5 animate-pulse"
        src={logo}
        alt=""
      />
    </div>
  );
};

export default Loading;
