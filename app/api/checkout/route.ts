import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";
import PDFDocument from "pdfkit/js/pdfkit.js";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const orders = readDB("orders");
    const newOrder = {
      id: generateId("orders", "ORD"),
      ...data,
      date: new Date().toISOString(),
    };
    orders.push(newOrder);
    writeDB("orders", orders);

    // Generate Invoice PDF
    const invoicesDir = path.join(process.cwd(), "data", "invoices");
    if (!fs.existsSync(invoicesDir))
      fs.mkdirSync(invoicesDir, { recursive: true });

    const doc = new PDFDocument();
    const pdfPath = path.join(invoicesDir, `Invoice-${newOrder.id}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${newOrder.id}`);
    doc.text(`Date: ${new Date(newOrder.date).toLocaleDateString()}`);
    doc.moveDown();
    doc.text(`Customer: ${newOrder.customer.name}`);
    doc.text(`Email: ${newOrder.customer.email}`);
    doc.text(
      `Address: ${newOrder.customer.address}, ${newOrder.customer.city} ${newOrder.customer.postalCode}`,
    );
    doc.moveDown();
    doc.text("Items:");
    newOrder.items.forEach((item: any) => {
      doc.text(
        `- ${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`,
      );
    });
    doc.moveDown();
    doc
      .fontSize(14)
      .text(`Total: $${newOrder.total.toFixed(2)}`, { align: "right" });

    doc.end();

    console.log(`📝 Generated PDF for invoice ${newOrder.id} at ${pdfPath}`);
    console.log(`📧 Sending email to ${data.customer.email}... (Simulated)`);

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
