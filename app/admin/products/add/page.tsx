"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    name: "",
    brandId: "",
    categoryId: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    badge: "",
    status: "In Stock",
    featured: false,
    images: [],
    variants: [],
  });
  const [brands, setBrands] = useState([]);
  const [cats, setCats] = useState([]);
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetch("/api/admin/brands")
      .then((r) => r.json())
      .then(setBrands);
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCats);
    if (false) {
      fetch("/api/admin/products")
        .then((r) => r.json())
        .then((data) => {
          const item = data.find((i: any) => i.id === undefined);
          if (item) setForm(item);
        });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let uploadedImages = [...form.images];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        formData.append("folder", "products");
        formData.append("name", form.name);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) uploadedImages.push(data.url);
      }
    }

    const payload = { ...form, images: uploadedImages };
    const method = "POST";
    const url = "/api/admin/products";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) alert((await res.json()).error);
    else router.push("/admin/products");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-2xl bg-white p-6 rounded shadow"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option>In Stock</option>
              <option>Out Of Stock</option>
            </select>
          </div>
        </div>
        <div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured product
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Brand</label>
            <select
              required
              value={form.brandId}
              onChange={(e) => setForm({ ...form, brandId: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              {brands.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              {cats.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Original Price</label>
            <input
              required
              type="number"
              step="0.01"
              value={form.originalPrice}
              onChange={(e) =>
                setForm({
                  ...form,
                  originalPrice: e.target.value
                    ? parseFloat(e.target.value)
                    : "",
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Sale Price</label>
            <input
              type="number"
              step="0.01"
              value={form.salePrice}
              onChange={(e) =>
                setForm({
                  ...form,
                  salePrice: e.target.value ? parseFloat(e.target.value) : "",
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2">
            {form.images.map((img: string, idx: number) => (
              <img key={idx} src={img} className="h-16 object-contain border" />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
