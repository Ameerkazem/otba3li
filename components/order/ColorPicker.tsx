type ColorPickerProps = {
  color: string;
  setColor: (color: string) => void;
  colors: string[];
};

const colorValues: Record<string, string> = {
  أبيض: "#ffffff",
  أسود: "#18181b",
  أحمر: "#ef4444",
  أزرق: "#3b82f6",
  أخضر: "#22c55e",
  أصفر: "#eab308",
  بنفسجي: "#a855f7",
};

export default function ColorPicker({
  color,
  setColor,
  colors,
}: ColorPickerProps) {
  return (
    <div>
      <h3 className="mb-4 font-bold text-white">
        اختر اللون
      </h3>

      <div className="flex flex-wrap gap-4">
        {colors.map((item) => (
          <button
            key={item}
            type="button"
            title={item}
            onClick={() => setColor(item)}
            className={`h-12 w-12 rounded-full border-4 transition ${
              color === item
                ? "scale-110 border-orange-500"
                : "border-zinc-700"
            }`}
            style={{
              backgroundColor:
                colorValues[item] ?? "#71717a",
            }}
          />
        ))}
      </div>

      {color && (
        <p className="mt-4 text-gray-400">
          اللون المختار:
          <span className="mr-2 font-bold text-orange-500">
            {color}
          </span>
        </p>
      )}
    </div>
  );
}