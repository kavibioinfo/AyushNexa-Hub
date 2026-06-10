import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Use your Razorpay Key Secret from the .env file
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(request: NextRequest) {
  try {
    // Get the payment details sent from the frontend
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Create the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // Verify if the signature matches
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is successful and verified!
      // Here you can:
      // - Save the payment details in your database
      // - Update the user's account to show they have paid
      // - Send a confirmation email
      
      // 👉 For now, we'll just send a success response.
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully!",
      });
    } else {
      // Signature doesn't match - potential fraud
      return NextResponse.json(
        { success: false, message: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}