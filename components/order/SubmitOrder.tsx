"use client";

type SubmitOrderProps = {
  name: string;
  phone: string;
  product: string;
  size: string;
  color: string;
  quantity: number;
  notes: string;
};

export default function SubmitOrder({
  name,
  phone,
  product,
  size,
  color,
  quantity,
  notes,
}: SubmitOrderProps) {
  const handleSubmit = () => {
    if (!name.trim()) {
      alert("يرجى كتابة الاسم الكامل");
      return;
    }

    if (!phone.trim()) {
      alert("يرجى كتابة رقم الهاتف");
      return;
    }

    if (!product) {
      alert("يرجى اختيار المنتج");
      return;
    }

    if (!size) {
      alert("يرجى اختيار المقاس");
      return;
    }

    if (!color) {
      alert("يرجى اختيار اللون");
      return;
    }

    if (quantity < 1) {
      alert("يرجى اختيار كمية صحيحة");
      return;
    }

    const message = `
السلام عليكم، أريد تقديم طلب جديد 🛍️

━━━━━━━━━━━━━━

👤 الاسم:
${name}

📱 رقم الهاتف:
${phone}

📦 المنتج:
${product}

📏 المقاس:
${size}

🎨 اللون:
${color}

🔢 الكمية:
${quantity}

📝 الملاحظات:
${notes.trim() || "لا توجد ملاحظات"}

━━━━━━━━━━━━━━

تم إرسال الطلب من موقع اطبعلي.
    `;

    const whatsappNumber = "9647809903885";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      className="w-full rounded-xl bg-green-600 py-5 text-xl font-bold text-white transition duration-300 hover:bg-green-700 active:scale-[0.99]"
    >
      إرسال الطلب عبر واتساب
    </button>
  );
}