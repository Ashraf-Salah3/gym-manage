// client/src/pages/admin/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Dumbbell,
  CheckCircle,
  ArrowRight,
  Loader2
} from "lucide-react";

const AdminRegister = () => {
  const [form, setForm] = useState({
    gymName: "",
    gymAddress: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.gymName.trim()) newErrors.gymName = "Gym name is required";
    if (!form.gymAddress.trim()) newErrors.gymAddress = "Address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (form.phone && !phoneRegex.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:" + process.env.PORT + "/api/admin/register",
        form,
        { withCredentials: true }
      );

      localStorage.setItem("gymName", res.data.admin.gymName);
      localStorage.setItem("adminEmail", res.data.admin.email);
      navigate("/admin/dashboard");
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "gymName",
      label: "Gym Name",
      type: "text",
      placeholder: "Enter your gym name",
      icon: Building2
    },
    {
      name: "gymAddress",
      label: "Gym Address",
      type: "text",
      placeholder: "Enter your gym address",
      icon: MapPin
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter phone number",
      icon: Phone
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter email address",
      icon: Mail
    },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
      placeholder: "Create a strong password",
      icon: Lock
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-10"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-400 to-green-500 rounded-full opacity-10"
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
            <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                FitLife
              </h1>
              <p className="text-gray-600 text-xs font-medium tracking-wider">ADMIN PORTAL</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-2">Register Your Gym</h2>
          <p className="text-gray-600">Join thousands of successful fitness centers</p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                variants={itemVariants}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-700">
                  {field.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <field.icon className="w-5 h-5" />
                  </div>

                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-100 ${errors[field.name]
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-gray-200 focus:border-green-500'
                      } bg-white/70 backdrop-blur-sm`}
                  />

                  {field.name === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  )}
                </div>

                {errors[field.name] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {errors[field.name]}
                  </motion.p>
                )}
              </motion.div>
            ))}

            {/* Submit Error */}
            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl"
              >
                <p className="text-red-600 text-sm font-medium">{errors.submit}</p>
              </motion.div>
            )}

            {/* Benefits Preview */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
            >
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                What you'll get:
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Complete member management system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Automated payment tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  Smart notifications & reminders
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  24/7 customer support
                </li>
              </ul>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Register Your Gym
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            {/* Login Link */}
            <motion.div
              variants={itemVariants}
              className="text-center pt-4 border-t border-gray-200"
            >
              <p className="text-gray-600 text-sm">
                Already registered?{" "}
                <Link
                  to="/admin/login"
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                >
                  Login here
                </Link>
              </p>
            </motion.div>
          </form>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>500+ Gyms Trust Us</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
