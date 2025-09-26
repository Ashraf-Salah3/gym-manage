import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Search, X, Mail, Phone, User, Edit, Trash2 } from "lucide-react"; // ADDED Edit, Trash2
import { toast } from "sonner";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "",
    expiryDate: "",
    password: "", // Add this line
  });
  const [editId, setEditId] = useState(null); // ADDED
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch members
  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/members`);

      setMembers(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      password: name === "phone" ? value : prev.password,
    }));
  };

  // Add or Edit member
  const handleAddOrEditMember = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Edit
        await axios.put(`${BackendUrl}/members/${editId}`, formData, {
          withCredentials: true,
        });
      } else {
        // Add - set password as phone number
        const memberData = { ...formData, password: formData.phone };
        await axios.post(`${BackendUrl}/members`, memberData, {
          withCredentials: true,
        }); // <-- FIXED
      }
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        membershipType: "",
        expiryDate: "",
        password: "",
      });
      setEditId(null);
      fetchMembers();
    } catch {
      toast.error("Error saving member");
    }
  };

  // Open edit modal
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      membershipType: member.membershipType,
      expiryDate: member.expiryDate ? member.expiryDate.slice(0, 10) : "",
    });
    setEditId(member._id);
    setShowModal(true);
  };

  // Delete member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        await axios.delete(`${BackendUrl}/members/${id}`, {
          withCredentials: true,
        });
        fetchMembers();
      } catch (err) {
        toast.error("Error deleting member", err);
      }
    }
  };

  // Filter members by search
  const filteredMembers = Array.isArray(members)
    ? members.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.phone.includes(search)
      )
    : [];

  const getMembershipTypeColor = (type) => {
    const colors = {
      premium: "bg-purple-100 text-purple-800 border-purple-200",
      basic: "bg-blue-100 text-blue-800 border-blue-200",
      vip: "bg-yellow-100 text-yellow-800 border-yellow-200",
      standard: "bg-green-100 text-green-800 border-green-200",
    };
    return (
      colors[type?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Member Management
              </h1>
              <p className="text-gray-600">
                Manage your gym members and their memberships
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span className="font-medium">Add New Member</span>
            </button>
          </div>
        </div>

        {/* Search and Stats Section */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search members by name or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
              />
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {filteredMembers.length}
              </div>
              <div className="text-gray-600 font-medium">
                {search ? "Filtered" : "Total"} Members
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid/Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Member
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Membership
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>{" "}
                  {/* ADDED */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr
                      key={member._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Member ID: {member._id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail size={14} />
                            {member.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone size={14} />
                            {member.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getMembershipTypeColor(
                            member.membershipType
                          )}`}
                        >
                          {member.membershipType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-gray-900">
                            <span className="font-medium">Joined:</span>{" "}
                            {new Date(member.joinDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Expires:</span>{" "}
                            {member.expiryDate
                              ? new Date(member.expiryDate).toLocaleDateString()
                              : "No expiry"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <User
                          size={48}
                          className="mx-auto mb-4 text-gray-300"
                        />
                        <p className="text-lg font-medium mb-2">
                          No members found
                        </p>
                        <p className="text-sm">
                          Try adjusting your search criteria or add a new member
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-gray-200">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div key={member._id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">
                        {member.name}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} />
                          <span className="truncate">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} />
                          {member.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getMembershipTypeColor(
                              member.membershipType
                            )}`}
                          >
                            {member.membershipType}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <div>
                            Joined:{" "}
                            {new Date(member.joinDate).toLocaleDateString()}
                          </div>
                          <div>
                            Expires:{" "}
                            {member.expiryDate
                              ? new Date(member.expiryDate).toLocaleDateString()
                              : "No expiry"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <User size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium text-gray-500 mb-2">
                  No members found
                </p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search criteria or add a new member
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Member Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editId ? "Edit Member" : "Add New Member"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditId(null); // ADDED
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        membershipType: "",
                        expiryDate: "",
                      });
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleAddOrEditMember} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter member's full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="member@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Membership Type *
                    </label>
                    <select
                      name="membershipType"
                      value={formData.membershipType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select membership type</option>
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="VIP">VIP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditId(null); // ADDED
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          membershipType: "",
                          expiryDate: "",
                        });
                      }}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg"
                    >
                      {editId ? "Save Changes" : "Add Member"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
