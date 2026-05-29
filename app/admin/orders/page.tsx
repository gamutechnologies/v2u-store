"use client";

import { useEffect, useState } from "react";

const parsePrice = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export default function OrdersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Orders</h2>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">Loading orders...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-800">
                      {order.id}
                    </td>
                    <td className="py-3 text-gray-600">
                      {order.customer?.name || "-"}
                    </td>
                    <td className="py-3 text-gray-600">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="py-3 text-gray-600">
                      {order.status || "Pending"}
                    </td>
                    <td className="py-3 text-right text-gray-700">
                      ${parsePrice(order.total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
