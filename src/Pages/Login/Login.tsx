import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/logo-white - 1.png";
import bgImage from "../../assets/studio3.webp";
import google from "../../assets/icons/google.svg";
import google1 from "../../assets/icons/google1.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../utils/Loading/Loading";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useAuth } from "../../contexts/Auth/AuthContext";
import { LoginData, RegisterData } from "../../services/auth.api.service";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext";

const Login: React.FC = () => {
  const { currentBeat } = useAudioPlayer();

  useDocumentTitle(
    `${
      currentBeat ? "Now Playing • " + currentBeat?.title : "Login • Trapeloi"
    }`
  );

  const [loginState, setLoginState] = useState<"Login" | "Register">("Login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userName: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { login, register, loginWithGoogle, authLoading, error, clearError } =
    useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, []);

  const manageShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const manageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user starts typing
    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const clearFormData = () => {
    setFormData({ email: "", password: "", userName: "" });
  };

  const validateFields = (): boolean => {
    const errors: Record<string, string> = {};

    if (loginState === "Register") {
      if (!formData.userName) {
        errors.userName = "Username is required";
      } else if (formData.userName.length > 50) {
        errors.userName = "Username must be less than 50 characters";
      } else if (formData.userName.length < 3) {
        errors.userName = "Username must be at least 3 characters";
      }
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (loginState === "Register") {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
          formData.password
        )
      ) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      }
    }

    if (loginState === "Login") {
      if (!formData.password) {
        errors.password = "Password is required";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const manageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) return;

    try {
      if (loginState === "Login") {
        await login({
          email: formData.email,
          password: formData.password,
        } as LoginData);
        const origin = location.state?.from?.pathname || "/";
        navigate(origin);
      } else {
        await register({
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        } as RegisterData);

        navigate("/");
      }
    } catch (err) {}
  };

  const manageGoogleLogin = () => {
    loginWithGoogle();
  };

  const minLentgh = formData.password.length >= 8;
  const hasUppercase = /(?=.*[A-Z])/.test(formData.password);
  const hasLowercase = /(?=.*[a-z])/.test(formData.password);
  const hasNumber = /(?=.*\d)/.test(formData.password);
  const hasSpecialChar = /[@$!%*?&]/.test(formData.password);

  const allValid =
    minLentgh && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  const passwordStrength =
    formData.password.length > 0 && loginState === "Register" ? (
      <div>
        <div className="flex space-x-1">
          <div
            className={`h-1 w-1/4 rounded ${
              minLentgh ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              hasLowercase ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              hasUppercase ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              hasNumber ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              hasSpecialChar ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          {!allValid &&
            "Must contain: 8+ characters, uppercase, lowercase, special character and number"}
        </p>
      </div>
    ) : null;

  return (
    <>
      {isLoading ? (
        <div className="relative flex items-center justify-center h-screen">
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm"></div>
            <div className="w-full h-full">
              <img
                className="object-cover w-full h-full"
                src={bgImage}
                alt="Ambient studio"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between justify-self-center w-[500px] min-h-[650px] p-10 bg-platinum rounded-md z-20 xs:scale-90 ms: scale-100">
            <div className="flex items-center mb-5 text-2xl font-bold text-black">
              {loginState === "Login" ? (
                <p>Log In to&nbsp;</p>
              ) : (
                <p>Sign Up to&nbsp;</p>
              )}
              <Link to="/">
                <img
                  className="w-24 mt-1 cursor-pointer opacity-90 invert"
                  src={logo}
                  alt="Trapeloi Logo"
                />
              </Link>
            </div>

            <form
              onSubmit={manageSubmit}
              className="flex flex-col w-full gap-5 px-4 py-5"
            >
              {loginState === "Login" ? (
                <></>
              ) : (
                <div className="relative flex flex-col">
                  <input
                    type="text"
                    id="userName"
                    autoComplete="name"
                    placeholder=""
                    value={formData.userName}
                    onChange={manageChange}
                    required
                    className={`peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black ${
                      fieldErrors.userName
                        ? "border-red-500"
                        : "border-black/50"
                    } transition-all duration-300`}
                  />
                  <label
                    htmlFor="userName"
                    className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                  >
                    Username
                  </label>
                  {fieldErrors.userName && (
                    <div className="flex items-center gap-1 py-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <p className="text-xs text-red-600">
                        {fieldErrors.userName}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="relative flex flex-col">
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder=""
                  value={formData.email}
                  onChange={manageChange}
                  required
                  className={`peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black ${
                    error || fieldErrors.email
                      ? "border-red-500"
                      : "border-black/50"
                  } transition-all duration-300`}
                />
                <label
                  htmlFor="email"
                  className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                >
                  Email
                </label>
                {fieldErrors.email && (
                  <div className="flex items-center gap-1 py-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-xs text-red-600">{fieldErrors.email}</p>
                  </div>
                )}
              </div>

              <div className="relative flex flex-col">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder=""
                  onChange={manageChange}
                  value={formData.password}
                  required
                  className={`peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black ${
                    error || fieldErrors.password
                      ? "border-red-500"
                      : "border-black/50"
                  } transition-all duration-300`}
                />
                <label
                  htmlFor="password"
                  className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                >
                  Password
                </label>

                <button
                  type="button"
                  onClick={manageShowPassword}
                  className="absolute right-0 mr-3 top-5 opacity-60"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                {passwordStrength}
                {fieldErrors.password && (
                  <div className="flex items-center gap-1 py-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <p className="text-xs text-red-600">
                      {fieldErrors.password}
                    </p>
                  </div>
                )}
              </div>

              <button
                className="self-center w-full py-3 font-bold text-white transition-all duration-150 rounded-md font-montserrat bg-perfectBlue hover:bg-blue-800"
                type="submit"
                disabled={authLoading}
              >
                {authLoading ? (
                  <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent border-b-transparent border-l-transparent animate-spin justify-self-center" />
                ) : loginState === "Login" ? (
                  "Log in"
                ) : (
                  "Sign up"
                )}
              </button>
            </form>

            {error && (
              <div className="flex items-center self-center gap-1 mb-6 font-medium">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="w-full text-sm text-red-600 rounded-md">
                  {error === "Invalid credentials"
                    ? "Invalid email or password. Please try again."
                    : error}
                </p>
              </div>
            )}

            {loginState === "Login" && error && (
              <div className="-mt-5 text-center">
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <p className="py-4 text-xs text-black">
              {loginState === "Login" ? (
                <>
                  New here?&nbsp;
                  <span
                    className="text-[13px] text-blue-900 font-medium hover:text-blue-950 cursor-pointer"
                    onClick={() => {
                      setLoginState("Register");
                      setFieldErrors({});
                      clearError();
                      clearFormData();
                    }}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?&nbsp;
                  <span
                    className="text-[13px] text-blue-900 font-medium hover:text-blue-950 cursor-pointer"
                    onClick={() => {
                      setLoginState("Login");
                      setFieldErrors({});
                      clearError();
                      clearFormData();
                    }}
                  >
                    Login here
                  </span>
                </>
              )}
            </p>

            <div className="flex items-center gap-2 py-4 xs:w-1/2 md:w-3/4 opacity-70">
              <div className="flex-1 h-px bg-gray-600 "></div>
              <span className="text-xs text-gray-600 dark:text-gray-600">
                Or Continue with
              </span>
              <div className="flex-1 h-px bg-gray-600 "></div>
            </div>

            <button
              type="button"
              onClick={manageGoogleLogin}
              disabled={authLoading}
              className="flex items-center gap-[6px] justify-center w-48 px-8 py-3 text-sm text-white transition-all duration-300 border-2 border-gray-400 rounded-md hover:shadow-xl shadow-black"
            >
              <img className="w-5" src={google} alt="" />
              <img className="self-end w-12" src={google1} alt="" />
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
