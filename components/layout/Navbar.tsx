export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md border-b border-orange-500/20 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-3xl font-extrabold text-orange-500">
          اطبعلي
        </h1>

        <div className="flex gap-8 text-white">
          <a href="#">الرئيسية</a>
          <a href="#">الخدمات</a>
          <a href="#">الأعمال</a>
          <a href="#">آراء العملاء</a>
          <a href="#">تواصل</a>
        </div>

      </div>
    </nav>
  );
}