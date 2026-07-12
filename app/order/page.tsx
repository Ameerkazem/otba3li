"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import WhyChooseUs from "@/components/home/WhyChooseUs";

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

  /*
   * نحدد المقاسات حسب تصنيف المنتج،
   * لأن ملف products.ts الحالي لا يحتوي sizes.
   */
  const availableSizes =
    selectedProduct?.category === "tshirts" ||
    selectedProduct?.category === "hoodies"
      ? ["S", "M", "L", "XL", "2XL"]
      : [];

  const availableColors = selectedProduct?.colors ?? [];

  /*
   * اختيار المنتج تلقائيًا عندما يجي المستخدم
   * من صفحة تفاصيل المنتج.
   *
   * مثال:
   * /order?product=classic-black-tshirt
   */
  useEffect(() => {
    const searchParams = new URLSearchParams(
      window.location.search
    );

    const productSlug = searchParams.get("product");

    if (!productSlug) return;

    const productFromUrl = products.find(
      (item) => item.slug === productSlug
    );

    if (productFromUrl) {
      setProduct(productFromUrl.name);
      setSize("");
      setColor("");
    }
  }, []);

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
      className="min-h-screen bg-zinc-950 text-white"
    >
      <Navbar />

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300">
              اطبعلي Studio
            </span>

            <h1 className="mt-5 text-4xl font-black md:text-5xl">
              اطلب{" "}
              <span className="text-violet-500">
                تصميمك
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-gray-400">
              اختر المنتج، ارفع تصميمك، وحدد اللون والمقاس،
              وشاهد تفاصيل طلبك قبل الإرسال.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
            {/* نموذج الطلب */}
            <div className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-2xl shadow-black/20 md:p-8">
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
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
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
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-violet-500"
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
                    const value = Number(
                      event.target.value
                    );

                    setQuantity(value < 1 ? 1 : value);
                  }}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition focus:border-violet-500"
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
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 p-4 outline-none transition placeholder:text-zinc-600 focus:border-violet-500"
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

            {/* المعاينة والسعر */}
            <div className="space-y-6 lg:sticky lg:top-28">
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
                <h3 className="mb-5 text-xl font-bold">
                  ملخص الطلب
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      الاسم
                    </span>

                    <span className="text-left font-bold">
                      {name || "لم يُكتب بعد"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      الهاتف
                    </span>

                    <span className="text-left font-bold">
                      {phone || "لم يُكتب بعد"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      المنتج
                    </span>

                    <span className="text-left font-bold">
                      {product || "لم يتم الاختيار"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      المقاس
                    </span>

                    <span className="text-left font-bold">
                      {size || "غير مطلوب"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      اللون
                    </span>

                    <span className="text-left font-bold">
                      {color || "لم يتم الاختيار"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-3">
                    <span className="text-gray-400">
                      الكمية
                    </span>

                    <span className="font-bold">
                      {quantity}
                    </span>
                  </div>

                  <div>
                    <span className="block text-gray-400">
                      الملاحظات
                    </span>

                    <p className="mt-2 leading-7 font-bold">
                      {notes || "لا توجد ملاحظات"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-slate-950">
        <WhyChooseUs />
      </div>

      <Footer />
    </main>
  );
}