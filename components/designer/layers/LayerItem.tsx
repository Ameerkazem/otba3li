"use client";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  QrCode,
  Shapes,
  Trash2,
  Type,
  Unlock,
} from "lucide-react";

import type { Layer } from "../types/layer";

type LayerItemProps = {
  layer: Layer;
  isSelected: boolean;

  onSelect: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
};

function LayerIcon({
  type,
}: {
  type: Layer["type"];
}) {
  switch (type) {
    case "text":
      return <Type size={18} />;

    case "svg":
      return <Shapes size={18} />;

    case "qr":
      return <QrCode size={18} />;

    case "image":
    default:
      return <ImageIcon size={18} />;
  }
}

const actionClass =
  "grid size-9 place-items-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:border-orange-500 hover:text-orange-400 disabled:cursor-not-allowed disabled:opacity-40";

export default function LayerItem({
  layer,
  isSelected,
  onSelect,
  onToggleVisibility,
  onToggleLock,
  onDelete,
  onMoveUp,
  onMoveDown,
}: LayerItemProps) {
  return (
    <article
      className={[
        "rounded-xl border p-3 transition",
        isSelected
          ? "border-orange-500 bg-orange-500/10"
          : "border-zinc-800 bg-zinc-900/80 hover:border-zinc-700",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={() => onSelect(layer.id)}
        className="flex w-full items-center gap-3 text-right"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-zinc-800 text-orange-400">
          <LayerIcon type={layer.type} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-bold text-white">
            {layer.name}
          </span>

          <span className="mt-0.5 block text-xs text-zinc-500">
            {layer.type}
          </span>
        </span>

        <span className="flex items-center gap-1 text-zinc-500">
          {layer.locked && (
            <Lock size={14} />
          )}

          {!layer.visible && (
            <EyeOff size={14} />
          )}
        </span>
      </button>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          title={
            layer.visible
              ? "إخفاء الطبقة"
              : "إظهار الطبقة"
          }
          aria-label={
            layer.visible
              ? "إخفاء الطبقة"
              : "إظهار الطبقة"
          }
          onClick={() =>
            onToggleVisibility(layer.id)
          }
          className={actionClass}
        >
          {layer.visible ? (
            <Eye size={16} />
          ) : (
            <EyeOff size={16} />
          )}
        </button>

        <button
          type="button"
          title={
            layer.locked
              ? "إلغاء قفل الطبقة"
              : "قفل الطبقة"
          }
          aria-label={
            layer.locked
              ? "إلغاء قفل الطبقة"
              : "قفل الطبقة"
          }
          onClick={() =>
            onToggleLock(layer.id)
          }
          className={actionClass}
        >
          {layer.locked ? (
            <Unlock size={16} />
          ) : (
            <Lock size={16} />
          )}
        </button>

        <button
          type="button"
          title="تحريك الطبقة إلى الأمام"
          aria-label="تحريك الطبقة إلى الأمام"
          onClick={() => onMoveUp(layer.id)}
          className={actionClass}
        >
          <ArrowUp size={16} />
        </button>

        <button
          type="button"
          title="تحريك الطبقة إلى الخلف"
          aria-label="تحريك الطبقة إلى الخلف"
          onClick={() =>
            onMoveDown(layer.id)
          }
          className={actionClass}
        >
          <ArrowDown size={16} />
        </button>

        <button
          type="button"
          title="حذف الطبقة"
          aria-label="حذف الطبقة"
          onClick={() => onDelete(layer.id)}
          className="grid size-9 place-items-center rounded-lg bg-red-600 text-white transition hover:bg-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
