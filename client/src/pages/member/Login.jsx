// client/src/pages/member/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Dumbbell,
  ArrowRight,
  Loader2,
  Shield,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Activity
} from "lucide-react";

const MemberLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://fitlife-gym-management-system.onrender.com/api/members/login",
        { email, password },
        { withCredentials: true }
      );

      // Save info to localStorage
      localStorage.setItem("memberEmail", res.data.member.email);
      localStorage.setItem("gymName", res.data.member.gymName);
      navigate("/member/dashboard");
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
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-full opacity-10"
          animate={{
            y: [0, 20, 0],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-bl from-pink-400 to-purple-500 rounded-full opacity-5"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
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
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FitLife
              </h1>
              <p className="text-gray-600 text-xs font-medium tracking-wider">MEMBER PORTAL</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600">Access your fitness journey dashboard</p>
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
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 bg-white/70 backdrop-blur-sm"
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
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 bg-white/70 backdrop-blur-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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

            {/* Member Features Preview */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100"
            >
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Your Member Dashboard:
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Target className="w-3 h-3 text-purple-500" />
                  Task Management
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp className="w-3 h-3 text-purple-500" />
                  Progress Tracking
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="w-3 h-3 text-purple-500" />
                  Smart Reminders
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Activity className="w-3 h-3 text-purple-500" />
                  Gym Updates
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  Access Member Portal
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Admin Login Link */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-4 border-t border-gray-200"
            >
              <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Are you an admin?{" "}
                <Link
                  to="/admin/login"
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
                >
                  Login as admin
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Member Benefits */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50"
        >
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-purple-600" />
            Why Members Love FitLife
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Track your fitness goals and progress effortlessly</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span>Stay updated with gym announcements and events</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Never miss a workout with smart reminders</span>
            </div>
          </div>
        </motion.div>

        {/* Security & Navigation */}
        <motion.div
          variants={itemVariants}
          className="mt-6 text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure Access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Privacy Protected</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 text-xs">
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 transition-colors hover:underline"
            >
              ← Back to Home
            </Link>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500">Need help? Contact support</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MemberLogin;
