import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Play,
  Target,
  Filter
} from "lucide-react";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", { withCredentials: true });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Add task
  const addTask = async () => {
    if (!task.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/tasks", { text: task }, { withCredentials: true });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding task", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Pending" ? "In Progress" : "Pending";
    try {
      const res = await axios.put(
        `/api/tasks/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, { withCredentials: true });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-3 h-3 text-yellow-500" />;
      case "In Progress":
        return <Play className="w-3 h-3 text-blue-500" />;
      case "Completed":
        return <CheckCircle2 className="w-3 h-3 text-green-500" />;
      default:
        return <Target className="w-3 h-3 text-gray-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status.toLowerCase().replace(" ", "") === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 overflow-hidden">
      <div className="h-full max-w-6xl mx-auto flex flex-col gap-4">
        {/* Header - Compact but prominent */}
        <div className="text-center flex-shrink-0">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-blue-600 rounded-full">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your To-Do List
            </h1>
          </div>
          <p className="text-sm text-gray-600">Organize and track your fitness goals</p>
        </div>

        {/* Stats Cards - Single row with good proportions */}
        <div className="grid grid-cols-4 gap-3 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 text-center hover:shadow-xl transition-all duration-300">
            <div className="text-xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-500">Done</div>
          </div>
        </div>

        {/* Add Task & Filter Section - Combined and compact */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex-shrink-0">
          {/* Add Task */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Enter task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 text-sm"
              />
            </div>
            <button
              onClick={addTask}
              disabled={loading || !task.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 text-sm shadow-lg"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add Task
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-800">Filter:</span>
            </div>

            <div className="flex gap-2">
              {[
                { key: "all", label: "All", color: "gray" },
                { key: "pending", label: "Pending", color: "yellow" },
                { key: "inprogress", label: "Progress", color: "blue" },
                { key: "completed", label: "Done", color: "green" }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${filter === filterOption.key
                      ? filterOption.color === 'gray'
                        ? 'bg-gray-500 text-white shadow-lg'
                        : filterOption.color === 'yellow'
                          ? 'bg-yellow-500 text-white shadow-lg'
                          : filterOption.color === 'blue'
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-green-500 text-white shadow-lg'
                      : filterOption.color === 'gray'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : filterOption.color === 'yellow'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : filterOption.color === 'blue'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                >
                  {filterOption.label}
                </button>
              ))}

              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                {filteredTasks.length} tasks
              </div>
            </div>
          </div>
        </div>

        {/* Tasks List - Scrollable main area */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-5 flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-4 flex-shrink-0">
            <Target className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800">Your Tasks</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500">
                  {filter === "all" ? "Create your first task to get started!" : `No ${filter} tasks available.`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map((t, index) => (
                  <div
                    key={t._id}
                    className="group bg-gray-50 hover:bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getStatusIcon(t.status)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 mb-1 truncate">
                            {t.text}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(t.status)}`}>
                            {getStatusIcon(t.status)}
                            {t.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => toggleStatus(t._id, t.status)}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Toggle Status"
                        >
                          <Play className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteTask(t._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
