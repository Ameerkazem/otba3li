"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import {
  categoryLabels,
  products,
  type ProductCategory,
} from "@/lib/products";

type FilterKey = "all" | ProductCategory;

export default function ProductFilters() {
  const [activeCategory, setActiveCategory] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      const matchesSearch =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <>
      <div className="mt-8 rounded-3xl border border-black/5 bg-white p-4">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ابحث عن منتج..."
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-400"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.entries(categoryLabels) as [FilterKey, string][]).map(
            ([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  activeCategory === key
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        عدد المنتجات: <strong className="text-slate-900">{filteredProducts.length}</strong>
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <h3 className="text-xl font-black">ما لقينا منتج بهذا الاسم</h3>
          <p className="mt-2 text-slate-500">جرّب كلمة ثانية أو اختار تصنيف مختلف.</p>
        </div>
      )}
    </>
  );
}
