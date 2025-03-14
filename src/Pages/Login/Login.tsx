import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo-white.png";
import google from "../../assets/icons/google-icon.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<string>("Login");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="bg-image relative flex items-center justify-center h-screen z-0">
          <div className="absolute inset-0 bg-black/20 dark:bg-platinum/15 backdrop-blur-md -z-10"></div>
          <div>
            <img src="" alt="" />
          </div>
          <div className="flex flex-col items-center justify-between justify-self-center w-96 h-[640px] py-10 dark:bg-bgBlack/70 bg-platinum/80 rounded-md xs:scale-90 md:scale-100">
            <Link to="/">
              <img
                className="w-32 opacity-90 invert dark:invert-0 cursor-pointer"
                src={logo}
                alt=""
              />
            </Link>

            <div className="input-field relative flex flex-col">
              {loginState === "Login" ? (
                <></>
              ) : (
                <div className="flex flex-col">
                  <label htmlFor="username">Username</label>
                  <input type="text" placeholder="John Doe" />
                </div>
              )}

              <label htmlFor="email">Email</label>
              <input type="email" placeholder="artist@gmail.com" />
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Enter your Password" />
              {loginState === "Login" ? (
                <button
                  className="bg-perfectBlue text-white mt-2 mx-8 py-2 rounded-md hover:bg-perfectBlue/80 transition-all duration-150"
                  type="submit"
                >
                  Log in
                </button>
              ) : (
                <button
                  className="bg-perfectBlue text-white mt-2 mx-8 py-2 rounded-md hover:bg-perfectBlue/80 transition-all duration-150"
                  type="submit"
                >
                  Sign up
                </button>
              )}
            </div>

            {loginState === "Login" ? (
              <p className="text-xs -mt-4 text-black dark:text-platinum">
                New to Trapeloi?&nbsp;
                <span
                  className="text-[13px] text-black dark:text-white/80 hover:underline font-kanit cursor-pointer"
                  onClick={() => setLoginState("SignUp")}
                >
                  Sign up here
                </span>
              </p>
            ) : (
              <p className="text-xs dark:text-white/80 text-black -mt-4">
                Already have an account?&nbsp;
                <span
                  className="text-[13px] dark:text-white/80 text-black hover:underline font-kanit cursor-pointer"
                  onClick={() => setLoginState("Login")}
                >
                  Login here
                </span>
              </p>
            )}

            <p className="dark:text-white/80 text-black opacity-50">
              —————— or ——————
            </p>
            <button className="flex items-center justify-center text-sm dark:bg-platinum bg-gray-900 text-white dark:text-black py-3 px-8 rounded-md dark:hover:bg-platinum/90 hover:bg-gray-900/90 transition-all duration-150">
              Continue with Google
              <img className="w-4 ml-2" src={google} alt="" />
            </button>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Login;
