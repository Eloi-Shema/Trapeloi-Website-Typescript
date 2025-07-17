import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiService } from "../../services/auth.api.service";
import logo from "../../assets/logo-white.png";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const ResetPassword = () => {
  useDocumentTitle("Reset Password • Trapeloi");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setIsLoading(true);

    try {
      await apiService.resetPassword(token, password);
      setIsSuccess(true);

      // Redirect to login after 10 seconds
      setTimeout(() => {
        navigate("/login");
      }, 10000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="py-5 text-3xl font-medium text-gray-900">
              Your password is reset!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You can now log in with your new password.
            </p>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 group"
            >
              Go to Login
              <ArrowRight className="w-4 h-4 ml-2 duration-200 group-hover:ml-3 transistion-all" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const passwordStrength =
    password.length > 0 ? (
      <div>
        <div className="flex space-x-1">
          <div
            className={`h-1 w-1/4 rounded ${
              password.length >= 8 ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              /(?=.*[a-z])/.test(password) ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              /(?=.*[A-Z])/.test(password) ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-1 w-1/4 rounded ${
              /(?=.*\d)/.test(password) ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        </div>
        <p className="mt-1 text-xs text-gray-600">
          Must contain: 8+ characters, uppercase, lowercase, and number
        </p>
      </div>
    ) : null;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="Trapeloi Logo"
              className="w-40 py-5 invert opacity-90"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-medium text-center text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your new password below
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black transition-all duration-300"
                />
                <label
                  htmlFor="password"
                  className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                >
                  Enter New Password
                </label>
                <button
                  type="button"
                  className="absolute right-0 flex items-center pr-3 top-1/4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              {passwordStrength}
            </div>

            <div>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black transition-all duration-300"
                  placeholder=""
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  className="absolute right-0 flex items-center pr-3 top-1/4"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 border border-red-200 rounded-md bg-red-50">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Reset password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
