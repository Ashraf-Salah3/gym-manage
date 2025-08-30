import { useState, useEffect } from 'react';
import axios from 'axios';

const EditMember = ({ member, onCancel, onUpdate }) => {
  const [form, setForm] = useState(member);

  useEffect(() => {
    setForm(member); // 🛠️ CHANGED: Reset form if member changes
  }, [member]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:${process.env.PORT}/api/members/${member._id}`, form, {
        withCredentials: true
      });
      onUpdate(); // 🔽 NEW: Refresh list
    } catch (err) {
      alert('Error updating member');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Member</h2>
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
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Update
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMember;
