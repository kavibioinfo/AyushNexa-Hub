import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productId, userEmail } = await request.json();

    // 1. Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // 2. Insert into Supabase and return the inserted row
    const { data, error } = await supabase
      .from("payments")
      .insert([
        {
          razorpay_payment_id,
          razorpay_order_id,
          product_id: productId,
          user_email: userEmail || null,
          amount: 0, // or fetch the actual amount if you have it
          status: "success",
          created_at: new Date().toISOString(),
        },
      ])
      .select(); // <-- very important: returns the inserted row

    if (error) {
      console.error("Supabase insert error:", error);
      // Return the error details to the frontend (for debugging)
      return NextResponse.json(
        { success: false, message: "Database insert failed", error: error.message, details: error },
        { status: 500 }
      );
    }

    console.log("Payment inserted successfully:", data);
    return NextResponse.json({ success: true, message: "Payment verified and saved!", insertedData: data });
  } catch (err: any) {
    console.error("Verification catch error:", err);
    return NextResponse.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
  }
}