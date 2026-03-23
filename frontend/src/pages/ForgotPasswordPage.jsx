import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, MailIcon } from "lucide-react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useAuthStore } from "../store/useAuthStore";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { forgotPassword, isSendingResetEmail } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-900 font-sans">
      <div className="w-full max-w-xl">
        <BorderAnimatedContainer>
          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden p-10">
            <div className="text-center mb-8">
              <MailIcon className="w-14 h-14 mx-auto text-indigo-400 mb-4" />
              <h2 className="text-3xl font-extrabold text-white mb-2">Forgot Password?</h2>
              <p className="text-gray-400">
                Enter your email and we will send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
              </div>

              <button
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                type="submit"
                disabled={isSendingResetEmail}
              >
                {isSendingResetEmail ? (
                  <LoaderIcon className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-medium text-indigo-400 hover:underline cursor-pointer"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
