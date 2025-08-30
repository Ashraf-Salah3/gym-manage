// client/src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  Bell,
  Megaphone,
  UserPlus,
  Shield,
  LogIn,
  Dumbbell,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const HomePage = () => {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleOnHover = {
    whileHover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    whileTap: { scale: 0.95 }
  };

  // Sample announcements data
  const announcements = [
    {
      id: 1,
      title: "New Equipment Arrival",
      content: "State-of-the-art cardio machines are now available!",
      date: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      title: "Holiday Schedule Update",
      content: "Modified timings during festive season. Check the notice board.",
      date: "1 day ago",
      priority: "medium"
    },
    {
      id: 3,
      title: "Free Personal Training Session",
      content: "Book your complimentary session with our certified trainers.",
      date: "3 days ago",
      priority: "normal"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10"
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
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full opacity-10"
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
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-bl from-purple-400 to-pink-500 rounded-full opacity-5"
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-4 py-20">
          <motion.div
            className="text-center max-w-6xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              variants={fadeInUp}
            >
              <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  FitLife
                </h1>
                <p className="text-gray-600 text-sm font-medium tracking-wider">GYM MANAGEMENT</p>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              variants={fadeInUp}
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FitLife
              </span>
              <br />
              Gym Management System
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Smartly manage your gym, members, and payments with our
              <span className="text-blue-600 font-semibold"> intelligent platform</span>
            </motion.p>

            {/* Quick Navigation Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
              variants={staggerChildren}
            >
              {/* Register Gym Card */}
              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Link to="/admin/register">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Register Your Gym</h3>
                    <p className="text-gray-600 mb-4">Start your journey with us. Set up your gym management system in minutes.</p>
                    <div className="flex items-center justify-center text-green-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      Get Started <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Admin Login Card */}
              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Link to="/admin/login">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Admin Login</h3>
                    <p className="text-gray-600 mb-4">Access your gym's control panel. Manage members, payments, and more.</p>
                    <div className="flex items-center justify-center text-blue-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      Admin Panel <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Member Login Card */}
              <motion.div variants={fadeInUp} {...scaleOnHover}>
                <Link to="/member/login">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 group">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                      <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Member Login</h3>
                    <p className="text-gray-600 mb-4">Access your personal dashboard. Track progress and stay updated.</p>
                    <div className="flex items-center justify-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all">
                      Member Area <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Powerful Features for{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern Gyms
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a successful fitness center, all in one intelligent platform
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {/* Feature Card 1 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 w-fit">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Member Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  Efficiently manage member profiles, track attendance, and monitor membership status with our intuitive system.
                </p>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-6 w-fit">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Payment Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamline payment processes, track dues, and generate automated invoices for seamless financial management.
                </p>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl mb-6 w-fit">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Notifications</h3>
                <p className="text-gray-600 leading-relaxed">
                  Send automated reminders for payments, renewals, and important updates to keep everyone informed.
                </p>
              </motion.div>

              {/* Feature Card 4 */}
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
              >
                <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 w-fit">
                  <Megaphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Announcements</h3>
                <p className="text-gray-600 leading-relaxed">
                  Keep your community engaged with instant announcements, updates, and important gym information.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Announcements Preview Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Latest{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Announcements
                </span>
              </h2>
              <p className="text-xl text-gray-600">Stay updated with the latest news and updates from our gym</p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full ${announcement.priority === 'high'
                        ? 'bg-red-100'
                        : announcement.priority === 'medium'
                          ? 'bg-yellow-100'
                          : 'bg-blue-100'
                      }`}>
                      <Megaphone className={`w-4 h-4 ${announcement.priority === 'high'
                          ? 'text-red-600'
                          : announcement.priority === 'medium'
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`} />
                    </div>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{announcement.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{announcement.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl">
                    <Dumbbell className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">FitLife</h3>
                    <p className="text-blue-200 text-sm">Gym Management System</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
                  Transform your fitness center with our comprehensive gym management solution.
                  Streamline operations, enhance member experience, and grow your business.
                </p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-sm text-gray-300 ml-2">Trusted by 500+ Gyms</span>
                </div>
              </div>

              {/* Contact Info Column */}
              <div>
                <h4 className="text-xl font-bold mb-6">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">123 Fitness Street, Health City</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">info@fitlife.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">24/7 Support Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Links Column */}
              <div>
                <h4 className="text-xl font-bold mb-6">Quick Access</h4>
                <div className="space-y-3">
                  <Link to="/admin/register" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Register Gym
                  </Link>
                  <Link to="/admin/login" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Admin Portal
                  </Link>
                  <Link to="/member/login" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    Member Access
                  </Link>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4" />
                    24/7 Support
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="border-t border-gray-700 mt-12 pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400">
                © 2024 FitLife Gym Management System. All rights reserved.
                <span className="text-blue-400"> Made with ❤️ for fitness enthusiasts.</span>
              </p>
            </motion.div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
