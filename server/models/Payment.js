import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now }, // use paymentDate for consistency
  receiptNumber: { type: String },
});

export default mongoose.model("Payment", paymentSchema);
