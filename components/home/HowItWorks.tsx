const steps = [
  { number: "01", title: "اختار المنتج", description: "تيشيرت، كوب، كفر موبايل أو أي منتج متوفر." },
  { number: "02", title: "صمم بطريقتك", description: "ارفع صورة أو أضف كتابة ورتب التصميم داخل المحرر." },
  { number: "03", title: "راجع المعاينة", description: "تأكد من الحجم والموقع قبل إرسال الطلب." },
  { number: "04", title: "أرسل واستلم", description: "أكمل بياناتك ونجهز الطلب للتوصيل." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-sm font-black text-violet-400">خطوات بسيطة</span>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">من الفكرة إلى منتج مطبوع</h2>
          <p className="mt-4 leading-7 text-slate-400">
            صمم واطلب بدون رسائل طويلة أو تفاصيل ضائعة.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-4xl font-black text-violet-400">{step.number}</span>
              <h3 className="mt-6 text-xl font-black">{step.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
