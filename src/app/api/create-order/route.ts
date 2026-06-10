import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance with your keys from the .env file
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    // Get the price and product ID from the request body
    const { amount, productId } = await request.json();

    if (!amount || !productId) {
      return NextResponse.json(
        { error: "Amount and Product ID are required" },
        { status: 400 }
      );
    }

    // Options for the Razorpay order
    const options = {
      amount: amount * 100, // Convert rupees to paise (e.g., ₹49 = 4900 paise)
      currency: "INR",
      receipt: `receipt_${productId}_${Date.now()}`, // Unique receipt for tracking
      notes: {
        productId: productId, // Attach product ID to the order for easy reference
      },
    };

    // Create the order on Razorpay's servers
    const order = await razorpay.orders.create(options);

    // Send the order ID back to the frontend
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}