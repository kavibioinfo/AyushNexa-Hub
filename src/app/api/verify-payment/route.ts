import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, userEmail, amount } = await request.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // Insert into Supabase with the actual amount
    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          razorpay_payment_id,
          razorpay_order_id,
          product_id: productId,
          user_email: userEmail || null,
          amount: amount, // ✅ store the real amount
          status: "success",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, message: "Database error", details: error.message },
        { status: 500 }
      );
    }

    console.log("Payment saved with amount:", amount);
    return NextResponse.json({ success: true, message: "Payment verified and saved!" });
  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}