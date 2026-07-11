const services = [
  {
    icon: "👕",
    title: "طباعة الملابس",
    desc: "طباعة احترافية على التيشيرتات والهوديات بجودة عالية."
  },
  {
    icon: "☕",
    title: "طباعة الأكواب",
    desc: "أكواب سابلوميشن بألوان ثابتة وجودة ممتازة."
  },
  {
    icon: "📱",
    title: "كفرات الموبايل",
    desc: "تصاميم مميزة لجميع أنواع الهواتف."
  },
  {
    icon: "🎁",
    title: "الهدايا",
    desc: "مخدات، ميداليات، بوكسات هدايا حسب الطلب."
  },
  {
    icon: "📄",
    title: "الطباعة الإعلانية",
    desc: "بروشورات، بنرات، ستكرات وبطاقات أعمال."
  },
  {
    icon: "🤖",
    title: "تصميم بالذكاء الاصطناعي",
    desc: "اكتب فكرتك وسنولد لك تصميمًا احترافيًا."
  }
];

export default function Services() {
  return (
    <section className="bg-zinc-950 py-24 px-6">

      <h2 className="text-5xl font-black text-center text-white mb-5">
        خدماتنا
      </h2>

      <p className="text-center text-gray-400 mb-16">
        كل ما تحتاجه للطباعة في مكان واحد
      </p>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {services.map((item, index) => (

          <div
            key={index}
            className="bg-zinc-900 rounded-3xl p-10 border border-zinc-800 hover:border-orange-500 hover:-translate-y-3 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
          >

            <div className="text-6xl">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold text-orange-500 mt-6">
              {item.title}
            </h3>

            <p className="text-gray-400 mt-4 leading-8">
              {item.desc}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}