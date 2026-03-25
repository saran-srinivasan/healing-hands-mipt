import { Section, SectionHeading } from "../ui/Section";
import { getTestimonials } from "@/lib/testimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <Section
      id="testimonials"
      className="!bg-[var(--color-primary-50)] overflow-hidden relative"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large soft circle top-right */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--color-primary-100)] rounded-full opacity-40 blur-3xl" />
        {/* Small soft circle bottom-left */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[var(--color-secondary-100)] rounded-full opacity-30 blur-3xl" />
        {/* Dot pattern */}
        <svg className="absolute top-8 left-8 opacity-[0.06] w-64 h-64" viewBox="0 0 200 200" fill="currentColor">
          {Array.from({ length: 100 }).map((_, i) => (
            <circle key={i} cx={(i % 10) * 20 + 10} cy={Math.floor(i / 10) * 20 + 10} r="2" />
          ))}
        </svg>
      </div>

      <div className="relative z-10">
        <SectionHeading
          title="What Our Patients Say"
          subtitle="Real stories from real patients who have experienced the Healing Hands difference."
        />

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </Section>
  );
}
