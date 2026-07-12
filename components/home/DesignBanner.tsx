import Link from "next/link";

export default function DesignBanner() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-violet-600 text-white lg:grid-cols-[1.2fr_0.8fr]">
        <div className="p-8 sm:p-12 lg:p-16">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
            محرر تصميم مباشر
          </span>
          <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
            عندك فكرة؟ جرّبها على المنتج قبل الطباعة
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-violet-100">
            ارفع الصورة، حرّكها، كبّرها وصغّرها، وشوف مكان الطباعة داخل المعاينة.
          </p>
          <Link
            href="/order"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-black text-violet-700 transition hover:-translate-y-0.5"
          >
            افتح المحرر
          </Link>
        </div>

        <div className="grid min-h-80 place-items-center bg-violet-700/70 p-8">
          <div className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="mt-5 grid h-52 place-items-center rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50">
              <div className="rounded-xl bg-violet-600 px-8 py-5 text-center text-white shadow-lg">
                <strong className="text-xl">تصميمك هنا</strong>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["رفع صورة", "إضافة نص", "معاينة"].map((item) => (
                <span key={item} className="rounded-lg bg-slate-100 px-2 py-2 text-center text-xs font-bold text-slate-600">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
