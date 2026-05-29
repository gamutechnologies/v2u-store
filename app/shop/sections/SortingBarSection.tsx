"use client";

export default function SortingBarSection({
  start,
  end,
  total,
  sortBy,
  onSortChange,
}: {
  start: number;
  end: number;
  total: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-[32px] border border-[#7DBBFF]/20 bg-white/70 px-6 py-4 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,102,255,0.05)]">
      <p className="text-[15px] text-gray-500">
        Showing <span className="text-gray-900">{start}</span>-
        <span className="text-gray-900">{end}</span> of{" "}
        <span className="text-gray-900">{total}</span> products
      </p>

      <div className="flex items-center gap-2">
        <p className="text-[15px] text-gray-500">Sort By:</p>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="rounded-full border border-gray-200 px-4 py-2 text-[15px] text-gray-700 outline-none transition-all focus:border-[#0066FF]"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
