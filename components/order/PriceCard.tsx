import { products } from "@/lib/products";

type PriceCardProps = {
  product: string;
  quantity: number;
};

export default function PriceCard({
  product,
  quantity,
}: PriceCardProps) {
  const selectedProduct = products.find(
    (item) => item.name === product
  );

  const unitPrice = selectedProduct?.price ?? 0;
  const total = unitPrice * quantity;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="text-xl font-bold text-white">
        💰 السعر التقريبي
      </h3>

      {selectedProduct ? (
        <>
          <p className="mt-3 text-sm text-gray-400">
            سعر القطعة: {unitPrice.toLocaleString()} د.ع
          </p>

          <p className="mt-4 text-4xl font-black text-orange-500">
            {total.toLocaleString()} د.ع
          </p>
        </>
      ) : (
        <p className="mt-4 text-gray-500">
          اختر المنتج حتى يظهر السعر
        </p>
      )}
    </div>
  );
}