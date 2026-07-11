"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";

import DesignerToolbar from "./DesignerToolbar";
import FabricEngine, {
  type FabricEngineHandle,
  type TextEditorState,
} from "./FabricEngine";
import LayerManager from "./layers/LayerManager";
import MockupLayer from "./MockupLayer";

import {
  getDesignPlacement,
} from "@/lib/placements";

import type { Layer } from "./types/layer";

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
  const fabricEngineRef =
    useRef<FabricEngineHandle | null>(null);

  const [layers, setLayers] =
    useState<Layer[]>([]);

  const [
    selectedLayerId,
    setSelectedLayerId,
  ] = useState<string | null>(null);

  const [
    selectedText,
    setSelectedText,
  ] = useState<TextEditorState | null>(
    null
  );

  const placement =
    getDesignPlacement(product);

  const handleLayersChange =
    useCallback((nextLayers: Layer[]) => {
      setLayers(nextLayers);
    }, []);

  const handleSelectionChange =
    useCallback(
      (layerId: string | null) => {
        setSelectedLayerId(layerId);
      },
      []
    );

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/20">
      <header className="border-b border-zinc-800 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              AI Print Studio
            </h3>

            <p className="mt-1.5 text-sm leading-6 text-zinc-400">
              حرّك التصميم وكبّره ودوّره مباشرة فوق المنتج.
            </p>
          </div>

          <div className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-400">
            {layers.length} طبقة
          </div>
        </div>
      </header>

      <div className="space-y-5 p-4 sm:p-5">
        <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner">
          <MockupLayer
            product={product}
            color={color}
          />

          {product && (
            <FabricEngine
              ref={fabricEngineRef}
              preview={preview}
              placement={placement}
              onLayersChange={
                handleLayersChange
              }
              onSelectedLayerChange={
                handleSelectionChange
              }
              onSelectedTextChange={
                setSelectedText
              }
            />
          )}
        </div>

        <LayerManager
          layers={layers}
          selectedLayerId={
            selectedLayerId
          }
          onSelectLayer={(id) =>
            fabricEngineRef.current?.selectLayer(
              id
            )
          }
          onToggleVisibility={(id) =>
            fabricEngineRef.current?.toggleLayerVisibility(
              id
            )
          }
          onToggleLock={(id) =>
            fabricEngineRef.current?.toggleLayerLock(
              id
            )
          }
          onDeleteLayer={(id) =>
            fabricEngineRef.current?.deleteLayer(
              id
            )
          }
          onMoveLayerUp={(id) =>
            fabricEngineRef.current?.moveLayerUp(
              id
            )
          }
          onMoveLayerDown={(id) =>
            fabricEngineRef.current?.moveLayerDown(
              id
            )
          }
        />
      </div>

      <DesignerToolbar
        selectedText={selectedText}
        onAddText={(
          text,
          options
        ) =>
          fabricEngineRef.current?.addText(
            text,
            options
          )
        }
        onUpdateSelectedText={(
          options
        ) =>
          fabricEngineRef.current?.updateSelectedText(
            options
          )
        }
      />
    </section>
  );
}
