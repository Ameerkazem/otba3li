import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
            أول تجربة طباعة مخصصة بأسلوب سهل ومرتب
          </span>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-7xl">
            خلّي فكرتك
            <span className="block text-violet-600">تنطبع مثل ما تتخيلها</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            اختار المنتج، ارفع تصميمك، رتبه داخل المحرر، وشوف المعاينة قبل إرسال الطلب.
            كل شيء بمكان واحد وبخطوات واضحة.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/order"
              className="rounded-full bg-violet-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              صمم منتجك الآن
            </Link>
            <Link
              href="#products"
              className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center font-black text-slate-800 transition hover:border-violet-200 hover:bg-violet-50"
            >
              تصفح المنتجات
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["+20", "منتج قابل للطباعة"],
              ["سريع", "طلب خلال دقائق"],
              ["100%", "تصميمك الخاص"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-2xl border border-black/5 bg-white p-4">
                <strong className="block text-xl font-black text-violet-700">{number}</strong>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-48 w-48 rounded-full bg-violet-200/70 blur-3xl" />

          <div className="relative rounded-[2rem] border border-white bg-gradient-to-br from-violet-100 via-white to-orange-100 p-5 shadow-2xl shadow-violet-100">
            <div className="rounded-[1.6rem] bg-slate-950 p-6 text-white sm:p-8">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">معاينة المنتج</span>
                <span className="text-sm text-white/60">اطبعلي Studio</span>
              </div>

              <div className="mt-8 grid min-h-[330px] place-items-center rounded-[1.5rem] bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="relative grid h-64 w-56 place-items-center">
                  <div className="absolute top-0 h-16 w-24 rounded-t-[3rem] border-[18px] border-b-0 border-white/90" />
                  <div className="absolute top-10 h-52 w-44 rounded-b-3xl bg-white shadow-2xl" />
                  <div className="relative z-10 mt-10 rounded-2xl bg-violet-600 px-6 py-5 text-center shadow-xl">
                    <strong className="block text-2xl font-black">فكرتك</strong>
                    <span className="mt-1 block text-sm text-violet-100">نطبعها إلك</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-white/60">تيشيرت مخصص</span>
                <span className="font-bold">جاهز للمعاينة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
