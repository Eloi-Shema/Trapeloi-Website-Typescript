import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { authApiService } from "../../services/auth.api.service";
import logo from "../../assets/logo-white.png";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext";

const ForgotPassword = () => {
  const { currentBeat } = useAudioPlayer();

  useDocumentTitle(
    `${
      currentBeat
        ? "Now Playing • " + currentBeat?.title
        : "Forgot Password • Trapeloi"
    }`
  );

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authApiService.forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="mt-6 text-3xl font-medium text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              A password reset link has been sent
            </p>
            <p className="text-sm font-medium text-gray-900">{email}</p>
          </div>

          <div className="p-4 border border-blue-300 rounded-md bg-blue-50/60">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  Click the link in your email to reset your password. The link
                  will expire in 15 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
              }}
              className="text-sm font-medium text-blue-900 hover:text-blue-950"
            >
              Try a different email address
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Forgot your password?
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your email address and a link to reset your password will be
            sent to you.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full bg-black/[3%] px-3 pt-5 pb-2 mb-4 text-black rounded-lg border-b-2 border-black/50 focus:border-perfectBlue  outline-none autofill:bg-black autofill:text-black transition-all duration-300"
                  placeholder=""
                />
                <label
                  htmlFor="email"
                  className="absolute text-xs text-gray-500 transition-all left-2 top-1 peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-800 cursor-text"
                >
                  Email address
                </label>
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
                <span className="flex items-center justify-center group">
                  Send reset link
                  <ArrowRight className="w-4 h-4 mt-[2px] ml-2 group-hover:ml-3 transition-all duration-200" />
                </span>
              )}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/auth/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
