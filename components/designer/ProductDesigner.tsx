"use client";

import DesignerToolbar from "./DesignerToolbar";
import FabricEngine from "./FabricEngine";
import MockupLayer from "./MockupLayer";

import {
  getDesignPlacement,
} from "@/lib/placements";

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
  const placement =
    getDesignPlacement(product);

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
      <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden bg-zinc-950">
        {/* صورة المنتج */}
        <MockupLayer
          product={product}
          color={color}
        />

        {/* محرر Fabric */}
        {product && (
          <FabricEngine
            preview={preview}
            placement={placement}
          />
        )}
      </div>

      {/* شريط الأدوات */}
      <DesignerToolbar />
    </div>
  );
}