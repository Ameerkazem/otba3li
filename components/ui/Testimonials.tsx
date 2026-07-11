const reviews = [
  {
    name: "أحمد محمد",
    text: "طباعة ممتازة وجودة عالية، التصميم طلع أجمل مما توقعت.",
    role: "عميل",
  },
  {
    name: "علي حسن",
    text: "تعامل راقي وسرعة بالتنفيذ، أنصح بهم بشدة.",
    role: "عميل",
  },
  {
    name: "محمد كريم",
    text: "أفضل مكان لطباعة التيشيرتات والكفرات، شغل احترافي.",
    role: "عميل",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-zinc-900 py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-black text-center text-white">
          آراء <span className="text-orange-500">عملائنا</span>
        </h2>

        <p className="text-gray-400 text-center mt-5">
          تجارب عملائنا مع خدمات الطباعة لدينا
        </p>


        <div className="grid md:grid-cols-3 gap-8 mt-16">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="
                bg-zinc-950
                rounded-3xl
                p-8
                border
                border-zinc-800
                hover:border-orange-500
                transition
              "
            >

              <div className="text-orange-500 text-4xl">
                "
              </div>

              <p className="text-gray-300 mt-5 leading-8">
                {review.text}
              </p>

              <h3 className="text-white font-bold text-xl mt-6">
                {review.name}
              </h3>

              <span className="text-gray-500">
                {review.role}
              </span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}