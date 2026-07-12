import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductFilters from "@/components/products/ProductFilters";

export const metadata = {
  title: "المنتجات | اطبعلي",
  description: "تصفح منتجات اطبعلي القابلة للتخصيص والطباعة",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <Navbar />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-black text-violet-600">متجر اطبعلي</span>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">اختار منتجك وابدأ التصميم</h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            عشرون منتجًا جاهزًا للتخصيص، مع تصنيفات وبحث وصفحات تفاصيل مستقلة.
          </p>

          <ProductFilters />
        </div>
      </section>

      <Footer />
    </main>
  );
}
