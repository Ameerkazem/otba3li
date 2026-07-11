const products = [
  {
    name: "تيشيرت سابلوميشن",
    price: "15,000 IQD",
    image: "👕",
  },
  {
    name: "كوب سيراميك",
    price: "10,000 IQD",
    image: "☕",
  },
  {
    name: "كفر موبايل",
    price: "12,000 IQD",
    image: "📱",
  },
  {
    name: "قبعة",
    price: "18,000 IQD",
    image: "🧢",
  },
];

export default function Products() {
  return (
    <section className="bg-black py-24 px-6">
      <h2 className="text-5xl font-black text-center text-white">
        منتجاتنا
      </h2>

      <p className="text-center text-gray-400 mt-4 mb-16">
        اختر المنتج ثم ابدأ التصميم
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {products.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-orange-500 transition-all hover:-translate-y-2"
          >
            <div className="text-7xl text-center">
              {item.image}
            </div>

            <h3 className="text-2xl text-white font-bold mt-6 text-center">
              {item.name}
            </h3>

            <p className="text-orange-500 text-center mt-3 font-bold">
              {item.price}
            </p>

            <button className="mt-8 w-full bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-bold transition">
              صمم الآن
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}