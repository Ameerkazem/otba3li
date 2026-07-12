import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-700",
    secondary:
      "border border-violet-200 bg-white text-violet-700 hover:bg-violet-50",
    dark: "bg-slate-950 text-white hover:bg-violet-600",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-black transition duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}