"use client";

import { getMockupImage } from "@/lib/mockups";
import { getDesignPlacement } from "@/lib/placements";

type ProductPreviewCardProps = {
  product: string;
  color: string;
  size: string;
  quantity: number;
  preview: string;
};

const darkColors = ["أسود", "كحلي", "بني", "رمادي غامق"];

export default function ProductPreviewCard({
  product,
  color,
  size,
  quantity,
  preview,
}: ProductPreviewCardProps) {
  const mockupImage = getMockupImage(product, color);
  const placement = getDesignPlacement(product);

  const isDarkProduct = darkColors.includes(color);

  /*
    على الملابس السوداء:
    - لا نستخدم multiply لأنه يخفي الألوان الداكنة.
    - نزيد السطوع والتباين قليلًا.
    - نضيف توهجًا أبيض خفيفًا حول التصميم.

    على الملابس البيضاء:
    - نستخدم multiply حتى يبدو التصميم جزءًا من القماش.
  */
  const designFilter = isDarkProduct
    ? "brightness(1.18) contrast(1.12) saturate(1.08) drop-shadow(0 0 3px rgba(255,255,255,0.55))"
    : "brightness(1.02) contrast(1.05) saturate(1.05)";

  const designBlendMode = isDarkProduct
    ? "normal"
    : placement.mixBlendMode ?? "multiply";

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 p-6">
        <h3 className="text-2xl font-bold text-white">
          معاينة المنتج
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          شاهد كيف سيظهر التصميم على المنتج
        </p>
      </div>

      <div className="p-6">
        <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-3xl bg-zinc-950">
          {!product && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-6xl">👕</span>

              <p className="mt-5 text-lg font-bold text-white">
                اختر المنتج
              </p>

              <p className="mt-2 text-sm text-gray-500">
                ستظهر معاينة المنتج هنا
              </p>
            </div>
          )}

          {product && mockupImage && (
            <>
              {/* صورة المنتج الأساسية */}
              <img
                key={mockupImage}
                src={mockupImage}
                alt={`معاينة ${product}`}
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* تصميم العميل */}
              {preview && (
                <img
                  src={preview}
                  alt="التصميم المرفوع"
                  className="absolute z-10 object-contain transition-all duration-500"
                  style={{
                    top: placement.top,
                    left: placement.left,
                    width: placement.width,
                    height: placement.height,

                    transform: `
                      translate(-50%, -50%)
                      rotate(${placement.rotate ?? 0}deg)
                    `,

                    borderRadius:
                      placement.borderRadius ?? "0px",

                    mixBlendMode: designBlendMode,

                    filter: designFilter,

                    opacity: 0.98,
                  }}
                />
              )}

              {!preview && (
                <div className="absolute inset-x-5 bottom-5 z-20 rounded-2xl bg-black/70 px-5 py-3 text-center text-sm text-gray-200 backdrop-blur-md">
                  ارفع صورة التصميم حتى تظهر على المنتج
                </div>
              )}

              {/* تنبيه عند اختيار منتج داكن */}
              {preview && isDarkProduct && (
                <div className="absolute bottom-4 left-4 z-20 rounded-full bg-black/75 px-4 py-2 text-xs text-gray-200 backdrop-blur">
                  تم تحسين التصميم للون الداكن
                </div>
              )}
            </>
          )}

          {product && !mockupImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <span className="text-5xl">🖼️</span>

              <p className="mt-5 font-bold text-white">
                صورة الموك أب غير متوفرة
              </p>

              <p className="mt-3 text-sm text-orange-500">
                المنتج: {product}
              </p>

              <p className="mt-1 text-sm text-orange-500">
                اللون: {color || "غير محدد"}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <PreviewInfo
            label="المنتج"
            value={product || "لم يتم الاختيار"}
          />

          <PreviewInfo
            label="اللون"
            value={color || "لم يتم الاختيار"}
          />

          <PreviewInfo
            label="المقاس"
            value={size || "غير مطلوب"}
          />

          <PreviewInfo
            label="الكمية"
            value={quantity.toString()}
          />
        </div>
      </div>
    </div>
  );
}

type PreviewInfoProps = {
  label: string;
  value: string;
};

function PreviewInfo({
  label,
  value,
}: PreviewInfoProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-bold text-orange-500">
        {value}
      </p>
    </div>
  );
}