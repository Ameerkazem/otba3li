"use client";

import { useEffect, useRef } from "react";
import {
  Canvas,
  FabricImage,
  FabricObject,
  Line,
  Point,
  Rect,
} from "fabric";

import type { DesignPlacement } from "@/lib/placements";

type FabricEngineProps = {
  preview: string;
  placement: DesignPlacement;
};

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const SNAP_DISTANCE = 8;

function percentageToPixels(
  value: string,
  total: number
) {
  if (value.endsWith("%")) {
    return (
      (Number.parseFloat(value) / 100) *
      total
    );
  }

  return Number.parseFloat(value);
}

export default function FabricEngine({
  preview,
  placement,
}: FabricEngineProps) {
  const htmlCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const fabricCanvasRef =
    useRef<Canvas | null>(null);

  useEffect(() => {
    if (!htmlCanvasRef.current) return;

    let cancelled = false;

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

    /*
      تحويل قيم placements.ts
      من النسب المئوية إلى Pixels.
    */
    const printAreaCenterX =
      percentageToPixels(
        placement.left,
        CANVAS_WIDTH
      );

    const printAreaCenterY =
      percentageToPixels(
        placement.top,
        CANVAS_HEIGHT
      );

    const printAreaWidth =
      percentageToPixels(
        placement.width,
        CANVAS_WIDTH
      );

    const printAreaHeight =
      percentageToPixels(
        placement.height,
        CANVAS_HEIGHT
      );

    const printAreaLeft =
      printAreaCenterX -
      printAreaWidth / 2;

    const printAreaTop =
      printAreaCenterY -
      printAreaHeight / 2;

    const printAreaRight =
      printAreaLeft + printAreaWidth;

    const printAreaBottom =
      printAreaTop + printAreaHeight;

    /*
      المنطقة الآمنة تكون أصغر بقليل
      من منطقة الطباعة الأساسية.
    */
    const safeInset = Math.max(
      10,
      Math.min(
        printAreaWidth,
        printAreaHeight
      ) * 0.08
    );

    const safeAreaLeft =
      printAreaLeft + safeInset;

    const safeAreaTop =
      printAreaTop + safeInset;

    const safeAreaWidth =
      printAreaWidth - safeInset * 2;

    const safeAreaHeight =
      printAreaHeight - safeInset * 2;

    const safeAreaRight =
      safeAreaLeft + safeAreaWidth;

    const safeAreaBottom =
      safeAreaTop + safeAreaHeight;

    /*
      الإطار الخارجي لمنطقة الطباعة.
    */
    const printAreaBorder = new Rect({
      name: "print-area-border",

      left: printAreaCenterX,
      top: printAreaCenterY,

      width: printAreaWidth,
      height: printAreaHeight,

      originX: "center",
      originY: "center",

      angle: placement.rotate ?? 0,

      fill: "transparent",

      stroke: "#f97316",
      strokeWidth: 2,
      strokeDashArray: [8, 6],

      selectable: false,
      evented: false,

      excludeFromExport: true,
    });

    /*
      الإطار الداخلي للمنطقة الآمنة.
    */
    const safeAreaBorder = new Rect({
      name: "safe-area-border",

      left: printAreaCenterX,
      top: printAreaCenterY,

      width: safeAreaWidth,
      height: safeAreaHeight,

      originX: "center",
      originY: "center",

      angle: placement.rotate ?? 0,

      fill: "transparent",

      stroke: "#22c55e",
      strokeWidth: 1,
      strokeDashArray: [4, 4],

      selectable: false,
      evented: false,

      excludeFromExport: true,
    });

    /*
      خط الالتقاط العمودي.
    */
    const verticalGuide = new Line(
      [
        printAreaCenterX,
        printAreaTop,
        printAreaCenterX,
        printAreaBottom,
      ],
      {
        name: "vertical-snap-guide",

        stroke: "#38bdf8",
        strokeWidth: 1,
        strokeDashArray: [5, 5],

        selectable: false,
        evented: false,
        visible: false,

        excludeFromExport: true,
      }
    );

    /*
      خط الالتقاط الأفقي.
    */
    const horizontalGuide = new Line(
      [
        printAreaLeft,
        printAreaCenterY,
        printAreaRight,
        printAreaCenterY,
      ],
      {
        name: "horizontal-snap-guide",

        stroke: "#38bdf8",
        strokeWidth: 1,
        strokeDashArray: [5, 5],

        selectable: false,
        evented: false,
        visible: false,

        excludeFromExport: true,
      }
    );

    canvas.add(
      printAreaBorder,
      safeAreaBorder,
      verticalGuide,
      horizontalGuide
    );

    /*
      إخفاء خطوط Snap Guides.
    */
    const hideSnapGuides = () => {
      verticalGuide.set({
        visible: false,
      });

      horizontalGuide.set({
        visible: false,
      });
    };

    /*
      التحقق من وجود التصميم داخل Safe Area.
    */
    const updateSafeAreaFeedback = (
      object: FabricObject
    ) => {
      object.setCoords();

      const bounds =
        object.getBoundingRect();

      const objectRight =
        bounds.left + bounds.width;

      const objectBottom =
        bounds.top + bounds.height;

      const insideSafeArea =
        bounds.left >= safeAreaLeft &&
        bounds.top >= safeAreaTop &&
        objectRight <= safeAreaRight &&
        objectBottom <= safeAreaBottom;

      object.set({
        borderColor: insideSafeArea
          ? "#22c55e"
          : "#ef4444",

        cornerColor: insideSafeArea
          ? "#22c55e"
          : "#ef4444",
      });

      safeAreaBorder.set({
        stroke: insideSafeArea
          ? "#22c55e"
          : "#ef4444",
      });
    };

    /*
      Snap إلى منتصف منطقة الطباعة.
    */
    const applySnapGuides = (
      object: FabricObject
    ) => {
      object.setCoords();

      const objectCenter =
        object.getCenterPoint();

      let nextCenterX = objectCenter.x;
      let nextCenterY = objectCenter.y;

      let snappedX = false;
      let snappedY = false;

      if (
        Math.abs(
          objectCenter.x -
            printAreaCenterX
        ) <= SNAP_DISTANCE
      ) {
        nextCenterX =
          printAreaCenterX;

        snappedX = true;
      }

      if (
        Math.abs(
          objectCenter.y -
            printAreaCenterY
        ) <= SNAP_DISTANCE
      ) {
        nextCenterY =
          printAreaCenterY;

        snappedY = true;
      }

      if (snappedX || snappedY) {
        object.setPositionByOrigin(
          new Point(
            nextCenterX,
            nextCenterY
          ),
          "center",
          "center"
        );

        object.setCoords();
      }

      verticalGuide.set({
        visible: snappedX,
      });

      horizontalGuide.set({
        visible: snappedY,
      });
    };

    /*
      منع التصميم من تجاوز منطقة الطباعة.
    */
    const lockObjectInsidePrintArea = (
      object: FabricObject
    ) => {
      if (
        object.get("name") !==
        "uploaded-design"
      ) {
        return;
      }

      object.setCoords();

      let bounds =
        object.getBoundingRect();

      /*
        إذا أصبح التصميم أكبر من المنطقة
        يتم تصغيره تلقائياً.
      */
      if (
        bounds.width > printAreaWidth ||
        bounds.height > printAreaHeight
      ) {
        const widthCorrection =
          printAreaWidth / bounds.width;

        const heightCorrection =
          printAreaHeight /
          bounds.height;

        const correction = Math.min(
          widthCorrection,
          heightCorrection
        );

        object.set({
          scaleX:
            (object.scaleX ?? 1) *
            correction,

          scaleY:
            (object.scaleY ?? 1) *
            correction,
        });

        object.setCoords();

        bounds =
          object.getBoundingRect();
      }

      const objectRight =
        bounds.left + bounds.width;

      const objectBottom =
        bounds.top + bounds.height;

      let correctionX = 0;
      let correctionY = 0;

      if (
        bounds.left < printAreaLeft
      ) {
        correctionX =
          printAreaLeft - bounds.left;
      }

      if (
        objectRight > printAreaRight
      ) {
        correctionX =
          printAreaRight - objectRight;
      }

      if (
        bounds.top < printAreaTop
      ) {
        correctionY =
          printAreaTop - bounds.top;
      }

      if (
        objectBottom > printAreaBottom
      ) {
        correctionY =
          printAreaBottom - objectBottom;
      }

      object.set({
        left:
          (object.left ?? 0) +
          correctionX,

        top:
          (object.top ?? 0) +
          correctionY,
      });

      object.setCoords();

      updateSafeAreaFeedback(object);
    };

    /*
      أثناء تحريك التصميم.
    */
    canvas.on(
      "object:moving",
      (event) => {
        const object = event.target;

        if (!object) return;

        applySnapGuides(object);
        lockObjectInsidePrintArea(object);

        canvas.requestRenderAll();
      }
    );

    /*
      أثناء التكبير والتصغير.
    */
    canvas.on(
      "object:scaling",
      (event) => {
        const object = event.target;

        if (!object) return;

        hideSnapGuides();
        lockObjectInsidePrintArea(object);

        canvas.requestRenderAll();
      }
    );

    /*
      أثناء الدوران.
    */
    canvas.on(
      "object:rotating",
      (event) => {
        const object = event.target;

        if (!object) return;

        hideSnapGuides();
        lockObjectInsidePrintArea(object);

        canvas.requestRenderAll();
      }
    );

    /*
      بعد انتهاء التعديل.
    */
    canvas.on(
      "object:modified",
      (event) => {
        const object = event.target;

        hideSnapGuides();

        if (object) {
          lockObjectInsidePrintArea(
            object
          );
        }

        canvas.requestRenderAll();
      }
    );

    canvas.on(
      "mouse:up",
      () => {
        hideSnapGuides();
        canvas.requestRenderAll();
      }
    );

    /*
      تحميل التصميم داخل Fabric.
    */
    const addDesignToCanvas =
      async () => {
        if (!preview) {
          canvas.requestRenderAll();
          return;
        }

        try {
          const image =
            await FabricImage.fromURL(
              preview
            );

          if (cancelled) return;

          const imageWidth =
            image.width || printAreaWidth;

          const imageHeight =
            image.height || printAreaHeight;

          /*
            ندخل التصميم بحجم لا يتجاوز
            المنطقة الآمنة عند الرفع.
          */
          const scale = Math.min(
            safeAreaWidth / imageWidth,
            safeAreaHeight / imageHeight,
            1
          );

          image.set({
            name: "uploaded-design",

            left: printAreaCenterX,
            top: printAreaCenterY,

            originX: "center",
            originY: "center",

            angle: placement.rotate ?? 0,

            cornerStyle: "circle",
            cornerColor: "#22c55e",
            borderColor: "#22c55e",

            transparentCorners: false,
            padding: 6,

            lockScalingFlip: true,
          });

          image.scale(scale);

          canvas.add(image);
          canvas.setActiveObject(image);

          image.setCoords();

          updateSafeAreaFeedback(image);

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
      cancelled = true;

      canvas.dispose();

      fabricCanvasRef.current = null;
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