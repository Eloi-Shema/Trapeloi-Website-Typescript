import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo black.png";
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
          <div className="absolute inset-0 bg-gray-500/30 -z-10"></div>
          <div>
            <img src="" alt="" />
          </div>
          <div className="flex flex-col items-center justify-between justify-self-center w-96 h-[640px] py-10 bg-bgBlack/90 rounded-md xs:scale-90 md:scale-100">
            <Link to="/">
              <img
                className="w-52 opacity-90 invert cursor-pointer"
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
                  className="border-2 border-white/70 mt-2 mx-8 py-2 rounded-md hover:bg-white/10 transition-all duration-150"
                  type="submit"
                >
                  Log in
                </button>
              ) : (
                <button
                  className="border-2 border-white/70 mt-2 mx-8 py-2 rounded-md hover:bg-white/10 transition-all duration-150"
                  type="submit"
                >
                  Sign up
                </button>
              )}
            </div>

            {loginState === "Login" ? (
              <p className="text-xs -mt-4">
                New to MontBitz?&nbsp;
                <span
                  className="text-[13px] text-white/80 hover:text-white font-kanit cursor-pointer"
                  onClick={() => setLoginState("SignUp")}
                >
                  Sign up here
                </span>
              </p>
            ) : (
              <p className="text-xs -mt-4">
                Already have an account?&nbsp;
                <span
                  className="text-[13px] text-white/80 hover:text-white font-kanit cursor-pointer"
                  onClick={() => setLoginState("Login")}
                >
                  Login here
                </span>
              </p>
            )}

            <p className="opacity-50">—————— or ——————</p>
            <button className="flex items-center justify-center text-sm py-3 px-8 border border-white/70 rounded-md hover:bg-white/10 transition-all duration-150">
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
          className="bg-bgBlack flex flex-col items-center justify-center h-screen"
        >
          <img
            className="invert xs:w-56 lg:w-72 mb-5 animate-pulse"
            src={logo}
            alt=""
          />
          <div className="xs:w-[160px] lg:w-[200px] h-[2px] bg-bgBlack rounded overflow-hidden">
            <div className="loading w-[20%] h-full bg-white/90"></div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Login;
