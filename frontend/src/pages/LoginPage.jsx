import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import { LockIcon, MailIcon, LoaderIcon, LogInIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-900 font-sans">
      {/* Set the width on this wrapper */}
      <div className="w-full max-w-5xl">
        <BorderAnimatedContainer>
          <div className="relative w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="w-full flex flex-col md:flex-row-reverse">
              
              {/* FORM COLUMN - RIGHT SIDE */}
              <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gray-800">
                <div className="w-full max-w-md mx-auto">
                  <div className="text-center mb-10">
                    <LogInIcon className="w-14 h-14 mx-auto text-indigo-400 mb-4" />
                    <h2 className="text-3xl font-extrabold text-white mb-2">Welcome Back!</h2>
                    <p className="text-gray-400">Sign in to continue to your account.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* EMAIL INPUT */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          placeholder="johndoe@gmail.com"
                        />
                      </div>
                    </div>

                    {/* PASSWORD INPUT */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer p-1"
                        >
                          {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-center transition-all transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                      type="submit"
                      disabled={isLoggingIn}
                    >
                      {isLoggingIn ? <LoaderIcon className="w-5 h-5 mx-auto animate-spin" /> : "Sign In"}
                    </button>
                  </form>

                  <div className="mt-8 text-center">
                    <p className="mb-3">
                      <Link
                        to="/forgot-password"
                        className="font-medium text-indigo-400 hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </Link>
                    </p>
                    <p className="text-gray-400">
                      Don't have an account?{" "}
                      <Link to="/signup" className="font-medium text-indigo-400 hover:underline cursor-pointer">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* ILLUSTRATION COLUMN - LEFT SIDE */}
              <div className="hidden md:w-1/2 md:flex items-center justify-center p-10 bg-gray-900/30">
                <div className="text-center">
                  <img
                    src="/login.png"
                    alt="Login Illustration"
                    className="w-full max-w-sm h-auto object-contain mx-auto mb-8"
                  />
                  <h3 className="text-2xl font-bold text-white mb-4">Access Your World</h3>
                  <p className="text-gray-400 max-w-xs mx-auto mb-6">
                    Securely log in to manage your account and access all features.
                  </p>
                  <div className="flex justify-center gap-3">
                    <span className="bg-gray-700/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600">Secure</span>
                    <span className="bg-gray-700/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600">Fast</span>
                    <span className="bg-gray-700/50 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-600">Reliable</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
