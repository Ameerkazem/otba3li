type SectionTitleProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "right" | "center";
};

export default function SectionTitle({
  badge,
  title,
  description,
  align = "right",
}: SectionTitleProps) {
  const alignment =
    align === "center"
      ? "mx-auto items-center text-center"
      : "items-start text-right";

  return (
    <div className={`flex max-w-2xl flex-col ${alignment}`}>
      {badge && (
        <span className="mb-3 inline-flex rounded-full bg-violet-50 px-4 py-2 text-sm font-black text-violet-700">
          {badge}
        </span>
      )}

      <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}