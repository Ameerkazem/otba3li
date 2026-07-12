import Link from "next/link";
import { ArrowLeft, ImagePlus, Sparkles, Type } from "lucide-react";

export default function DesignCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-slate-950 px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-600/40 blur-3xl" />
        <div className="absolute -bottom-28 right-1/3 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl" />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div><span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold"><Sparkles className="h-4 w-4 text-orange-400" /> محرر اطبعلي الذكي</span><h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">لا تحتاج تكون مصممًا<br />حتى تصنع شيئًا رائعًا</h2><p className="mt-5 max-w-xl leading-8 text-slate-300">ارفع صورة، أضف نصًا، حرّك العناصر وشاهد المعاينة على المنتج مباشرة قبل إرسال الطلب.</p><Link href="/order" className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-extrabold text-slate-950 transition hover:-translate-y-1">افتح المحرر الآن <ArrowLeft className="h-5 w-5" /></Link></div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <Feature icon={<ImagePlus />} title="ارفع صورتك" text="PNG أو JPG" />
            <Feature icon={<Type />} title="أضف عبارتك" text="خطوط وألوان مختلفة" />
            <Feature icon={<Sparkles />} title="معاينة فورية" text="شاهدها على المنتج" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet-600 text-white [&>svg]:h-5 [&>svg]:w-5">{icon}</span><div><strong className="block">{title}</strong><span className="text-sm text-slate-400">{text}</span></div></div>;
}
