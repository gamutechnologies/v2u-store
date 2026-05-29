"use client";
import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { orderId: string };
}) {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
        ✓
      </div>
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
      <p className="text-gray-600 mb-8">
        Your Order ID is:{" "}
        <span className="font-bold">{searchParams.orderId || "PENDING"}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        An invoice has been sent to your email.
      </p>
      <Link
        href="/shop"
        className="bg-blue-600 text-white px-6 py-3 rounded font-bold"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
