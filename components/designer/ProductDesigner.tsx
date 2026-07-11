"use client";

import MockupLayer from "./MockupLayer";
import FabricEngine from "./FabricEngine";
import DesignerToolbar from "./DesignerToolbar";

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
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <div className="border-b border-zinc-800 p-6">
        <h3 className="text-2xl font-bold">
          AI Print Studio
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          صمم مباشرة فوق المنتج.
        </p>
      </div>

      <div className="relative aspect-square">

        <MockupLayer
          product={product}
          color={color}
        />

        <FabricEngine
          preview={preview}
        />

      </div>

      <DesignerToolbar />

    </div>
  );
}