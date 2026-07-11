"use client";

import { useEffect, useRef } from "react";
import {
  Canvas,
  FabricImage,
} from "fabric";

import type { DesignPlacement } from "@/lib/placements";

type FabricEngineProps = {
  preview: string;
  placement: DesignPlacement;
};

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

/*
  تحول القيمة من:
  "48%"

  إلى رقم:
  48
*/
function percentageToNumber(value: string) {
  return Number.parseFloat(
    value.replace("%", "")
  );
}

/*
  تحول النسبة المئوية إلى Pixel.

  مثال:
  50% من Canvas حجمه 500
  النتيجة = 250px
*/
function percentageToPixels(
  value: string,
  totalSize: number
) {
  const percentage =
    percentageToNumber(value);

  return (percentage / 100) * totalSize;
}

export default function FabricEngine({
  preview,
  placement,
}: FabricEngineProps) {
  const htmlCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const fabricCanvasRef =
    useRef<Canvas | null>(null);

  /*
    هذا الـ useEffect يعمل مرة واحدة فقط.

    مسؤوليته:
    إنشاء Fabric Canvas.
  */
  useEffect(() => {
    if (!htmlCanvasRef.current) return;

    const canvas = new Canvas(
      htmlCanvasRef.current,
      {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
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

  /*
    هذا الـ useEffect يعمل عندما:

    1. تتغير الصورة المرفوعة.
    2. يتغير المنتج ومكان الطباعة.
  */
  useEffect(() => {
    const canvas = fabricCanvasRef.current;

    if (!canvas) return;

    let isCancelled = false;

    const addDesignToCanvas = async () => {
      /*
        نبحث عن التصميم القديم.

        نستخدم الاسم uploaded-design
        حتى لا نحذف أي عناصر أخرى مستقبلًا.
      */
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

      /*
        إذا ماكو صورة مرفوعة،
        ننظف الـ Canvas فقط.
      */
      if (!preview) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        return;
      }

      /*
        نحول معلومات placement
        من النسب المئوية إلى Pixels.
      */
      const placementCenterX =
        percentageToPixels(
          placement.left,
          CANVAS_WIDTH
        );

      const placementCenterY =
        percentageToPixels(
          placement.top,
          CANVAS_HEIGHT
        );

      const placementWidth =
        percentageToPixels(
          placement.width,
          CANVAS_WIDTH
        );

      const placementHeight =
        percentageToPixels(
          placement.height,
          CANVAS_HEIGHT
        );

      try {
        const image =
          await FabricImage.fromURL(preview);

        /*
          إذا تغيرت الصورة أو المكوّن انحذف
          أثناء التحميل، لا نكمل.
        */
        if (isCancelled) return;

        const imageWidth =
          image.width || placementWidth;

        const imageHeight =
          image.height || placementHeight;

        /*
          نحسب Scale حتى تدخل الصورة
          داخل منطقة الطباعة بدون تشويه.

          Math.min يحافظ على نسبة الأبعاد.
        */
        const scale = Math.min(
          placementWidth / imageWidth,
          placementHeight / imageHeight
        );

        image.set({
          name: "uploaded-design",

          /*
            نضع التصميم في مركز
            منطقة الطباعة الخاصة بالمنتج.
          */
          left: placementCenterX,
          top: placementCenterY,

          originX: "center",
          originY: "center",

          angle: placement.rotate ?? 0,

          /*
            تصميم مقابض Fabric.
          */
          cornerColor: "#f97316",
          borderColor: "#f97316",
          cornerStyle: "circle",
          transparentCorners: false,
          padding: 6,

          /*
            نحافظ على تناسب الصورة
            أثناء التكبير والتصغير.
          */
          lockUniScaling: true,
        });

        image.scale(scale);

        image.setCoords();

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

    return () => {
      isCancelled = true;
    };
  }, [
    preview,
    placement.top,
    placement.left,
    placement.width,
    placement.height,
    placement.rotate,
  ]);

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <canvas
        ref={htmlCanvasRef}
        className="block h-full w-full"
      />

      {!preview && (
        <div className="pointer-events-none absolute inset-x-5 bottom-5 z-30 rounded-2xl bg-black/70 px-5 py-3 text-center text-sm text-gray-200 backdrop-blur-md">
          ارفع صورة التصميم حتى تدخل إلى المحرر
        </div>
      )}
    </div>
  );
}