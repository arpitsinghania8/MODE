import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="content-container section-spacing-sm">
        <SectionHeading>About MODE</SectionHeading>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      <section className="content-container section-spacing-md">
        <div className="max-w-3xl">
          <p className="font-display text-display-md text-mode-white leading-[1.1] mb-8">
            A curated editorial experience covering fashion, culture, and style
            through the lens of Swiss Modernism.
          </p>

          <GoldRule className="mb-8 max-w-sm" />

          <div className="space-y-6 font-body text-lg text-mode-gray-500 leading-[1.7]">
            <p>
              MODE is a fashion publication that believes clothing is the most
              personal form of architecture. We cover the collections, the
              streets, and the culture that shapes what we wear — with the same
              precision and restraint that defines great design.
            </p>
            <p>
              Founded in 2026, MODE brings together writers, photographers, and
              designers who share a belief in editorial rigor. Every story is
              crafted with the same attention to detail we expect from the
              garments we cover.
            </p>
            <p>
              Based in New York and Paris. Published daily.
            </p>
          </div>

          <GoldRule className="my-12 max-w-sm" />

          {/* Contact */}
          <div>
            <h3 className="font-display text-display-sm text-mode-white mb-4">
              Contact
            </h3>
            <p className="font-body text-mode-gray-500">
              Editorial:{" "}
              <a
                href="mailto:editorial@mode.blog"
                className="text-mode-gold underline underline-offset-2 decoration-mode-gold/40 neon-glow-hover hover:decoration-mode-gold transition-all"
              >
                editorial@mode.blog
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
