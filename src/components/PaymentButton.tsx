"use client";

import { useState } from "react";
import Script from "next/script";

// Define the props that this button will accept
interface PaymentButtonProps {
  productId: string;   // e.g., "premium_resume", "business_growth_kit"
  amount: number;      // e.g., 49, 199, 399
  productName: string; // e.g., "Premium Resume Builder", "Business Growth Kit"
  userEmail?: string;  // Optional: if you have user login
  onSuccess?: () => void; // Optional function to call after successful payment
}

export default function PaymentButton({
  productId,
  amount,
  productName,
  userEmail,
  onSuccess,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Request an order from your server
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          productId: productId,
        }),
      });

      const { orderId } = await orderResponse.json();

      // 2. Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your public key
        amount: amount * 100,
        currency: "INR",
        name: "Ayush Nexa", // Your company name
        description: `Purchase: ${productName}`,
        order_id: orderId,
        prefill: {
          email: userEmail || "customer@example.com",
        },
        theme: {
          color: "#3b82f6", // Your brand color (Tailwind blue-500)
        },
        // This handler runs after payment is completed on Razorpay's side
        handler: async function (response: any) {
          // 3. Verify the payment on your server
          const verifyResponse = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verificationResult = await verifyResponse.json();

          if (verificationResult.success) {
            // Payment is successful and verified!
            alert("Payment successful! You can now access your content.");
            
            // Call the optional onSuccess function if provided
            if (onSuccess) {
              onSuccess();
            }
            
            // Optional: Redirect to a "Thank You" or "Dashboard" page
            // window.location.href = "/thank-you";
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
      };

      // 3. Open Razorpay Checkout
      const Razorpay = (window as any).Razorpay;
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load the Razorpay script
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isLoading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </>
  );
}