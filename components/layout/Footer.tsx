export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div>
          <h3 className="text-2xl font-bold text-white">
            اطبعلي
          </h3>

          <p className="text-gray-400 mt-4 leading-8">
            نقدم خدمات الطباعة على الملابس، الأكواب، كفرات الموبايل،
            والهدايا الدعائية بجودة عالية وأسعار مناسبة.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl">
            روابط سريعة
          </h3>

          <ul className="space-y-3 mt-5 text-gray-400">
            <li><a href="#">الرئيسية</a></li>
            <li><a href="#">الخدمات</a></li>
            <li><a href="#">المعرض</a></li>
            <li><a href="#">تواصل معنا</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-xl">
            معلومات التواصل
          </h3>

          <div className="mt-5 text-gray-400 space-y-3">
            <p>📍 كربلاء - العراق</p>
            <p>📞 +964 7809903885</p>
            <p>✉️ ameermushkla908@gmail.com</p>
          </div>
        </div>

      </div>

      <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-gray-500">
        © 2026 اطبعلي — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}