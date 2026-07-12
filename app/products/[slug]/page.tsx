import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#fffdf8]">
      <Navbar />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white">
            <Image
              src={product.image}
              alt={product.name}
              width={900}
              height={900}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <Link href="/products" className="text-sm font-bold text-violet-600">
              ← الرجوع إلى المنتجات
            </Link>

            <h1 className="mt-5 text-4xl font-black sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>

            <strong className="mt-6 text-3xl font-black text-violet-700">
              {formatPrice(product.price)}
            </strong>

            <div className="mt-7">
              <p className="font-black">الألوان المتوفرة</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/order?product=${product.slug}`}
                className="rounded-full bg-violet-600 px-7 py-4 text-center font-black text-white shadow-xl shadow-violet-200 transition hover:bg-violet-700"
              >
                صمم هذا المنتج
              </Link>
              <Link
                href="/products"
                className="rounded-full border border-slate-200 bg-white px-7 py-4 text-center font-black"
              >
                مشاهدة باقي المنتجات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
