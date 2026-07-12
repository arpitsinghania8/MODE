import SectionHeading from "@/components/SectionHeading";
import GoldRule from "@/components/GoldRule";
import { categories } from "@/data/categories";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-28">
      {/* ========== HEADER ========== */}
      <section className="content-container section-spacing-sm">
        <SectionHeading>About MODE</SectionHeading>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      {/* ========== MANIFESTO ========== */}
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
          </div>
        </div>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      {/* ========== EDITORIAL PHILOSOPHY ========== */}
      <section className="content-container section-spacing-md">
        <div className="max-w-3xl">
          <h3 className="font-display text-display-sm text-mode-white mb-8">
            Editorial Philosophy
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-mode-gray-800 rounded-sm p-6">
              <h4 className="font-display text-lg text-mode-gold mb-3">
                Precision
              </h4>
              <p className="font-body text-mode-gray-500 leading-relaxed">
                Every word, every image, every layout decision serves the story.
                We edit ruthlessly and publish with intention.
              </p>
            </div>
            <div className="border border-mode-gray-800 rounded-sm p-6">
              <h4 className="font-display text-lg text-mode-gold mb-3">
                Perspective
              </h4>
              <p className="font-body text-mode-gray-500 leading-relaxed">
                Fashion is a cultural mirror. We look beyond the runway to
                explore how style intersects with art, music, film, and society.
              </p>
            </div>
            <div className="border border-mode-gray-800 rounded-sm p-6">
              <h4 className="font-display text-lg text-mode-gold mb-3">
                Craft
              </h4>
              <p className="font-body text-mode-gray-500 leading-relaxed">
                From the construction of a garment to the construction of a
                sentence — quality is non-negotiable. We champion the makers.
              </p>
            </div>
            <div className="border border-mode-gray-800 rounded-sm p-6">
              <h4 className="font-display text-lg text-mode-gold mb-3">
                Restraint
              </h4>
              <p className="font-body text-mode-gray-500 leading-relaxed">
                In an age of excess, we choose clarity. Swiss Modernism teaches
                us that what you leave out matters as much as what you include.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="content-container">
        <GoldRule />
      </div>

      {/* ========== WHAT WE COVER ========== */}
      <section className="content-container section-spacing-md">
        <div className="max-w-3xl">
          <h3 className="font-display text-display-sm text-mode-white mb-8">
            What We Cover
          </h3>

          <div className="space-y-6">
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="flex items-start gap-4 py-4 border-b border-mode-gray-800 last:border-b-0"
              >
                <span className="font-display text-display-sm text-mode-gold leading-none mt-1 min-w-[2ch]">
                  {String(categories.indexOf(cat) + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-xl text-mode-white mb-1">
                    {cat.name}
                  </h4>
                  <p className="font-body text-mode-gray-500">
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
