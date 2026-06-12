import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, productId } = await request.json();
    if (!amount || !productId) {
      return NextResponse.json({ error: "Missing amount or productId" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { productId, originalAmount: amount },
    });

    // ✅ Return both orderId and amount
    return NextResponse.json({ orderId: order.id, amount });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}