"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Canvas,
  FabricImage,
  FabricObject,
  Line,
  Point,
  Rect,
  Shadow,
  Textbox,
} from "fabric";

import type { DesignPlacement } from "@/lib/placements";
import type { Layer } from "./types/layer";
import { percentageToPixels } from "./utils/percentageToPixels";

type FabricEngineProps = {
  preview: string;
  placement: DesignPlacement;
  onLayersChange?: (layers: Layer[]) => void;
  onSelectedLayerChange?: (layerId: string | null) => void;
  onSelectedTextChange?: (
    textState: TextEditorState | null
  ) => void;
};

export type AddTextOptions = {
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  strokeColor?: string;
  strokeWidth?: number;
  shadowEnabled?: boolean;
  shadowColor?: string;
};

export type TextEditorState = {
  text: string;
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: "left" | "center" | "right";
  charSpacing: number;
  lineHeight: number;
  opacity: number;
  strokeColor: string;
  strokeWidth: number;
  shadowEnabled: boolean;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
};

export type UpdateTextOptions =
  Partial<TextEditorState>;

export type FabricEngineHandle = {
  addText: (
    text: string,
    options?: AddTextOptions
  ) => void;
  updateSelectedText: (
    options: UpdateTextOptions
  ) => void;
  selectLayer: (layerId: string) => void;
  toggleLayerVisibility: (layerId: string) => void;
  toggleLayerLock: (layerId: string) => void;
  deleteLayer: (layerId: string) => void;
  moveLayerUp: (layerId: string) => void;
  moveLayerDown: (layerId: string) => void;
};

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const SNAP_DISTANCE = 8;

function isUserLayer(object: FabricObject) {
  return Boolean(object.get("layerId"));
}

function findLayerObject(
  canvas: Canvas,
  layerId: string
) {
  return canvas
    .getObjects()
    .find(
      (object) =>
        object.get("layerId") === layerId
    );
}

const FabricEngine = forwardRef<
  FabricEngineHandle,
  FabricEngineProps
