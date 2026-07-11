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
      تحويل موضع منطقة الطباعة
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
      إنشاء Safe Area داخل منطقة الطباعة.
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
      printAreaWidth -
      safeInset * 2;

    const safeAreaHeight =
      printAreaHeight -
      safeInset * 2;

    const safeAreaRight =
      safeAreaLeft + safeAreaWidth;

    const safeAreaBottom =
      safeAreaTop + safeAreaHeight;

    /*
      إطار منطقة الطباعة الخارجي.
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
      إطار Safe Area الداخلي.
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
      خط Snap عمودي.
      يتحرك إلى اليسار أو الوسط أو اليمين.
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
      خط Snap أفقي.
      يتحرك إلى الأعلى أو الوسط أو الأسفل.
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

    const hideSnapGuides = () => {
      verticalGuide.set({
        visible: false,
      });

      horizontalGuide.set({
        visible: false,
      });
    };

    const showVerticalGuide = (
      x: number
    ) => {
      verticalGuide.set({
        x1: x,
        y1: printAreaTop,
        x2: x,
        y2: printAreaBottom,
        visible: true,
      });
    };

    const showHorizontalGuide = (
      y: number
    ) => {
      horizontalGuide.set({
        x1: printAreaLeft,
        y1: y,
        x2: printAreaRight,
        y2: y,
        visible: true,
      });
    };

    /*
      فحص التصميم داخل Safe Area.
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

      const feedbackColor =
        insideSafeArea
          ? "#22c55e"
          : "#ef4444";

      object.set({
        borderColor: feedbackColor,
        cornerColor: feedbackColor,
      });

      safeAreaBorder.set({
        stroke: feedbackColor,
      });
    };

    /*
      Snap للمركز والحواف.
    */
    const applySmartSnap = (
      object: FabricObject
    ) => {
      if (
        object.get("name") !==
        "uploaded-design"
      ) {
        return;
      }

      hideSnapGuides();

      object.setCoords();

      const bounds =
        object.getBoundingRect();

      const objectLeft = bounds.left;
      const objectTop = bounds.top;

      const objectRight =
        bounds.left + bounds.width;

      const objectBottom =
        bounds.top + bounds.height;

      const objectCenterX =
        bounds.left + bounds.width / 2;

      const objectCenterY =
        bounds.top + bounds.height / 2;

      let moveX = 0;
      let moveY = 0;

      let snappedX = false;
      let snappedY = false;

      /*
        Snap أفقي:
        يسار، مركز، يمين.
      */
      if (
        Math.abs(
          objectCenterX -
            printAreaCenterX
        ) <= SNAP_DISTANCE
      ) {
        moveX =
          printAreaCenterX -
          objectCenterX;

        snappedX = true;

        showVerticalGuide(
          printAreaCenterX
        );
      } else if (
        Math.abs(
          objectLeft -
            printAreaLeft
        ) <= SNAP_DISTANCE
      ) {
        moveX =
          printAreaLeft -
          objectLeft;

        snappedX = true;

        showVerticalGuide(
          printAreaLeft
        );
      } else if (
        Math.abs(
          objectRight -
            printAreaRight
        ) <= SNAP_DISTANCE
      ) {
        moveX =
          printAreaRight -
          objectRight;

        snappedX = true;

        showVerticalGuide(
          printAreaRight
        );
      }

      /*
        Snap عمودي:
        أعلى، مركز، أسفل.
      */
      if (
        Math.abs(
          objectCenterY -
            printAreaCenterY
        ) <= SNAP_DISTANCE
      ) {
        moveY =
          printAreaCenterY -
          objectCenterY;

        snappedY = true;

        showHorizontalGuide(
          printAreaCenterY
        );
      } else if (
        Math.abs(
          objectTop -
            printAreaTop
        ) <= SNAP_DISTANCE
      ) {
        moveY =
          printAreaTop -
          objectTop;

        snappedY = true;

        showHorizontalGuide(
          printAreaTop
        );
      } else if (
        Math.abs(
          objectBottom -
            printAreaBottom
        ) <= SNAP_DISTANCE
      ) {
        moveY =
          printAreaBottom -
          objectBottom;

        snappedY = true;

        showHorizontalGuide(
          printAreaBottom
        );
      }

      if (snappedX || snappedY) {
        const currentCenter =
          object.getCenterPoint();

        object.setPositionByOrigin(
          new Point(
            currentCenter.x + moveX,
            currentCenter.y + moveY
          ),
          "center",
          "center"
        );

        object.setCoords();
      }
    };

    /*
      منع التصميم من الخروج
      من Print Area.
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
        إذا أصبح أكبر من منطقة الطباعة،
        يتم تصغيره تلقائياً.
      */
      if (
        bounds.width > printAreaWidth ||
        bounds.height > printAreaHeight
      ) {
        const widthCorrection =
          printAreaWidth /
          bounds.width;

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
          printAreaLeft -
          bounds.left;
      }

      if (
        objectRight > printAreaRight
      ) {
        correctionX =
          printAreaRight -
          objectRight;
      }

      if (
        bounds.top < printAreaTop
      ) {
        correctionY =
          printAreaTop -
          bounds.top;
      }

      if (
        objectBottom >
        printAreaBottom
      ) {
        correctionY =
          printAreaBottom -
          objectBottom;
      }

      if (
        correctionX !== 0 ||
        correctionY !== 0
      ) {
        const currentCenter =
          object.getCenterPoint();

        object.setPositionByOrigin(
          new Point(
            currentCenter.x +
              correctionX,

            currentCenter.y +
              correctionY
          ),
          "center",
          "center"
        );

        object.setCoords();
      }

      updateSafeAreaFeedback(object);
    };

    canvas.on(
      "object:moving",
      (event) => {
        const object = event.target;

        if (!object) return;

        applySmartSnap(object);
        lockObjectInsidePrintArea(
          object
        );

        canvas.requestRenderAll();
      }
    );

    canvas.on(
      "object:scaling",
      (event) => {
        const object = event.target;

        if (!object) return;

        hideSnapGuides();

        lockObjectInsidePrintArea(
          object
        );

        canvas.requestRenderAll();
      }
    );

    canvas.on(
      "object:rotating",
      (event) => {
        const object = event.target;

        if (!object) return;

        hideSnapGuides();

        lockObjectInsidePrintArea(
          object
        );

        canvas.requestRenderAll();
      }
    );

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

    canvas.on("mouse:up", () => {
      hideSnapGuides();
      canvas.requestRenderAll();
    });

    /*
      تحميل الصورة داخل المحرر.
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
            image.width ||
            printAreaWidth;

          const imageHeight =
            image.height ||
            printAreaHeight;

          /*
            إدخال الصورة أولاً
            داخل Safe Area.
          */
          const scale = Math.min(
            safeAreaWidth /
              imageWidth,

            safeAreaHeight /
              imageHeight,

            1
          );

          image.set({
            name: "uploaded-design",

            left: printAreaCenterX,
            top: printAreaCenterY,

            originX: "center",
            originY: "center",

            angle:
              placement.rotate ?? 0,

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