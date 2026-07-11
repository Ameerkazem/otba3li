"use client";

import { useEffect, useRef } from "react";
import {
  Canvas,
  FabricImage,
} from "fabric";

type DesignerCanvasProps = {
  preview: string;
};

export default function DesignerCanvas({
  preview,
}: DesignerCanvasProps) {
  const htmlCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const fabricCanvasRef =
    useRef<Canvas | null>(null);

  useEffect(() => {
    if (!htmlCanvasRef.current) return;

    const canvas = new Canvas(
      htmlCanvasRef.current,
      {
        width: 500,
        height: 600,
        backgroundColor: "#18181b",
        preserveObjectStacking: true,
      }
    );

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    const addDesignToCanvas = async () => {
      // نحذف التصميم السابق فقط
      const oldDesign = canvas
        .getObjects()
        .find(
          (object) =>
            object.get("name") ===
            "uploaded-design"
        );

      if (oldDesign) {
        canvas.remove(oldDesign);
      }

      if (!preview) {
        canvas.requestRenderAll();
        return;
      }

      try {
        const image =
          await FabricImage.fromURL(preview);

        image.set({
          name: "uploaded-design",
          left: 250,
          top: 300,
          originX: "center",
          originY: "center",
          cornerColor: "#f97316",
          borderColor: "#f97316",
          cornerStyle: "circle",
          transparentCorners: false,
          padding: 6,
        });

        const maxWidth = 220;
        const maxHeight = 260;

        const imageWidth =
          image.width || maxWidth;

        const imageHeight =
          image.height || maxHeight;

        const scale = Math.min(
          maxWidth / imageWidth,
          maxHeight / imageHeight,
          1
        );

        image.scale(scale);

        canvas.add(image);
        canvas.setActiveObject(image);
        canvas.requestRenderAll();
      } catch (error) {
        console.error(
          "تعذر تحميل التصميم داخل المحرر:",
          error
        );
      }
    };

    addDesignToCanvas();
  }, [preview]);

  const deleteSelected = () => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    const activeObject =
      canvas.getActiveObject();

    if (!activeObject) return;

    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  };

  const centerDesign = () => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    const activeObject =
      canvas.getActiveObject();

    if (!activeObject) return;

    activeObject.set({
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      originX: "center",
      originY: "center",
    });

    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  const resetDesign = () => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    const activeObject =
      canvas.getActiveObject();

    if (!activeObject) return;

    activeObject.set({
      left: canvas.getWidth() / 2,
      top: canvas.getHeight() / 2,
      angle: 0,
      scaleX: 1,
      scaleY: 1,
      originX: "center",
      originY: "center",
    });

    activeObject.setCoords();
    canvas.requestRenderAll();
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-6">
        <h3 className="text-2xl font-bold">
          محرر التصميم
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          اسحب التصميم، كبّره، صغّره أو دوّره.
        </p>
      </div>

      <div className="p-4 md:p-6">
        <div className="overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
          <canvas ref={htmlCanvasRef} />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={centerDesign}
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-3 font-bold transition hover:border-orange-500"
          >
            توسيط
          </button>

          <button
            type="button"
            onClick={resetDesign}
            className="rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-3 font-bold transition hover:border-orange-500"
          >
            إعادة ضبط
          </button>

          <button
            type="button"
            onClick={deleteSelected}
            className="rounded-xl bg-red-600 px-3 py-3 font-bold transition hover:bg-red-700"
          >
            حذف
          </button>
        </div>

        {!preview && (
          <p className="mt-4 text-center text-sm text-gray-500">
            ارفع صورة أولًا حتى تدخل إلى المحرر.
          </p>
        )}
      </div>
    </div>
  );
}