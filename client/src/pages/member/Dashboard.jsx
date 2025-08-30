import { useEffect, useState } from "react";
import axios from "axios";
import {
  LogOut,
  CheckCircle2,
  Clock,
  Target,
  Megaphone,
  TrendingUp,
  Calendar,
  User,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks", { withCredentials: true });
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/members/auth/logout", {}, { withCredentials: true });
      navigate("/member/login");
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-3 h-3 text-green-500" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-yellow-500" />;
      default:
        return <Target className="w-3 h-3 text-gray-400" />;
    }
  };

  const getTaskStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return "text-green-700 bg-green-100";
      case 'pending':
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto flex flex-col gap-4">
        {/* Header - Optimized size */}
        <header className="flex justify-between items-center bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-100 rounded-full">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {getGreeting()}!
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>
                  {currentTime.toLocaleDateString("en-IN", {
                    weekday: "short",
                    month: "short",
                    day: "numeric"
                  })}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </header>

        {/* Stats Cards - Single row with good proportions */}
        <div className="grid grid-cols-3 gap-4 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{tasks.length}</p>
              </div>
              <div className="p-2 bg-indigo-100 rounded-full">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Completed</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{completedTasks}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingTasks}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two columns with scrollable content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* To-Do Preview */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Your To-Do List</h2>
                  <p className="text-xs text-gray-500">Recent tasks overview</p>
                </div>
              </div>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>

            <div className="flex-1 overflow-y-auto">
              {tasks.length > 0 ? (
                <div className="space-y-3">
                  {tasks.slice(0, 5).map((task, index) => (
                    <div
                      key={task._id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                    >
                      {getTaskStatusIcon(task.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 font-medium truncate">{task.text}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusStyle(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                  ))}

                  {tasks.length > 5 && (
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-center text-xs text-gray-500">
                        +{tasks.length - 5} more tasks
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-6">
                  <div className="p-3 bg-gray-100 rounded-full mb-3">
                    <Target className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No tasks yet</h3>
                  <p className="text-xs text-gray-500">Create your first task!</p>
                </div>
              )}
            </div>
          </div>

          {/* Announcements Preview */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Megaphone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Gym Updates</h2>
                  <p className="text-xs text-gray-500">Latest news</p>
                </div>
              </div>
              <Activity className="w-4 h-4 text-purple-600" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-purple-700">Latest Updates</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Stay connected with your gym community. Get notified about new classes and equipment updates.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-800">Active</span>
                  </div>
                  <p className="text-xs text-green-700">Real-time updates</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Events</span>
                  </div>
                  <p className="text-xs text-blue-700">Upcoming activities</p>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-2 mb-1">
                  <Megaphone className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-800">Community</span>
                </div>
                <p className="text-xs text-yellow-700">Member announcements and news</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
