import { useEffect, useState } from "react";
import axios from "axios";
import {
  Megaphone,
  Calendar,
  Clock,
  Bell,
  Pin,
  TrendingUp,
  MessageCircle,
  Users,
  Sparkles
} from "lucide-react";

const MemberAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("/api/announcements/member", { withCredentials: true });
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Error fetching announcements", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  const getAnnouncementPriority = (index) => {
    if (index === 0) return { level: "high", color: "red", icon: <Pin className="w-3 h-3" /> };
    if (index === 1) return { level: "medium", color: "orange", icon: <TrendingUp className="w-3 h-3" /> };
    return { level: "normal", color: "blue", icon: <MessageCircle className="w-3 h-3" /> };
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Recently";

    const now = new Date();
    const announcementDate = new Date(dateString);
    const diffInHours = Math.floor((now - announcementDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 overflow-hidden">
      <div className="h-full max-w-6xl mx-auto flex flex-col gap-4">
        {/* Header - Compact but prominent */}
        <div className="text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative p-2 bg-purple-600 rounded-full">
              <Megaphone className="w-6 h-6 text-white" />
              {announcements.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{announcements.length}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Latest Announcements
            </h1>
          </div>
          <p className="text-sm text-gray-600">Stay updated with gym notifications</p>
        </div>

        {/* Stats Section - Single row */}
        <div className="grid grid-cols-3 gap-4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{announcements.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Megaphone className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Active</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{announcements.length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Bell className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Community</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">Live</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Feed - Scrollable main area */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-800">Announcement Feed</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              Live
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {announcements.length > 0 ? (
              <div className="space-y-3">
                {announcements.map((announcement, index) => {
                  const priority = getAnnouncementPriority(index);
                  return (
                    <div
                      key={announcement._id}
                      className={`group relative rounded-lg p-4 border-l-4 transition-all duration-300 hover:shadow-md ${priority.level === "high"
                          ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-400 shadow-sm"
                          : priority.level === "medium"
                            ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-400"
                            : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-400"
                        }`}
                    >
                      {/* Priority Badge */}
                      {priority.level === "high" && (
                        <div className="absolute -top-1 left-4">
                          <div className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                            <Pin className="w-2 h-2" />
                            Important
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`p-2 rounded-full flex-shrink-0 ${priority.level === "high"
                            ? "bg-red-100"
                            : priority.level === "medium"
                              ? "bg-orange-100"
                              : "bg-blue-100"
                          }`}>
                          <div className={`${priority.level === "high"
                              ? "text-red-600"
                              : priority.level === "medium"
                                ? "text-orange-600"
                                : "text-blue-600"
                            }`}>
                            {priority.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 leading-relaxed mb-2">
                            {announcement.message}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {announcement.date
                                  ? new Date(announcement.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })
                                  : "Recent"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{getTimeAgo(announcement.date)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Notification Pulse */}
                        {index < 2 && (
                          <div className="relative flex-shrink-0">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
                          </div>
                        )}
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg"></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="relative mb-4">
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Megaphone className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-yellow-800" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">All Caught Up!</h3>
                <p className="text-gray-500 mb-4">No new announcements at the moment</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-medium">
                  <Bell className="w-3 h-3" />
                  You'll be notified
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info - Compact */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 text-white text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bell className="w-4 h-4" />
            <h3 className="font-bold">Stay Connected</h3>
          </div>
          <p className="text-purple-100 text-sm leading-relaxed">
            Check regularly for important gym updates, schedules, and community announcements!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberAnnouncements;
