import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Log whether the keys exist (safe)
    console.log("=== CREATE ORDER API CALLED ===");
    console.log("RAZORPAY_KEY_ID exists:", !!process.env.RAZORPAY_KEY_ID);
    console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);
    console.log("NEXT_PUBLIC_RAZORPAY_KEY_ID exists:", !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);

    // Validate keys
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Missing Razorpay credentials in environment");
      return NextResponse.json(
        { error: "Server configuration error: missing API keys" },
        { status: 500 }
      );
    }

    const { amount, productId } = await request.json();
    console.log("Request amount:", amount, "productId:", productId);

    if (!amount || !productId) {
      return NextResponse.json(
        { error: "Missing amount or productId" },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${productId}_${Date.now()}`,
      notes: { productId },
    });

    console.log("Order created successfully:", order.id);
    return NextResponse.json({ orderId: order.id });
  } catch (error: any) {
    console.error("Order creation error details:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}