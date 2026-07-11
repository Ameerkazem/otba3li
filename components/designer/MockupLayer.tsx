import { getMockupImage } from "@/lib/mockups";

type MockupLayerProps = {
  product: string;
  color: string;
};

export default function MockupLayer({
  product,
  color,
}: MockupLayerProps) {
  const mockupImage = getMockupImage(product, color);

  if (!product) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <span className="text-6xl">👕</span>

        <p className="mt-5 text-lg font-bold text-white">
          اختر المنتج
        </p>

        <p className="mt-2 text-sm text-gray-500">
          ستظهر صورة المنتج هنا
        </p>
      </div>
    );
  }

  if (!mockupImage) {
    return (
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
    );
  }

  return (
    <img
      key={mockupImage}
      src={mockupImage}
      alt={`معاينة ${product}`}
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
    />
  );
}