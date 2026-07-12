import Container from "@/components/ui/Container";
import FeatureCard from "@/components/ui/FeatureCard";
import SectionTitle from "@/components/ui/SectionTitle";

const features = [
  {
    icon: "✦",
    title: "جودة طباعة عالية",
    description:
      "نهتم بوضوح الألوان والتفاصيل حتى يظهر تصميمك بأفضل شكل ممكن.",
  },
  {
    icon: "⚡",
    title: "طلب سريع وسهل",
    description:
      "اختار المنتج وصمم وأرسل الطلب بخطوات واضحة بدون تعقيد.",
  },
  {
    icon: "◈",
    title: "معاينة قبل الطباعة",
    description:
      "شاهد مكان وحجم التصميم على المنتج قبل تأكيد الطلب.",
  },
  {
    icon: "✓",
    title: "دعم ومتابعة",
    description:
      "نتابع معك تفاصيل الطلب ونتأكد أن التصميم جاهز للطباعة.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#fffdf8] py-20">
      <Container>
        <SectionTitle
          badge="ليش اطبعلي؟"
          title="كل اللي تحتاجه حتى تحول فكرتك إلى منتج"
          description="من اختيار المنتج إلى المعاينة والطباعة، وفرنا لك تجربة واضحة ومتكاملة."
          align="center"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}