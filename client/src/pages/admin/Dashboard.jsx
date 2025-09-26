// client/src/pages/admin/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  CreditCard,
  Megaphone,
  LayoutDashboard,
  Dumbbell,
} from "lucide-react";

import { toast } from "sonner";

const AdminDashboard = () => {
  const [memberCount, setMemberCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  // 🆕 Fetch counts on load
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Members
        const membersRes = await axios.get(`${BackendUrl}/members`, {
          withCredentials: true,
        });
        setMemberCount(membersRes.data.length);

        // Announcements
        const annRes = await axios.get(`${BackendUrl}/announcements`, {
          withCredentials: true,
        });
        setAnnouncementCount(annRes.data.length);
      } catch (err) {
        toast.error("Error fetching dashboard counts", err);
      }
    };
    fetchCounts();
  }, []);

  const statsCards = [
    {
      title: "Total Members",
      value: memberCount, // ✅ dynamic
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+12%",
      trend: "up",
    },
    {
      title: "Pending Payments",
      value: "0", // 🕓 connect later
      icon: CreditCard,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      change: "-5%",
      trend: "down",
    },
    {
      title: "Announcements",
      value: announcementCount, // ✅ dynamic
      icon: Megaphone,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      change: "+3",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h3>
            <p className="text-blue-100 text-lg">
              Here's what's happening at your gym today
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Dumbbell size={40} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`
                bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:scale-105 border border-white/50
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`bg-gradient-to-r ${card.color} p-3 rounded-xl shadow-lg`}
                >
                  <Icon className="text-white" size={24} />
                </div>
                <span
                  className={`
                  text-sm font-semibold px-2 py-1 rounded-full
                  ${
                    card.trend === "up"
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }
                `}
                >
                  {card.change}
                </span>
              </div>
              <div>
                <h4 className="text-gray-600 text-sm font-medium mb-1">
                  {card.title}
                </h4>
                <p className="text-3xl font-bold text-gray-800">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Add New Member",
              color: "from-green-500 to-green-600",
              icon: Users,
            },
            {
              label: "Process Payment",
              color: "from-blue-500 to-blue-600",
              icon: CreditCard,
            },
            {
              label: "Send Announcement",
              color: "from-purple-500 to-purple-600",
              icon: Megaphone,
            },
            {
              label: "View Reports",
              color: "from-gray-500 to-gray-600",
              icon: LayoutDashboard,
            },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className={`
                  bg-gradient-to-r ${action.color} text-white p-4 rounded-xl 
                  hover:shadow-lg transition-all duration-200 transform hover:scale-105
                  flex flex-col items-center space-y-2
                `}
              >
                <Icon size={24} />
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h4 className="text-xl font-bold text-gray-800 mb-6">
          Recent Activity
        </h4>
        <div className="space-y-4">
          {[
            {
              action: "New member registration",
              time: "2 minutes ago",
              type: "member",
            },
            {
              action: "Payment received",
              time: "15 minutes ago",
              type: "payment",
            },
            {
              action: "Announcement posted",
              time: "1 hour ago",
              type: "announcement",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div
                className={`
                p-2 rounded-full
                ${
                  activity.type === "member"
                    ? "bg-blue-100 text-blue-600"
                    : activity.type === "payment"
                    ? "bg-green-100 text-green-600"
                    : "bg-purple-100 text-purple-600"
                }
              `}
              >
                {activity.type === "member" && <Users size={16} />}
                {activity.type === "payment" && <CreditCard size={16} />}
                {activity.type === "announcement" && <Megaphone size={16} />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
