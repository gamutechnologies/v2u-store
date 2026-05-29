"use client";

import { useEffect, useState } from "react";
import { Package, Tags, TicketPercent, ShoppingCart } from "lucide-react";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  const statCards = [
    {
      title: "Total Products",
      value: data.stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Total Categories",
      value: data.stats.totalCategories,
      icon: Tags,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Brands",
      value: data.stats.totalBrands,
      icon: TicketPercent,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Total Orders",
      value: data.stats.totalOrders,
      icon: ShoppingCart,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Recent Products</h3>
          </div>
          <div className="p-6">
            {data.recentProducts.length === 0 ? (
              <p className="text-gray-500 text-sm">No products found.</p>
            ) : (
              <ul className="space-y-4">
                {data.recentProducts.map((p: any) => (
                  <li
                    key={p.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="font-medium text-gray-700">{p.name}</span>
                    <span className="text-gray-500">${p.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">Recent Orders</h3>
          </div>
          <div className="p-6">
            {data.recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders found.</p>
            ) : (
              <ul className="space-y-4">
                {data.recentOrders.map((o: any) => (
                  <li
                    key={o.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="font-medium text-gray-700">{o.id}</span>
                    <span className="text-gray-500">${o.total}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
