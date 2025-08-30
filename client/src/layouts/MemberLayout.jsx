import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Home,
  CheckSquare,
  Bell,
  Megaphone,
  Menu,
  X,
  User,
  Settings,
  Dumbbell
} from "lucide-react";
import { useState } from "react";

const MemberLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/member/dashboard", icon: <Home size={20} />, color: "blue" },
    { name: "To-Do", path: "/member/todo", icon: <CheckSquare size={20} />, color: "green" },
    { name: "Reminders", path: "/member/reminders", icon: <Bell size={20} />, color: "yellow" },
    { name: "Announcements", path: "/member/announcements", icon: <Megaphone size={20} />, color: "purple" },
  ];

  const getMenuItemStyle = (path, color) => {
    const isActive = location.pathname === path;
    const baseStyle = "group flex items-center gap-4 px-6 py-4 mx-4 rounded-xl transition-all duration-300 relative overflow-hidden cursor-pointer";

    if (isActive) {
      switch (color) {
        case 'blue':
          return `${baseStyle} bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg`;
        case 'green':
          return `${baseStyle} bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg`;
        case 'yellow':
          return `${baseStyle} bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg`;
        case 'purple':
          return `${baseStyle} bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg`;
        default:
          return `${baseStyle} bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg`;
      }
    }

    switch (color) {
      case 'blue':
        return `${baseStyle} text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md`;
      case 'green':
        return `${baseStyle} text-gray-600 hover:bg-green-50 hover:text-green-700 hover:shadow-md`;
      case 'yellow':
        return `${baseStyle} text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 hover:shadow-md`;
      case 'purple':
        return `${baseStyle} text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md`;
      default:
        return `${baseStyle} text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md`;
    }
  };

  const getIconStyle = (path, color) => {
    const isActive = location.pathname === path;
    if (isActive) {
      return "text-white transition-all duration-300";
    }

    switch (color) {
      case 'blue':
        return "text-gray-500 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300";
      case 'green':
        return "text-gray-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-300";
      case 'yellow':
        return "text-gray-500 group-hover:text-yellow-600 group-hover:scale-110 transition-all duration-300";
      case 'purple':
        return "text-gray-500 group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300";
      default:
        return "text-gray-500 group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300";
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 shadow-2xl z-40 
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Gym Portal</h1>
              <p className="text-blue-100 text-sm">Member Dashboard</p>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Member</h3>
              <p className="text-sm text-gray-500">Active Status</p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-6 space-y-2">
            <div className="px-6 mb-4">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</h2>
            </div>

            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={getMenuItemStyle(item.path, item.color)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Active indicator */}
                {location.pathname === item.path && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full shadow-lg"></div>
                )}

                <div className={getIconStyle(item.path, item.color)}>
                  {item.icon}
                </div>

                <span className="font-medium text-base tracking-wide">
                  {item.name}
                </span>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-20 py-4 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">Gym Portal</h1>
        </div>

        {/* Content area */}
        <div className="p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MemberLayout;
