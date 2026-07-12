"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "#products" },
  { label: "التصنيفات", href: "#categories" },
  { label: "كيف تطلب؟", href: "#how-it-works" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#fffdf8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="العودة إلى الرئيسية">
          <Image
            src="/logo.svg"
            alt="اطبعلي"
            width={210}
            height={60}
            priority
            className="h-auto w-[150px] sm:w-[180px]"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-slate-700 transition hover:text-violet-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/order"
            className="rounded-full border border-violet-200 px-5 py-2.5 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            اطلب الآن
          </Link>
          <Link
            href="/order"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
          >
            ابدأ التصميم
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 md:hidden"
          aria-label="فتح القائمة"
          aria-expanded={open}
        >
          <span className="text-2xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white px-4 py-5 md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-bold text-slate-700 hover:bg-violet-50 hover:text-violet-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-violet-600 px-4 py-3 text-center font-bold text-white"
            >
              ابدأ التصميم
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
