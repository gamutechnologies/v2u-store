"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function CategoriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    setSaving(true);

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), image: image.trim() }),
    });

    setSaving(false);
    if (!res.ok) {
      alert("Failed to create category");
      return;
    }

    setName("");
    setImage("");
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      load();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Categories</h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Saving..." : "Add Category"}
          </button>
        </div>
      </form>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">Loading categories...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No categories found.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3"
              >
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  {item.image && (
                    <p className="text-xs text-gray-400">{item.image}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
