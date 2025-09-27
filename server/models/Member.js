import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    membershipType: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },

    password: { type: String, required: true },
    lastPaymentDate: { type: Date }, // NEW
    lastPaymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }, // NEW
    reminders: [
      // NEW
      {
        message: String,
        date: { type: Date, default: Date.now },
        seen: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// Hash password before save
memberSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
memberSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Member", memberSchema);
