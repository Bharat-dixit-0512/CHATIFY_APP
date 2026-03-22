import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you are using react-router-dom

function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    // Set a professional background color and ensure the page is centered.
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-900 font-sans">
      <div className="relative w-full max-w-5xl md:h-auto h-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full flex flex-col md:flex-row">
          {/* FORM COLUMN - LEFT SIDE */}
          {/* Enhanced padding and alignment for a cleaner look. */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              {/* HEADING TEXT */}
              <div className="text-center mb-10">
                <MessageCircleIcon className="w-14 h-14 mx-auto text-indigo-400 mb-4" />
                <h2 className="text-3xl font-extrabold text-white mb-2">Create Your Account</h2>
                <p className="text-gray-400">Join our community and start your journey.</p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FULL NAME */}
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      // Updated input styling for a modern look.
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* EMAIL INPUT */}
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
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
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  className=" cursor-pointer w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-center transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <LoaderIcon className="w-5 h-5 mx-auto animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* FORM ILLUSTRATION - RIGHT SIDE */}
          {/* A more subtle and professional background for the illustration. */}
          <div className="hidden md:w-1/2 md:flex items-center justify-center p-10 bg-gray-800/50">
            <div className="text-center">
              <img
                src="/signup.png"
                alt="People using mobile devices"
                className="w-full max-w-sm h-auto object-contain mx-auto mb-8"
              />
              <h3 className="text-2xl font-bold text-white mb-4">Start Your Journey Today</h3>
              <p className="text-gray-400 max-w-xs mx-auto">
                Connect with a vibrant community and unlock exclusive features.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <span className="bg-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-full">Free</span>
                <span className="bg-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-full">Easy Setup</span>
                <span className="bg-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-full">Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;