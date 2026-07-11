export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/9647809903885"
      target="_blank"
      className="
        fixed
        bottom-6
        right-6
        z-50
        bg-green-500
        text-white
        w-16
        h-16
        rounded-full
        flex
        items-center
        justify-center
        text-3xl
        shadow-lg
        hover:scale-110
        transition
      "
    >
      ☎
    </a>
  );
}