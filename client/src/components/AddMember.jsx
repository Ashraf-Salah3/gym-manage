import { useState } from "react";
import axios from "axios";

const AddMember = ({ onAddSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    status: "Active",
  });
  const BackendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BackendUrl}/members`, form, {
        withCredentials: true,
      });
      onAddSuccess(); // refresh list
      setForm({
        name: "",
        email: "",
        phone: "",
        package: "",
        status: "Active",
      });
    } catch (err) {
      alert("Error adding member");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 max-w-xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add New Member</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          type="email"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 rounded"
          required
        />
        <input
          name="package"
          value={form.package}
          onChange={handleChange}
          placeholder="Package"
          className="border p-2 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button className="bg-green-600 text-white py-2 rounded">
          Add Member
        </button>
      </div>
    </form>
  );
};

export default AddMember;
