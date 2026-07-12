import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-black/5 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-[#fffdf8]">
        <Image
          src={product.image}
          alt={product.name}
          width={900}
          height={900}
          className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="p-5">
        <p className="text-xs font-bold text-violet-600">{product.category}</p>
        <h3 className="mt-2 text-lg font-black">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.description}</p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <strong className="text-violet-700">{formatPrice(product.price)}</strong>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-violet-600"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}
