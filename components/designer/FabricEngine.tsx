"use client";

import { useEffect, useRef } from "react";
import { Canvas, FabricImage } from "fabric";

type FabricEngineProps = {
  preview: string;
};

export default function FabricEngine({
  preview,
}: FabricEngineProps) {
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
        height: 500,
        backgroundColor: "transparent",
        preserveObjectStacking: true,
        selection: true,
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
          top: 250,
          originX: "center",
          originY: "center",
          cornerColor: "#f97316",
          borderColor: "#f97316",
          cornerStyle: "circle",
          transparentCorners: false,
          padding: 6,
        });

        const maxWidth = 180;
        const maxHeight = 220;

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

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <canvas
        ref={htmlCanvasRef}
        className="max-h-full max-w-full"
      />

      {!preview && (
        <div className="pointer-events-none absolute inset-x-5 bottom-5 z-20 rounded-2xl bg-black/70 px-5 py-3 text-center text-sm text-gray-200 backdrop-blur-md">
          ارفع صورة التصميم حتى تدخل إلى المحرر
        </div>
      )}
    </div>
  );
}