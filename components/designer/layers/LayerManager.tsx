"use client";

import {
  Layers3,
} from "lucide-react";

import LayerItem from "./LayerItem";

import type { Layer } from "../types/layer";

type LayerManagerProps = {
  layers: Layer[];
  selectedLayerId: string | null;

  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onMoveLayerUp: (id: string) => void;
  onMoveLayerDown: (id: string) => void;
};

export default function LayerManager({
  layers,
  selectedLayerId,
  onSelectLayer,
  onToggleVisibility,
  onToggleLock,
  onDeleteLayer,
  onMoveLayerUp,
  onMoveLayerDown,
}: LayerManagerProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/70">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-orange-500/10 text-orange-400">
            <Layers3 size={20} />
          </div>

          <div>
            <h4 className="font-bold text-white">
              الطبقات
            </h4>

            <p className="mt-0.5 text-xs text-zinc-500">
              تحكم بعناصر التصميم وترتيبها
            </p>
          </div>
        </div>

        <span className="grid min-w-8 place-items-center rounded-full bg-zinc-800 px-2 py-1 text-xs font-bold text-orange-400">
          {layers.length}
        </span>
      </div>

      <div className="max-h-[360px] space-y-3 overflow-y-auto p-3">
        {layers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 px-4 py-8 text-center">
            <Layers3
              size={34}
              className="mx-auto text-zinc-600"
            />

            <p className="mt-3 font-bold text-zinc-200">
              لا توجد طبقات
            </p>

            <p className="mt-1 text-sm leading-6 text-zinc-500">
              عند إضافة صورة أو نص سيظهر هنا تلقائيًا.
            </p>
          </div>
        ) : (
          [...layers]
            .reverse()
            .map((layer) => (
              <LayerItem
                key={layer.id}
                layer={layer}
                isSelected={
                  selectedLayerId === layer.id
                }
                onSelect={onSelectLayer}
                onToggleVisibility={
                  onToggleVisibility
                }
                onToggleLock={onToggleLock}
                onDelete={onDeleteLayer}
                onMoveUp={onMoveLayerUp}
                onMoveDown={onMoveLayerDown}
              />
            ))
        )}
      </div>
    </div>
  );
}
