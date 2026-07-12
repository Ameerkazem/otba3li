import { Quote, Star } from "lucide-react";

const reviews = [
  { name: "زينب من كربلاء", text: "الطباعة طلعت أوضح من الصورة والمعاملة كلش راقية. أكيد أكرر الطلب.", initials: "ز" },
  { name: "علي من بغداد", text: "المحرر سهل وقدرت أشوف شكل التيشيرت قبل الطلب. التوصيل كان سريع.", initials: "ع" },
  { name: "نور من البصرة", text: "طلبت كوب هدية بالاسم والصورة، التغليف والنتيجة كانوا ممتازين.", initials: "ن" },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center"><span className="text-sm font-extrabold text-orange-500">آراء حقيقية</span><h2 className="mt-2 text-3xl font-black sm:text-4xl">ماذا يقول زبائننا؟</h2></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article key={review.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><Quote className="h-8 w-8 text-violet-200" /><div className="mt-4 flex gap-1 text-orange-400">{[1,2,3,4,5].map((n) => <Star key={n} className="h-4 w-4 fill-current" />)}</div><p className="mt-4 leading-8 text-slate-600">“{review.text}”</p><div className="mt-6 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-full bg-violet-100 font-black text-violet-700">{review.initials}</span><strong>{review.name}</strong></div></article>
        ))}
      </div>
    </section>
  );
}
