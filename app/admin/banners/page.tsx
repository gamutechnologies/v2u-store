"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";

export default function BannersPage() {
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/banners");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    setSaving(true);

    const res = await fetch("/api/admin/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        image: image.trim(),
        link: link.trim(),
        active,
      }),
    });

    setSaving(false);
    if (!res.ok) {
      alert("Failed to create banner");
      return;
    }

    setTitle("");
    setImage("");
    setLink("");
    setActive(true);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    const res = await fetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    if (res.ok) {
      load();
    } else {
      alert("Failed to delete banner");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Banners</h2>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Banner title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Link URL"
            value={link}
            onChange={(event) => setLink(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
            />
            Active
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {saving ? "Saving..." : "Add Banner"}
        </button>
      </form>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        {loading ? (
          <p className="text-sm text-gray-500">Loading banners...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-gray-500">No banners found.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-3"
              >
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-400">
                    {item.link || "No link"}
                  </p>
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
