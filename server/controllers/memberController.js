import Member from '../models/Member.js';

// Add new member
export const createMember = async (req, res) => {
  try {
    const { name, email, phone, membershipType, expiryDate, password } = req.body;
    const newMember = new Member({
      name,
      email,
      phone,
      membershipType,
      expiryDate,
      gymName: req.admin.gymName,
      password: password || phone
    });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    console.error("Error creating member:", err); // <-- Add this line
    res.status(400).json({ error: err.message });
  }
};

// Get all members
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a member
export const updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
