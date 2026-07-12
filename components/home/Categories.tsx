const categories = [
  { icon: "👕", title: "تيشيرتات", description: "طباعة حسب الطلب" },
  { icon: "☕", title: "أكواب", description: "هدايا وصور خاصة" },
  { icon: "📱", title: "كفرات موبايل", description: "تصاميمك المفضلة" },
  { icon: "🧢", title: "قبعات", description: "شعار أو كتابة" },
  { icon: "🎁", title: "هدايا", description: "مناسبات متنوعة" },
  { icon: "🏅", title: "بروشات", description: "للمناسبات والفعاليات" },
];

export default function Categories() {
  return (
    <section id="categories" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-black text-violet-600">اختار اللي يعجبك</span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">تصفح حسب المنتج</h2>
          </div>
          <p className="max-w-xl leading-7 text-slate-500">
            منتجات متنوعة، وكل منتج تقدر تخصصه بصورة أو كتابة أو تصميم كامل.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <article
              key={category.title}
              className="group rounded-3xl border border-black/5 bg-white p-5 text-center transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#fff7e9] text-3xl transition group-hover:scale-110">
                {category.icon}
              </span>
              <h3 className="mt-4 font-black">{category.title}</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">{category.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
