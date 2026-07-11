import Link from "next/link";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-zinc-900 to-black text-center">

      <h1 className="text-7xl font-black text-orange-500">
        صمم...
      </h1>

      <h2 className="text-7xl font-black text-white mt-2">
        اطبع...
      </h2>

      <h3 className="text-7xl font-black text-orange-500 mt-2">
        واستلم
      </h3>

      <p className="text-gray-400 mt-8 text-xl max-w-3xl leading-10">
        أول منصة عراقية للطباعة حسب الطلب
        باستخدام الذكاء الاصطناعي
      </p>

      <Link
        href="/order"
        className="mt-12 bg-orange-500 hover:bg-orange-600 duration-300 px-10 py-5 rounded-full text-xl font-bold inline-block"
      >
        ابدأ التصميم الآن
      </Link>

    </section>
  );
}