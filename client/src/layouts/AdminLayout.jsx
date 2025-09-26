// client/src/layouts/AdminLayout.jsx
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Megaphone,
  LogOut,
  Dumbbell,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import Loading from "../components/Loading";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //const [token, setToken] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        await axios.get(`${BackendUrl}/auth/check-auth`, {
          withCredentials: true,
        });

        setLoading(false);
      } catch {
        setLoading(false);

        navigate("/admin/login");
      }
    };
    checkAuth();
  }, []);

  const navigationItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/members", icon: Users, label: "Manage Members" },
    { to: "/admin/payments", icon: CreditCard, label: "Payments" },
    { to: "/admin/announcements", icon: Megaphone, label: "Announcements" },
  ];

  // Only show header on /admin/dashboard
  const showHeader = location.pathname === "/admin/dashboard";
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
        transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 
        transition-transform duration-300 ease-in-out shadow-2xl
      `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-300 lg:hidden"
        >
          <X size={24} />
        </button>

        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
              <Dumbbell className="text-white" size={28} />
            </div>
            <div>
              <p className="text-sm text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-200 group"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header (only on dashboard) */}
        {showHeader && (
          <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-30">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-600 hover:text-gray-900 lg:hidden"
                >
                  <Menu size={24} />
                </button>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Dashboard
                </h2>
              </div>
              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </header>
        )}

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
