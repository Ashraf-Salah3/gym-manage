import { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  Trash2,
  Check,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Filter,
  Eye,
  EyeOff
} from "lucide-react";

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch reminders
  const fetchReminders = async () => {
    try {
      const res = await axios.get("/api/reminders", { withCredentials: true });
      setReminders(res.data);
    } catch (err) {
      console.error("Error fetching reminders", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete reminder
  const deleteReminder = async (id) => {
    try {
      await axios.delete(`/api/reminders/my/${id}`, { withCredentials: true });
      fetchReminders();
    } catch (err) {
      console.error("Error deleting reminder", err);
    }
  };

  // Mark as read
  const markRead = async (id) => {
    try {
      await axios.patch(`/api/reminders/read/${id}`, {}, { withCredentials: true });
      fetchReminders();
    } catch (err) {
      console.error("Error marking reminder as read", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  const filteredReminders = reminders.filter(reminder => {
    if (filter === "all") return true;
    if (filter === "unread") return !reminder.read;
    if (filter === "read") return reminder.read;
    return true;
  });

  const stats = {
    total: reminders.length,
    unread: reminders.filter(r => !r.read).length,
    read: reminders.filter(r => r.read).length
  };

  const getReminderIcon = (read) => {
    return read ? (
      <CheckCircle2 className="w-4 h-4 text-green-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-orange-500" />
    );
  };

  const getReminderStyle = (read) => {
    return read
      ? "bg-gray-50 border-gray-200 opacity-80"
      : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 shadow-sm";
  };

  if (loading) {
    return (
      <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4 overflow-hidden">
      <div className="h-full max-w-6xl mx-auto flex flex-col gap-4">
        {/* Header - Compact but visible */}
        <div className="text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-full relative">
              <Bell className="w-6 h-6 text-white" />
              {stats.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{stats.unread}</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Your Reminders
            </h1>
          </div>
          <p className="text-sm text-gray-600">Stay on top of your notifications</p>
        </div>

        {/* Stats Cards - Single row, good size */}
        <div className="grid grid-cols-3 gap-4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Unread</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{stats.unread}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Read</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{stats.read}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section - Compact */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
            </div>

            <div className="flex gap-2">
              {[
                { key: "all", label: "All", color: "gray", icon: <Bell className="w-3 h-3" /> },
                { key: "unread", label: "Unread", color: "orange", icon: <EyeOff className="w-3 h-3" /> },
                { key: "read", label: "Read", color: "green", icon: <Eye className="w-3 h-3" /> }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${filter === filterOption.key
                      ? filterOption.color === 'gray'
                        ? 'bg-gray-500 text-white shadow-lg'
                        : filterOption.color === 'orange'
                          ? 'bg-orange-500 text-white shadow-lg'
                          : 'bg-green-500 text-white shadow-lg'
                      : filterOption.color === 'gray'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : filterOption.color === 'orange'
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                >
                  {filterOption.icon}
                  {filterOption.label}
                </button>
              ))}

              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-lg flex items-center">
                {filteredReminders.length} items
              </div>
            </div>
          </div>
        </div>

        {/* Reminders List - Scrollable main area */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <Bell className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-800">Your Notifications</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {filteredReminders.length > 0 ? (
              <div className="space-y-3">
                {filteredReminders.map((r, index) => (
                  <div
                    key={r._id}
                    className={`group rounded-lg p-4 border transition-all duration-300 hover:shadow-md ${getReminderStyle(r.read)}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {getReminderIcon(r.read)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <p className={`font-medium truncate ${r.read ? 'text-gray-600' : 'text-gray-800'}`}>
                              {r.message}
                            </p>
                            {!r.read && (
                              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-medium rounded-full flex-shrink-0">
                                New
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric"
                                }) : "Recent"}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>
                                {r.createdAt ? new Date(r.createdAt).toLocaleTimeString("en-IN", {
                                  hour: "2-digit",
                                  minute: "2-digit"
                                }) : "Now"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {!r.read && (
                          <button
                            onClick={() => markRead(r._id)}
                            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteReminder(r._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete reminder"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filter === "all" ? "No reminders yet" : `No ${filter} reminders`}
                </h3>
                <p className="text-gray-500">
                  {filter === "all"
                    ? "You're all caught up! 🎉"
                    : `No ${filter} reminders to show.`
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
