"use client";

import { useState } from "react";

import ColorPicker from "@/components/order/ColorPicker";
import PriceCard from "@/components/order/PriceCard";
import ProductPreviewCard from "@/components/order/ProductPreviewCard";
import SizePicker from "@/components/order/SizePicker";
import SubmitOrder from "@/components/order/SubmitOrder";
import UploadImage from "@/components/order/UploadImage";


import { products } from "@/lib/products";

export default function OrderPage() {
  const [preview, setPreview] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const selectedProduct = products.find(
    (item) => item.name === product
  );

  const availableSizes = selectedProduct?.sizes ?? [];
  const availableColors = selectedProduct?.colors ?? [];

  const handleProductChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newProduct = event.target.value;

    setProduct(newProduct);
    setSize("");
    setColor("");
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-zinc-950 px-6 py-20 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <h1 className="text-center text-4xl font-black md:text-5xl">
          اطلب <span className="text-orange-500">تصميمك</span>
        </h1>

        <p className="mt-4 text-center text-gray-400">
          اختر المنتج، ارفع تصميمك وشاهد المعاينة مباشرة.
        </p>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* نموذج الطلب */}
          <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
            <div>
              <label
                htmlFor="customer-name"
                className="mb-3 block text-sm font-bold"
              >
                الاسم الكامل
              </label>

              <input
                id="customer-name"
                type="text"
                placeholder="اكتب اسمك الكامل"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="customer-phone"
                className="mb-3 block text-sm font-bold"
              >
                رقم الهاتف
              </label>

              <input
                id="customer-phone"
                type="tel"
                inputMode="tel"
                placeholder="07XXXXXXXXX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="product"
                className="mb-3 block text-sm font-bold"
              >
                اختر المنتج
              </label>

              <select
                id="product"
                value={product}
                onChange={handleProductChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-orange-500"
              >
                <option value="">اختر المنتج</option>

                {products.map((item) => (
                  <option
                    key={item.id}
                    value={item.name}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {availableSizes.length > 0 && (
              <SizePicker
                size={size}
                setSize={setSize}
                sizes={availableSizes}
              />
            )}

            {availableColors.length > 0 && (
              <ColorPicker
                color={color}
                setColor={setColor}
                colors={availableColors}
              />
            )}

            <div>
              <label
                htmlFor="quantity"
                className="mb-3 block text-sm font-bold"
              >
                الكمية
              </label>

              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setQuantity(value < 1 ? 1 : value);
                }}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-orange-500"
              />
            </div>

            <UploadImage
              preview={preview}
              setPreview={setPreview}
            />

            <div>
              <label
                htmlFor="notes"
                className="mb-3 block text-sm font-bold"
              >
                ملاحظات إضافية
              </label>

              <textarea
                id="notes"
                rows={5}
                placeholder="مثلاً: أريد الطباعة على الجهة الأمامية والخلفية..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-orange-500"
              />
            </div>

            <SubmitOrder
              name={name}
              phone={phone}
              product={product}
              size={size}
              color={color}
              quantity={quantity}
              notes={notes}
            />
          </div>

          {/* المعاينة والسعر والمحرر */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <ProductPreviewCard
              product={product}
              color={color}
              size={size}
              quantity={quantity}
              preview={preview}
            />

            

            <PriceCard
              product={product}
              quantity={quantity}
            />

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="mb-4 text-xl font-bold">
                معلومات العميل
              </h3>

              <div className="space-y-3 text-sm">
                <p>
                  <span className="text-gray-400">الاسم: </span>
                  <span className="font-bold">
                    {name || "لم يُكتب بعد"}
                  </span>
                </p>

                <p>
                  <span className="text-gray-400">الهاتف: </span>
                  <span className="font-bold">
                    {phone || "لم يُكتب بعد"}
                  </span>
                </p>

                <p>
                  <span className="text-gray-400">الملاحظات: </span>
                  <span className="font-bold">
                    {notes || "لا توجد ملاحظات"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}