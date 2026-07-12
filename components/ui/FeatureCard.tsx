import type { ReactNode } from "react";

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <article className="group rounded-3xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-2xl transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 leading-7 text-slate-500">{description}</p>
    </article>
  );
}