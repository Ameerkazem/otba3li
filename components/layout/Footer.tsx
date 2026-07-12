import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] px-4 py-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/logo-white.svg"
              alt="اطبعلي"
              width={230}
              height={66}
              className="h-auto w-[180px]"
            />
          </Link>

          <p className="mt-5 max-w-sm leading-7 text-slate-400">
            منصة عراقية للطباعة حسب الطلب، من اختيار المنتج إلى تجهيز التصميم وإرسال الطلب.
          </p>
        </div>

        <div>
          <h3 className="font-black">روابط سريعة</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <Link href="/">الرئيسية</Link>
            <Link href="#products">المنتجات</Link>
            <Link href="/order">ابدأ التصميم</Link>
          </div>
        </div>

        <div>
          <h3 className="font-black">المنتجات</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <span>تيشيرتات</span>
            <span>أكواب</span>
            <span>كفرات موبايل</span>
          </div>
        </div>

        <div>
          <h3 className="font-black">تواصل معنا</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            <span>العراق</span>
            <span>أضف رقم الهاتف هنا</span>
            <span>أضف حساب إنستغرام هنا</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 اطبعلي. جميع الحقوق محفوظة.</p>
        <p>صُمم ليكون سريعًا ومتجاوبًا مع الموبايل.</p>
      </div>
    </footer>
  );
}
