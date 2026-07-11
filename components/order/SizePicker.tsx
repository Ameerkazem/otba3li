type SizePickerProps = {
  size: string;
  setSize: (size: string) => void;
  sizes: string[];
};

export default function SizePicker({
  size,
  setSize,
  sizes,
}: SizePickerProps) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-white">
        اختر المقاس
      </h3>

      <div className="flex flex-wrap gap-3">
        {sizes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSize(item)}
            className={`h-14 min-w-14 rounded-xl border-2 px-4 font-bold transition duration-300 ${
              size === item
                ? "border-orange-500 bg-orange-500 text-white"
                : "border-zinc-700 bg-zinc-900 hover:border-orange-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {size && (
        <p className="mt-4 text-gray-400">
          المقاس المختار:
          <span className="mr-2 font-bold text-orange-500">
            {size}
          </span>
        </p>
      )}
    </div>
  );
}