>(function FabricEngine(
  {
    preview,
    placement,
    onLayersChange,
    onSelectedLayerChange,
    onSelectedTextChange,
  },
  ref
) {
  const htmlCanvasRef =
    useRef<HTMLCanvasElement | null>(null);

  const fabricCanvasRef =
    useRef<Canvas | null>(null);

  const emitLayers = useCallback(
    (canvas: Canvas) => {
      const layers: Layer[] = canvas
        .getObjects()
        .filter(isUserLayer)
        .map((object, index) => ({
          id: String(object.get("layerId")),
          name:
            String(
              object.get("layerName") ??
                `طبقة ${index + 1}`
            ),
          type:
            (object.get("layerType") ??
              "image") as Layer["type"],
          visible: object.visible !== false,
          locked:
            object.get("layerLocked") === true,
        }));

      onLayersChange?.(layers);
    },
    [onLayersChange]
  );

  const emitSelection = useCallback(
    (canvas: Canvas) => {
      const activeObject =
        canvas.getActiveObject();

      const layerId =
        activeObject &&
        isUserLayer(activeObject)
          ? String(
              activeObject.get("layerId")
            )
          : null;

      onSelectedLayerChange?.(layerId);
    },
    [onSelectedLayerChange]
  );

  const emitSelectedText = useCallback(
    (canvas: Canvas) => {
      const activeObject =
        canvas.getActiveObject();

      if (!(activeObject instanceof Textbox)) {
        onSelectedTextChange?.(null);
        return;
      }

      const shadow =
        activeObject.shadow instanceof Shadow
          ? activeObject.shadow
          : null;

      onSelectedTextChange?.({
        text: activeObject.text ?? "",
        color:
          typeof activeObject.fill === "string"
            ? activeObject.fill
            : "#111111",
        fontSize:
          activeObject.fontSize ?? 34,
        fontFamily:
          activeObject.fontFamily ?? "Arial",
        fontWeight:
          String(
            activeObject.fontWeight ?? "700"
          ),
        textAlign:
          (activeObject.textAlign ??
            "center") as "left" | "center" | "right",
        charSpacing:
          activeObject.charSpacing ?? 0,
        lineHeight:
          activeObject.lineHeight ?? 1.16,
        opacity:
          activeObject.opacity ?? 1,
        strokeColor:
          typeof activeObject.stroke === "string"
            ? activeObject.stroke
            : "#ffffff",
        strokeWidth:
          activeObject.strokeWidth ?? 0,
        shadowEnabled: Boolean(shadow),
        shadowColor:
          shadow?.color ?? "#000000",
        shadowBlur:
          shadow?.blur ?? 8,
        shadowOffsetX:
          shadow?.offsetX ?? 3,
        shadowOffsetY:
          shadow?.offsetY ?? 3,
      });
    },
    [onSelectedTextChange]
  );

  useImperativeHandle(
    ref,
    () => ({
      addText(text, options) {
        const canvas =
          fabricCanvasRef.current;

        const cleanText = text.trim();

        if (!canvas || !cleanText) return;

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

        const safeInset = Math.max(
          10,
          Math.min(
            printAreaWidth,
            printAreaHeight
          ) * 0.08
        );

        const safeAreaWidth =
          printAreaWidth - safeInset * 2;

        const layerId =
          `text-layer-${Date.now()}`;

        const textObject = new Textbox(
          cleanText,
          {
            left: printAreaCenterX,
            top: printAreaCenterY,
            width: Math.max(
              40,
              safeAreaWidth * 0.9
            ),

            originX: "center",
            originY: "center",

            angle:
              placement.rotate ?? 0,

            fill:
              options?.color ?? "#111111",

            fontSize:
              options?.fontSize ?? 34,

            fontFamily:
              options?.fontFamily ?? "Arial",

            fontWeight:
              options?.fontWeight ?? "700",

            textAlign: "center",
            charSpacing: 0,
            lineHeight: 1.16,
            opacity: 1,

            stroke:
              options?.strokeWidth &&
              options.strokeWidth > 0
                ? options.strokeColor ?? "#ffffff"
                : undefined,

            strokeWidth:
              options?.strokeWidth ?? 0,

            paintFirst: "stroke",

            shadow:
              options?.shadowEnabled
                ? new Shadow({
                    color:
                      options.shadowColor ??
                      "rgba(0,0,0,0.45)",
                    blur: 8,
                    offsetX: 3,
                    offsetY: 3,
                  })
                : undefined,

            textAlign: "center",
            direction: "rtl",
            splitByGrapheme: true,

            cornerStyle: "circle",
            cornerColor: "#22c55e",
            borderColor: "#22c55e",
            transparentCorners: false,
            padding: 6,
            lockScalingFlip: true,
          }
        );

        textObject.set({
          name: "text-design",
          layerId,
          layerName:
            cleanText.length > 18
              ? `${cleanText.slice(0, 18)}...`
              : cleanText,
          layerType: "text",
          layerLocked: false,
        });

        canvas.add(textObject);
        canvas.setActiveObject(textObject);

        textObject.setCoords();
        canvas.requestRenderAll();

        emitLayers(canvas);
        emitSelection(canvas);
      },

      updateSelectedText(options) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const activeObject =
          canvas.getActiveObject();

        if (!(activeObject instanceof Textbox)) {
          return;
        }

        if (options.text !== undefined) {
          const cleanText =
            options.text.trimStart();

          activeObject.set({
            text: cleanText,
            layerName:
              cleanText.length > 18
                ? `${cleanText.slice(0, 18)}...`
                : cleanText || "نص",
          });
        }

        if (options.color !== undefined) {
          activeObject.set({
            fill: options.color,
          });
        }

        if (
          options.fontSize !== undefined
        ) {
          activeObject.set({
            fontSize: options.fontSize,
          });
        }

        if (
          options.fontFamily !== undefined
        ) {
          activeObject.set({
            fontFamily:
              options.fontFamily,
          });
        }

        if (
          options.fontWeight !== undefined
        ) {
          activeObject.set({
            fontWeight:
              options.fontWeight,
          });
        }

        if (
          options.textAlign !== undefined
        ) {
          activeObject.set({
            textAlign:
              options.textAlign,
          });
        }

        if (
          options.charSpacing !== undefined
        ) {
          activeObject.set({
            charSpacing:
              options.charSpacing,
          });
        }

        if (
          options.lineHeight !== undefined
        ) {
          activeObject.set({
            lineHeight:
              options.lineHeight,
          });
        }

        if (
          options.opacity !== undefined
        ) {
          activeObject.set({
            opacity:
              options.opacity,
          });
        }

        if (
          options.strokeWidth !== undefined
        ) {
          activeObject.set({
            strokeWidth:
              options.strokeWidth,
            stroke:
              options.strokeWidth > 0
                ? options.strokeColor ??
                  (typeof activeObject.stroke ===
                  "string"
                    ? activeObject.stroke
                    : "#ffffff")
                : undefined,
          });
        }

        if (
          options.strokeColor !== undefined &&
          (options.strokeWidth ??
            activeObject.strokeWidth ??
            0) > 0
        ) {
          activeObject.set({
            stroke: options.strokeColor,
          });
        }

        if (
          options.shadowEnabled !== undefined ||
          options.shadowColor !== undefined ||
          options.shadowBlur !== undefined ||
          options.shadowOffsetX !== undefined ||
          options.shadowOffsetY !== undefined
        ) {
          const currentShadow =
            activeObject.shadow instanceof Shadow
              ? activeObject.shadow
              : null;

          const enabled =
            options.shadowEnabled ??
            Boolean(currentShadow);

          activeObject.set({
            shadow: enabled
              ? new Shadow({
                  color:
                    options.shadowColor ??
                    currentShadow?.color ??
                    "#000000",
                  blur:
                    options.shadowBlur ??
                    currentShadow?.blur ??
                    8,
                  offsetX:
                    options.shadowOffsetX ??
                    currentShadow?.offsetX ??
                    3,
                  offsetY:
                    options.shadowOffsetY ??
                    currentShadow?.offsetY ??
                    3,
                })
              : undefined,
          });
        }

        activeObject.setCoords();
        canvas.requestRenderAll();

        emitLayers(canvas);
        emitSelection(canvas);
        emitSelectedText(canvas);
      },

      selectLayer(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (
          !object ||
          object.visible === false ||
          object.get("layerLocked") === true
        ) {
          return;
        }

        canvas.setActiveObject(object);
        canvas.requestRenderAll();
        emitSelection(canvas);
        emitSelectedText(canvas);
      },

      toggleLayerVisibility(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (!object) return;

        const nextVisible =
          object.visible === false;

        object.set({
          visible: nextVisible,
        });

        if (
          !nextVisible &&
          canvas.getActiveObject() === object
        ) {
          canvas.discardActiveObject();
        }

        object.setCoords();
        canvas.requestRenderAll();

        emitLayers(canvas);
        emitSelection(canvas);
      },

      toggleLayerLock(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (!object) return;

        const nextLocked =
          object.get("layerLocked") !== true;

        object.set({
          layerLocked: nextLocked,
          selectable: !nextLocked,
          evented: !nextLocked,
          hasControls: !nextLocked,
          lockMovementX: nextLocked,
          lockMovementY: nextLocked,
          lockRotation: nextLocked,
          lockScalingX: nextLocked,
          lockScalingY: nextLocked,
        });

        if (
          nextLocked &&
          canvas.getActiveObject() === object
        ) {
          canvas.discardActiveObject();
        }

        object.setCoords();
        canvas.requestRenderAll();

        emitLayers(canvas);
        emitSelection(canvas);
      },

      deleteLayer(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (!object) return;

        canvas.remove(object);
        canvas.discardActiveObject();
        canvas.requestRenderAll();

        emitLayers(canvas);
        emitSelection(canvas);
      },

      moveLayerUp(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (!object) return;

        canvas.bringObjectForward(object);
        canvas.requestRenderAll();
        emitLayers(canvas);
      },

      moveLayerDown(layerId) {
        const canvas =
          fabricCanvasRef.current;

        if (!canvas) return;

        const object = findLayerObject(
          canvas,
          layerId
        );

        if (!object) return;

        canvas.sendObjectBackwards(object);
        canvas.requestRenderAll();
        emitLayers(canvas);
      },
    }),
    [emitLayers, emitSelection]
  );

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

    const updateSafeAreaFeedback = (
      object: FabricObject
    ) => {
      if (!isUserLayer(object)) return;

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

    const applySmartSnap = (
      object: FabricObject
    ) => {
      if (!isUserLayer(object)) return;

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

    const lockObjectInsidePrintArea = (
      object: FabricObject
    ) => {
      if (!isUserLayer(object)) return;

      object.setCoords();

      let bounds =
        object.getBoundingRect();

      if (
        bounds.width > printAreaWidth ||
        bounds.height > printAreaHeight
      ) {
        const widthCorrection =
          printAreaWidth / bounds.width;

        const heightCorrection =
          printAreaHeight / bounds.height;

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
        objectBottom > printAreaBottom
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
      "selection:created",
      () => {
        emitSelection(canvas);
        emitSelectedText(canvas);
      }
    );

    canvas.on(
      "selection:updated",
      () => {
        emitSelection(canvas);
        emitSelectedText(canvas);
      }
    );

    canvas.on(
      "selection:cleared",
      () => {
        emitSelection(canvas);
        emitSelectedText(canvas);
      }
    );

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
        emitLayers(canvas);
        emitSelectedText(canvas);
      }
    );

    canvas.on("mouse:up", () => {
      hideSnapGuides();
      canvas.requestRenderAll();
    });

    const addDesignToCanvas =
      async () => {
        if (!preview) {
          emitLayers(canvas);
          emitSelection(canvas);
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

          const scale = Math.min(
            safeAreaWidth / imageWidth,
            safeAreaHeight / imageHeight,
            1
          );

          const layerId =
            `layer-${Date.now()}`;

          image.set({
            name: "uploaded-design",
            layerId,
            layerName: "التصميم",
            layerType: "image",
            layerLocked: false,

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
          emitLayers(canvas);
          emitSelection(canvas);
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

      onLayersChange?.([]);
      onSelectedLayerChange?.(null);
      onSelectedTextChange?.(null);

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
    emitLayers,
    emitSelection,
    emitSelectedText,
    onLayersChange,
    onSelectedLayerChange,
    onSelectedTextChange,
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
});

export default FabricEngine;
