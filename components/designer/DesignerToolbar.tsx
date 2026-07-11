"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Check,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Type,
} from "lucide-react";

import type {
  TextEditorState,
  UpdateTextOptions,
} from "./FabricEngine";

type DesignerToolbarProps = {
  selectedText:
    | TextEditorState
    | null;

  onAddText: (
    text: string,
    options: TextEditorState
  ) => void;

  onUpdateSelectedText: (
    options: UpdateTextOptions
  ) => void;
};

const fonts = [
  "Arial",
  "Tahoma",
  "Georgia",
  "Times New Roman",
  "Trebuchet MS",
];

const quickColors = [
  "#111111",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
];

const DEFAULT_STATE: TextEditorState = {
  text: "يا حسين",
  color: "#111111",
  fontSize: 34,
  fontFamily: "Arial",
  fontWeight: "700",
  textAlign: "center",
  charSpacing: 0,
  lineHeight: 1.16,
  opacity: 1,
  strokeColor: "#ffffff",
  strokeWidth: 0,
  shadowEnabled: false,
  shadowColor: "#000000",
  shadowBlur: 8,
  shadowOffsetX: 3,
  shadowOffsetY: 3,
};

export default function DesignerToolbar({
  selectedText,
  onAddText,
  onUpdateSelectedText,
}: DesignerToolbarProps) {
  const [
    editorState,
    setEditorState,
  ] = useState<TextEditorState>(
    DEFAULT_STATE
  );

  const isEditing =
    selectedText !== null;

  useEffect(() => {
    if (selectedText) {
      setEditorState(selectedText);
    }
  }, [selectedText]);

  const updateField = <
    Key extends keyof TextEditorState
  >(
    key: Key,
    value: TextEditorState[Key]
  ) => {
    setEditorState((current) => ({
      ...current,
      [key]: value,
    }));

    if (isEditing) {
      onUpdateSelectedText({
        [key]: value,
      } as UpdateTextOptions);
    }
  };

  const handleAddText = () => {
    const cleanText =
      editorState.text.trim();

    if (!cleanText) return;

    onAddText(cleanText, {
      ...editorState,
      text: cleanText,
    });
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950/60 p-4 sm:p-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-orange-500/10 text-orange-400">
              <SlidersHorizontal size={20} />
            </div>

            <div>
              <h4 className="font-bold text-white">
                خصائص النص
              </h4>

              <p className="mt-0.5 text-xs text-zinc-500">
                {isEditing
                  ? "عدّل النص المحدد مباشرة"
                  : "جهّز تنسيق النص ثم أضفه"}
              </p>
            </div>
          </div>

          {isEditing && (
            <span className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
              <Check size={14} />
              تعديل مباشر
            </span>
          )}
        </div>

        <div className="grid gap-4 p-4 xl:grid-cols-2">
          <div className="space-y-4">
            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <div className="mb-3 flex items-center gap-2">
                <Type size={17} className="text-orange-400" />
                <h5 className="font-bold text-white">
                  Typography
                </h5>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={editorState.text}
                  onChange={(event) =>
                    updateField(
                      "text",
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !isEditing
                    ) {
                      handleAddText();
                    }
                  }}
                  className="h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-right text-white outline-none focus:border-orange-500"
                  placeholder="اكتب النص هنا"
                />

                <div className="grid gap-3 sm:grid-cols-3">
                  <select
                    value={editorState.fontFamily}
                    onChange={(event) =>
                      updateField(
                        "fontFamily",
                        event.target.value
                      )
                    }
                    className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-white outline-none focus:border-orange-500"
                  >
                    {fonts.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>

                  <select
                    value={editorState.fontWeight}
                    onChange={(event) =>
                      updateField(
                        "fontWeight",
                        event.target.value
                      )
                    }
                    className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-white outline-none focus:border-orange-500"
                  >
                    <option value="400">عادي</option>
                    <option value="600">شبه عريض</option>
                    <option value="700">عريض</option>
                    <option value="900">عريض جدًا</option>
                  </select>

                  <input
                    type="number"
                    min={12}
                    max={160}
                    value={editorState.fontSize}
                    onChange={(event) =>
                      updateField(
                        "fontSize",
                        Math.min(
                          160,
                          Math.max(
                            12,
                            Number(event.target.value) || 12
                          )
                        )
                      )
                    }
                    className="h-11 rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-center text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["left", AlignLeft],
                    ["center", AlignCenter],
                    ["right", AlignRight],
                  ].map(([value, Icon]) => {
                    const AlignmentIcon =
                      Icon as typeof AlignLeft;

                    return (
                      <button
                        key={String(value)}
                        type="button"
                        onClick={() =>
                          updateField(
                            "textAlign",
                            value as TextEditorState["textAlign"]
                          )
                        }
                        className={[
                          "grid h-10 place-items-center rounded-lg border transition",
                          editorState.textAlign === value
                            ? "border-orange-500 bg-orange-500/10 text-orange-400"
                            : "border-zinc-700 bg-zinc-900 text-zinc-400",
                        ].join(" ")}
                      >
                        <AlignmentIcon size={18} />
                      </button>
                    );
                  })}
                </div>

                <RangeField
                  label="المسافة بين الحروف"
                  value={editorState.charSpacing}
                  min={-100}
                  max={500}
                  step={10}
                  suffix=""
                  onChange={(value) =>
                    updateField("charSpacing", value)
                  }
                />

                <RangeField
                  label="ارتفاع السطر"
                  value={editorState.lineHeight}
                  min={0.8}
                  max={2.5}
                  step={0.05}
                  suffix=""
                  onChange={(value) =>
                    updateField("lineHeight", value)
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <h5 className="mb-3 font-bold text-white">
                Fill & Opacity
              </h5>

              <div className="flex flex-wrap gap-2">
                {quickColors.map((quickColor) => (
                  <button
                    key={quickColor}
                    type="button"
                    onClick={() =>
                      updateField("color", quickColor)
                    }
                    className={[
                      "size-8 rounded-full border-2 transition",
                      editorState.color === quickColor
                        ? "scale-110 border-orange-500"
                        : "border-zinc-700",
                    ].join(" ")}
                    style={{
                      backgroundColor: quickColor,
                    }}
                  />
                ))}

                <input
                  type="color"
                  value={editorState.color}
                  onChange={(event) =>
                    updateField(
                      "color",
                      event.target.value
                    )
                  }
                  className="size-8 cursor-pointer rounded-full bg-transparent p-0"
                />
              </div>

              <div className="mt-4">
                <RangeField
                  label="الشفافية"
                  value={Math.round(
                    editorState.opacity * 100
                  )}
                  min={10}
                  max={100}
                  step={1}
                  suffix="%"
                  onChange={(value) =>
                    updateField(
                      "opacity",
                      value / 100
                    )
                  }
                />
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <h5 className="mb-3 font-bold text-white">
                Stroke
              </h5>

              <div className="grid gap-3 sm:grid-cols-2">
                <ColorField
                  label="لون الحدود"
                  value={editorState.strokeColor}
                  onChange={(value) =>
                    updateField("strokeColor", value)
                  }
                />

                <RangeField
                  label="سماكة الحدود"
                  value={editorState.strokeWidth}
                  min={0}
                  max={12}
                  step={1}
                  suffix="px"
                  onChange={(value) =>
                    updateField("strokeWidth", value)
                  }
                />
              </div>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={17}
                    className="text-orange-400"
                  />
                  <h5 className="font-bold text-white">
                    Shadow
                  </h5>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "shadowEnabled",
                      !editorState.shadowEnabled
                    )
                  }
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-bold transition",
                    editorState.shadowEnabled
                      ? "border-orange-500 bg-orange-500/10 text-orange-400"
                      : "border-zinc-700 bg-zinc-900 text-zinc-400",
                  ].join(" ")}
                >
                  {editorState.shadowEnabled
                    ? "مفعّل"
                    : "متوقف"}
                </button>
              </div>

              <div
                className={
                  editorState.shadowEnabled
                    ? "space-y-3"
                    : "pointer-events-none space-y-3 opacity-40"
                }
              >
                <ColorField
                  label="لون الظل"
                  value={editorState.shadowColor}
                  onChange={(value) =>
                    updateField("shadowColor", value)
                  }
                />

                <RangeField
                  label="Blur"
                  value={editorState.shadowBlur}
                  min={0}
                  max={40}
                  step={1}
                  suffix="px"
                  onChange={(value) =>
                    updateField("shadowBlur", value)
                  }
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  <RangeField
                    label="X"
                    value={editorState.shadowOffsetX}
                    min={-30}
                    max={30}
                    step={1}
                    suffix="px"
                    onChange={(value) =>
                      updateField(
                        "shadowOffsetX",
                        value
                      )
                    }
                  />

                  <RangeField
                    label="Y"
                    value={editorState.shadowOffsetY}
                    min={-30}
                    max={30}
                    step={1}
                    suffix="px"
                    onChange={(value) =>
                      updateField(
                        "shadowOffsetY",
                        value
                      )
                    }
                  />
                </div>
              </div>
            </section>

            {!isEditing ? (
              <button
                type="button"
                onClick={handleAddText}
                disabled={!editorState.text.trim()}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 font-bold text-white transition hover:bg-orange-400 disabled:opacity-50"
              >
                <Plus size={18} />
                إضافة النص إلى التصميم
              </button>
            ) : (
              <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-center text-sm font-bold text-green-400">
                جميع التغييرات تطبق مباشرة
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type RangeFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
};

function RangeField({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: RangeFieldProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-zinc-400">
          {label}
        </span>

        <span className="text-xs text-zinc-500">
          {Number(value.toFixed(2))}
          {suffix}
        </span>
      </div>

      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) =>
          onChange(Number(event.target.value))
        }
        className="w-full accent-orange-500"
      />
    </label>
  );
}

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorField({
  label,
  value,
  onChange,
}: ColorFieldProps) {
  return (
    <label className="flex h-11 items-center justify-between gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-3">
      <span className="text-xs font-bold text-zinc-400">
        {label}
      </span>

      <input
        type="color"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="size-7 cursor-pointer bg-transparent p-0"
      />
    </label>
  );
}
