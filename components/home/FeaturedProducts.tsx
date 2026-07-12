import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/products";
import Link from "next/link";

export default function FeaturedProducts() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <section id="products" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-black text-violet-600">الأكثر طلبًا</span>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">منتجات تبدأ منها تصميمك</h2>
          </div>
          <Link href="/products" className="font-black text-violet-700">
            عرض كل المنتجات ←
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
