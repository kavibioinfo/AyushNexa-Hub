"use client";

import { useState } from "react";

interface RazorpayButtonProps {
  amount: number;
  label?: string;
  userEmail?: string;
  onSuccess: () => void;
}

export default function RazorpayButton({
  amount,
  label = `Pay ₹${amount}`,
  userEmail = "",
  onSuccess,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, productId: "business_kit" }),
      });
      const { orderId } = await res.json();

      // Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Ayush Nexa",
        description: "Business Kit Purchase",
        order_id: orderId,
        prefill: { email: userEmail },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              productId: "business_kit",
            }),
          });
          const data = await verifyRes.json();
          if (data.success) {
            onSuccess();
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
      };

      const Razorpay = (window as any).Razorpay;
      if (Razorpay) {
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK not loaded. Please refresh.");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full h-10 bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#2563EB]/90 transition-all disabled:opacity-50"
    >
      {loading ? "Processing..." : label}
    </button>
  );
}