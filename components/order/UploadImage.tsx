"use client";

type UploadImageProps = {
  preview: string;
  setPreview: (value: string) => void;
};

export default function UploadImage({
  preview,
  setPreview,
}: UploadImageProps) {
  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center">

      <p className="text-gray-400 mb-4">
        ارفع التصميم الخاص بك
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          setPreview(URL.createObjectURL(file));
        }}
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 mx-auto mt-6 rounded-xl border border-zinc-700"
        />
      )}

    </div>
  );
}