"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      // Create order
      const payload = {
        customer: form,
        items: cart,
        total: cartTotal,
        status: "Completed",
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.removeItem("cart"); // Clear cart
        router.push(`/checkout/success?orderId=${data.orderId}`);
      } else {
        alert("Checkout failed");
      }
    } catch (err) {
      alert("Error during checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0)
    return <div className="text-center pt-28 pb-20">Cart is empty</div>;

  return (
    <div className="max-w-6xl mx-auto pt-28 pb-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow border"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              required
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              required
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">City</label>
              <input
                required
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Postal Code</label>
              <input
                required
                type="text"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">Notes (Optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border p-2 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded font-bold mt-4"
          >
            {loading ? "Processing..." : "Place Order & Pay"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Your Order</h2>
        <div className="bg-white p-6 rounded shadow border">
          <div className="space-y-4 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>\${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>\${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
