"use client";

import DesignerToolbar from "./DesignerToolbar";
import FabricEngine from "./FabricEngine";
import MockupLayer from "./MockupLayer";

import { getDesignPlacement } from "@/lib/placements";

type ProductDesignerProps = {
  product: string;
  color: string;
  preview: string;
};

export default function ProductDesigner({
  product,
  color,
  preview,
}: ProductDesignerProps) {
  const placement = getDesignPlacement(product);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      {/* عنوان المحرر */}
      <div className="border-b border-zinc-800 p-6">
        <h3 className="text-2xl font-bold">
          AI Print Studio
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          حرّك التصميم وكبّره ودوّره مباشرة فوق المنتج.
        </p>
      </div>

      {/* مساحة الموك أب والمحرر */}
      <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden bg-zinc-950">
        {/* الطبقة الأولى: صورة المنتج */}
        <MockupLayer
          product={product}
          color={color}
        />

        {/* دليل منطقة الطباعة */}
        {product && (
          <div
            className="pointer-events-none absolute z-10 border-2 border-dashed border-orange-500/70"
            style={{
              top: placement.top,
              left: placement.left,
              width: placement.width,
              height: placement.height,
              transform: `
                translate(-50%, -50%)
                rotate(${placement.rotate ?? 0}deg)
              `,
              borderRadius:
                placement.borderRadius ?? "0px",
            }}
          />
        )}

        {/* الطبقة الثانية: Fabric Canvas */}
        <FabricEngine
          preview={preview}
          placement={placement}
        />
      </div>

      {/* أزرار التحكم لاحقًا */}
      <DesignerToolbar />
    </div>
  );
}