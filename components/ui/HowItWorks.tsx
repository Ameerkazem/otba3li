const steps = [
  {
    number: "01",
    title: "اختر المنتج",
    desc: "اختر تيشيرت، كوب، كفر موبايل أو أي منتج آخر."
  },
  {
    number: "02",
    title: "صمم بطريقتك",
    desc: "استخدم المحرر أو اطلب من الذكاء الاصطناعي إنشاء التصميم."
  },
  {
    number: "03",
    title: "راجع التصميم",
    desc: "شاهد معاينة المنتج قبل تنفيذ الطلب."
  },
  {
    number: "04",
    title: "اطبع واستلم",
    desc: "أكمل الطلب وسنقوم بالطباعة والشحن."
  }
];

export default function HowItWorks() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-5xl font-black text-center text-white">
          كيف يعمل اطبعلي؟
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-orange-500 transition"
            >
              <span className="text-orange-500 text-5xl font-black">
                {step.number}
              </span>

              <h3 className="text-2xl font-bold text-white mt-6">
                {step.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-8">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}