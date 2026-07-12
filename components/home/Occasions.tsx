import Link from "next/link";

const occasions = [
  { title: "التخرج", text: "خلّد لحظة نجاحك بتصميم خاص", emoji: "🎓", style: "bg-violet-700 text-white" },
  { title: "أعياد الميلاد", text: "هدايا تحمل الاسم والصورة", emoji: "🎂", style: "bg-orange-100 text-slate-900" },
  { title: "الزواج والخطوبة", text: "تفاصيل صغيرة تصنع ذكرى كبيرة", emoji: "💍", style: "bg-rose-100 text-slate-900" },
  { title: "المواكب", text: "طباعة جماعية بجودة وأسعار مناسبة", emoji: "🏴", style: "bg-slate-900 text-white" },
];

export default function Occasions() {
  return (
    <section id="occasions" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8"><span className="text-sm font-extrabold text-violet-700">لكل لحظة تصميم</span><h2 className="mt-2 text-3xl font-black sm:text-4xl">تسوّق حسب المناسبة</h2></div>
      <div className="grid gap-5 md:grid-cols-2">
        {occasions.map((item, index) => (
          <Link href="/order" key={item.title} className={`${item.style} group relative overflow-hidden rounded-[2rem] p-7 sm:p-9 ${index === 0 ? "md:row-span-2" : ""}`}>
            <div className="relative z-10 max-w-xs"><span className="text-5xl">{item.emoji}</span><h3 className="mt-5 text-2xl font-black">{item.title}</h3><p className="mt-2 leading-7 opacity-80">{item.text}</p><span className="mt-6 inline-block border-b border-current pb-1 text-sm font-extrabold">استكشف التصاميم</span></div>
            <div className="absolute -bottom-8 -left-8 text-[9rem] opacity-10 transition group-hover:scale-110">{item.emoji}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
