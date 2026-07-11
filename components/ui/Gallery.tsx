import Image from "next/image";

const works = [
  {
    title: "طباعة تيشيرتات",
    image: "/gallery/shirt.jpg",
  },
  {
    title: "طباعة أكواب",
    image: "/gallery/cup.jpg",
  },
  {
    title: "كفرات موبايل",
    image: "/gallery/case.jpg",
  },
  {
    title: "تصاميم خاصة",
    image: "/gallery/design.jpg",
  },
];

export default function Gallery() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-black text-center text-white">
          معرض <span className="text-orange-500">أعمالنا</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {works.map((work) => (
            <div
              key={work.title}
              className="
                overflow-hidden
                rounded-3xl
                bg-zinc-900
                border
                border-zinc-800
              "
            >

              <div className="relative h-72">

                <div className="relative h-72">

  <Image
    src={work.image}
    alt={work.title}
    fill
    className="object-cover"
  />

</div>
            

              </div>


              <div className="p-6">
                <h3 className="text-xl font-bold text-white">
                  {work.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}