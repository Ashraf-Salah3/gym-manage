import PDFDocument from "pdfkit";

export const generateReceiptPDF = (payment) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.fontSize(20).text("Gym Payment Receipt", { align: "center" });
      doc.moveDown();

      doc.fontSize(14).text(`Receipt No: ${payment.receiptNumber}`);
      doc.text(`Date: ${new Date(payment.paymentDate).toLocaleDateString()}`);
      doc.text(`Member: ${payment.memberId.name}`);
      doc.text(`Plan: ${payment.plan}`);
      doc.text(`Amount Paid: ₹${payment.amount}`);

      doc.moveDown();
      doc.text("Thank you for your payment!", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
