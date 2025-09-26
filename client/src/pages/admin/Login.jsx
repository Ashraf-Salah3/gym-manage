// client/src/pages/admin/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  Loader2,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${BackendUrl}/admin/login`,
        { email, password },
        { withCredentials: true }
      );

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-bl from-indigo-400 to-purple-500 rounded-full opacity-5"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FitLife
              </h1>
              <p className="text-gray-600 text-xs font-medium tracking-wider">
                ADMIN LOGIN
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Access your gym management dashboard</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-white/70 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Lock className="w-5 h-5" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 bg-white/70 backdrop-blur-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {/* Admin Features Preview */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
            >
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Admin Dashboard Features:
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-3 h-3 text-blue-500" />
                  Member Management
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-3 h-3 text-blue-500" />
                  Payment Tracking
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-3 h-3 text-blue-500" />
                  Announcements
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-3 h-3 text-blue-500" />
                  Analytics & Reports
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Access Admin Panel
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Member Login Link */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-4 border-t border-gray-200"
            >
              <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                Not an admin?{" "}
                <Link
                  to="/member/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                >
                  Login as member
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Security Indicators */}
        <motion.div variants={itemVariants} className="mt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Admin Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Encrypted Data</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Access */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-xs text-gray-500 mb-3">
            Need help? Contact support
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors hover:underline"
            >
              ← Back to Home
            </Link>
            <Link
              to="/admin/register"
              className="text-xs text-blue-600 hover:text-blue-700 transition-colors hover:underline"
            >
              Register New Gym →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
