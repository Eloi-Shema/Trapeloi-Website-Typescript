import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo-white - 1.png";
import bgImage from "../../assets/studio.jpg";
import google from "../../assets/icons/google.svg";
import { Link } from "react-router-dom";
import Loading from "../../utils/Loading/Loading";
import showPasswordIcon from "../../assets/icons/eye-on.svg";
import hidePasswordIcon from "../../assets/icons/eye-off.svg";

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<string>("Login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative flex items-center justify-center h-screen">
          <div className="absolute inset-0">
            <div className="bg-black/50 absolute inset-0 z-10"></div>
            <div className="h-full w-full">
              <img
                className="w-full h-full object-cover grayscale"
                src={bgImage}
                alt="Ambient studio"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between justify-self-center w-96 h-[640px] py-10 bg-platinum rounded-md z-20">
            <div className="flex items-center text-2xl text-black  font-bold">
              {loginState === "Login" ? (
                <p className="font-montserrat">Sign In to&nbsp;</p>
              ) : (
                <p className="font-montserrat">Sign Up to&nbsp;</p>
              )}
              <Link to="/">
                <img
                  className="w-24 mt-1 opacity-90 invert cursor-pointer"
                  src={logo}
                  alt=""
                />
              </Link>
            </div>

            <div className="flex flex-col gap-5 w-full px-4">
              {loginState === "Login" ? (
                <></>
              ) : (
                <div className="relative flex flex-col">
                  <input
                    type="text"
                    id="username"
                    autoComplete="name"
                    placeholder=""
                    className="peer w-full bg-black/5 px-3 pt-5 pb-2 mb-4 text-black rounded-lg placeholder:bg-red-300 border-b-2 border-black/50  outline-none autofill:bg-black autofill:text-black transition-all duration-300"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 "
                  >
                    Username
                  </label>
                </div>
              )}

              <div className="relative flex flex-col">
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder=""
                  className="peer w-full bg-black/5 px-3 pt-5 pb-2 mb-4 text-black  rounded-lg border-b-2 border-black/50  outline-none  transition-all duration-300"
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4  peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500 "
                >
                  Email
                </label>
              </div>

              <div className="relative flex flex-col">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=""
                  className="peer w-full bg-black/5 px-3 pt-5 pb-2 mb-4 rounded-lg text-black border-b-2 border-black/50  outline-none transition-all duration-300"
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-500"
                >
                  Password
                </label>

                <button
                  onClick={handleShowPassword}
                  className="absolute right-0 top-5 mr-3 opacity-60"
                >
                  {showPassword ? (
                    <img src={hidePasswordIcon} alt="" className="w-4" />
                  ) : (
                    <img src={showPasswordIcon} alt="" className="w-4" />
                  )}
                </button>
              </div>
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
              <p className="text-xs -mt-4 text-black">
                New to Trapeloi?&nbsp;
                <span
                  className="text-[13px] text-black dark:text-black hover:underline font-kanit cursor-pointer"
                  onClick={() => setLoginState("SignUp")}
                >
                  Sign up here
                </span>
              </p>
            ) : (
              <p className="text-xs text-black -mt-4">
                Already have an account?&nbsp;
                <span
                  className="text-[13px] text-black dark:text-black hover:underline font-kanit cursor-pointer"
                  onClick={() => setLoginState("Login")}
                >
                  Login here
                </span>
              </p>
            )}

            <div className="xs:w-1/2 md:w-3/4 flex items-center gap-2 opacity-70">
              <div className="h-px flex-1 bg-gray-600 "></div>
              <span className="text-xs text-gray-600 dark:text-gray-600">
                Or Continue with
              </span>
              <div className="h-px flex-1 bg-gray-600 "></div>
            </div>

            <button className="flex items-center justify-center text-sm  bg-gray-900 text-white py-3 px-8 rounded-md  hover:bg-gray-900/90 transition-all duration-150">
              Continue with Google
              <img className="w-4 ml-2" src={google} alt="" />
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Login;
