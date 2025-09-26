import { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCard,
  Bell,
  FileText,
  X,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const planRates = {
  Basic: 500,
  Standard: 1000,
  Premium: 1500,
  VIP: 2000,
};

const planColors = {
  Basic: "bg-blue-100 text-blue-800",
  Standard: "bg-green-100 text-green-800",
  Premium: "bg-purple-100 text-purple-800",
  VIP: "bg-yellow-100 text-yellow-800",
};

const Payments = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    plan: "",
  });
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;
  // Fetch members
  useEffect(() => {
    fetchMembers();
  }, []);

  // Filter members based on search and plan filter
  useEffect(() => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterPlan !== "All") {
      filtered = filtered.filter(
        (member) => member.membershipType === filterPlan
      );
    }

    setFilteredMembers(filtered);
  }, [members, searchTerm, filterPlan]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BackendUrl}/members`, {
        withCredentials: true,
      });
      setMembers(res.data);
    } catch {
      toast.error("Error fetching members");
    } finally {
      setLoading(false);
    }
  };

  // Open Make Payment Modal
  const openPaymentModal = (member) => {
    setSelectedMember(member);
    setPaymentData({
      amount: planRates[member.membershipType] || "",
      plan: member.membershipType,
    });
    setShowPaymentModal(true);
  };

  // Handle Payment Submit
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${BackendUrl}/payments/pay`,
        {
          memberId: selectedMember._id,
          amount: paymentData.amount,
          plan: paymentData.plan,
        },
        { withCredentials: true }
      );
      setShowPaymentModal(false);
      fetchMembers();
    } catch (err) {
      toast.error("Error making payment", err);
    } finally {
      setLoading(false);
    }
  };

  // View Receipt
  const viewReceipt = async (paymentId) => {
    try {
      const res = await axios.get(
        `${BackendUrl}/payments/receipt/${paymentId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      toast.error("Error downloading receipt", err);
    }
  };

  // 🆕 Send Reminder (updated to use /api/reminders)
  const sendReminder = async (member) => {
    try {
      await axios.post(
        `${BackendUrl}/reminders`,
        {
          memberId: member._id,
          amount: planRates[member.membershipType] || 0,
          dueDate: new Date(), // you can calculate actual due date
          // replace with dynamic admin.gymName if available
        },
        { withCredentials: true }
      );
      alert("Reminder sent to member's dashboard!");
    } catch {
      toast.error("Error sending reminder");
    }
  };

  // Calculate payment status
  const getPaymentStatus = (lastPaymentDate) => {
    if (!lastPaymentDate) return "never";
    const daysSincePayment = Math.floor(
      (new Date() - new Date(lastPaymentDate)) / (1000 * 60 * 60 * 24)
    );
    if (daysSincePayment > 30) return "overdue";
    if (daysSincePayment > 25) return "due-soon";
    return "current";
  };

  const statusColors = {
    never: "bg-gray-100 text-gray-800",
    overdue: "bg-red-100 text-red-800",
    "due-soon": "bg-orange-100 text-orange-800",
    current: "bg-green-100 text-green-800",
  };

  const statusLabels = {
    never: "Never Paid",
    overdue: "Overdue",
    "due-soon": "Due Soon",
    current: "Current",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Member Payments
              </h1>
              <p className="text-gray-600">
                Manage payments and track membership dues
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-fit">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-700">
                  {members.length}
                </div>
                <div className="text-sm text-blue-600">Total Members</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">
                  {
                    members.filter(
                      (m) => getPaymentStatus(m.lastPaymentDate) === "current"
                    ).length
                  }
                </div>
                <div className="text-sm text-green-600">Current</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <AlertCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-700">
                  {
                    members.filter(
                      (m) => getPaymentStatus(m.lastPaymentDate) === "overdue"
                    ).length
                  }
                </div>
                <div className="text-sm text-red-600">Overdue</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">
                  E
                  {members
                    .reduce(
                      (sum, m) => sum + (planRates[m.membershipType] || 0),
                      0
                    )
                    .toLocaleString()}
                </div>
                <div className="text-sm text-purple-600">Total Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Plan Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white min-w-[150px]"
              >
                <option value="All">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Last Payment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => {
                      const paymentStatus = getPaymentStatus(
                        member.lastPaymentDate
                      );
                      return (
                        <tr
                          key={member._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {member.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-3">
                                <div className="font-medium text-gray-900">
                                  {member.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                planColors[member.membershipType]
                              }`}
                            >
                              {member.membershipType}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                              E
                              {planRates[
                                member.membershipType
                              ]?.toLocaleString() || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-2" />
                              {member.lastPaymentDate
                                ? new Date(
                                    member.lastPaymentDate
                                  ).toLocaleDateString()
                                : "No payment yet"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[paymentStatus]}`}
                            >
                              {statusLabels[paymentStatus]}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              {/* Make Payment */}
                              <button
                                onClick={() => openPaymentModal(member)}
                                className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-sm"
                                title="Make Payment"
                              >
                                <CreditCard size={16} />
                                <span className="hidden sm:inline">Pay</span>
                              </button>

                              {/* View Receipt */}
                              {member.lastPaymentId && (
                                <button
                                  onClick={() =>
                                    viewReceipt(member.lastPaymentId)
                                  }
                                  className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-sm"
                                  title="Download Receipt"
                                >
                                  <FileText size={16} />
                                  <span className="hidden sm:inline">
                                    Receipt
                                  </span>
                                </button>
                              )}

                              {/* 🆕 Remind */}
                              <button
                                onClick={() => sendReminder(member)}
                                className="flex items-center space-x-1 px-3 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-sm"
                                title="Send Reminder"
                              >
                                <Bell size={16} />
                                <span className="hidden sm:inline">Remind</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-gray-500">
                          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">
                            No members found
                          </p>
                          <p className="text-sm">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Process Payment
                </h2>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
                {/* Member Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedMember?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <div className="font-medium text-gray-900">
                        {selectedMember?.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        Member ID: {selectedMember?._id.slice(-6)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Plan
                  </label>
                  <input
                    type="text"
                    value={paymentData.plan}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      E
                    </span>
                    <input
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          amount: e.target.value,
                        })
                      }
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter amount"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Process Payment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
