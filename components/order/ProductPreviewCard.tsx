"use client";

import ProductDesigner from "@/components/designer/ProductDesigner";

type ProductPreviewCardProps = {
  product: string;
  color: string;
  size: string;
  quantity: number;
  preview: string;
};

export default function ProductPreviewCard({
  product,
  color,
  size,
  quantity,
  preview,
}: ProductPreviewCardProps) {
  return (
    <div className="space-y-6">
      <ProductDesigner
        product={product}
        color={color}
        preview={preview}
      />

      <div className="grid grid-cols-2 gap-4">
        <PreviewInfo
          label="المنتج"
          value={product || "لم يتم الاختيار"}
        />

        <PreviewInfo
          label="اللون"
          value={color || "لم يتم الاختيار"}
        />

        <PreviewInfo
          label="المقاس"
          value={size || "غير مطلوب"}
        />

        <PreviewInfo
          label="الكمية"
          value={quantity.toString()}
        />
      </div>
    </div>
  );
}

type PreviewInfoProps = {
  label: string;
  value: string;
};

function PreviewInfo({
  label,
  value,
}: PreviewInfoProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-bold text-orange-500">
        {value}
      </p>
    </div>
  );
}