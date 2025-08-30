// controllers/paymentController.js
import Member from "../models/Member.js";
import Payment from "../models/Payment.js";
import PDFDocument from "pdfkit";

export const getPayments = async (req, res) => {
  try {
    const members = await Member.find({ gymName: req.admin.gymName });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch members" });
  }
};

export const makePayment = async (req, res) => {
  try {
  

    const { memberId, amount, plan } = req.body;
    const member = await Member.findById(memberId);

    if (!member) return res.status(404).json({ error: "Member not found" });

    const payment = new Payment({
      memberId,
      amount,
      plan,
      gymName: req.admin.gymName
    });
    await payment.save();

    member.lastPaymentDate = new Date();
    member.lastPaymentId = payment._id;
    await member.save();

    res.json({ message: "Payment recorded", paymentId: payment._id });
  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("memberId");

    if (!payment) return res.status(404).json({ error: "Receipt not found" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=receipt-${payment._id}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text("Gym Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.text(`Member Name: ${payment.memberId.name}`);
    doc.text(`Plan: ${payment.plan}`);
    doc.text(`Amount: ₹${payment.amount}`);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`);
    doc.text(`Gym: ${payment.gymName}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ error: "Failed to generate receipt" });
  }
};

export const sendReminder = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found" });

    const message = `Hi ${member.name}, your gym membership payment of ₹${member.amount || ""} is due. Please clear it to avoid interruption. Ignore if paid. – ${member.gymName}`;

    member.reminders.push({ message });
    await member.save();

    res.json({ message: "Reminder sent to member dashboard" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send reminder" });
  }
};
