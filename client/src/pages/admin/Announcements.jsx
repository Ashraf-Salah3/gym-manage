import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Megaphone, Plus, Calendar, MessageCircle } from "lucide-react";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get("/api/announcements", { withCredentials: true });
            setAnnouncements(res.data);
        } catch (err) {
            console.error("Error fetching announcements", err);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/announcements", { message }, { withCredentials: true });
            setMessage("");
            fetchAnnouncements();
        } catch (err) {
            console.error("Error creating announcement", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/announcements/${id}`, { withCredentials: true });
            fetchAnnouncements();
        } catch (err) {
            console.error("Error deleting announcement", err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <Megaphone className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Announcements Hub
                    </h1>
                    <p className="text-gray-600 text-lg">Create and manage important announcements</p>
                </div>

                {/* Create Announcement Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Create New Announcement</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <MessageCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="What would you like to announce?"
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Megaphone className="w-5 h-5" />
                                    Publish Announcement
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Announcements List */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MessageCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Recent Announcements</h2>
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {announcements.length} total
                        </span>
                    </div>

                    {announcements.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                            <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <MessageCircle className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements yet</h3>
                            <p className="text-gray-500">Create your first announcement to get started!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {announcements.map((a, index) => (
                                <div
                                    key={a._id}
                                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 hover:scale-[1.02]"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    <Megaphone className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4" />
                                                    {a.date
                                                        ? new Date(a.date).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                        : "No date"}
                                                </div>
                                            </div>
                                            <p className="text-gray-800 text-lg leading-relaxed font-medium">
                                                {a.message}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(a._id)}
                                            className="opacity-0 group-hover:opacity-100 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200 hover:scale-110 focus:ring-4 focus:ring-red-100"
                                            title="Delete announcement"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
