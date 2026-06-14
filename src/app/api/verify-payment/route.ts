import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    // ✅ Added optional fields: userName, userPhone, userCity
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      userEmail,
      amount,
      userName,    // optional - from frontend
      userPhone,   // optional - from frontend
      userCity,    // optional - from frontend
    } = await request.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    // --- 1. Insert into existing payments table (UNCHANGED) ---
    const { error: paymentError } = await supabase
      .from("payments")
      .insert([
        {
          razorpay_payment_id,
          razorpay_order_id,
          product_id: productId,
          user_email: userEmail || null,
          amount: amount,
          status: "success",
        },
      ]);

    if (paymentError) {
      console.error("Supabase insert error:", paymentError);
      return NextResponse.json(
        { success: false, message: "Database error", details: paymentError.message },
        { status: 500 }
      );
    }

    // --- 2. Insert into customers table (NEW, only if we have customer data) ---
    // This will not fail the payment if something goes wrong – just logs a warning
    if (userName || userEmail || userPhone) {
      const { error: customerError } = await supabase
        .from("customers")
        .insert({
          name: userName || null,
          email: userEmail || null,
          phone: userPhone || null,
          city: userCity || null,
          product_purchased: productId,
          razorpay_payment_id: razorpay_payment_id,
          amount: amount,
        });

      if (customerError) {
        console.warn("Customer insert failed (non‑critical):", customerError);
      } else {
        console.log("Customer record saved for:", userEmail);
      }
    }

    return NextResponse.json({ success: true, message: "Payment verified and saved!" });
  } catch (err: any) {
    console.error("Verification error:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}