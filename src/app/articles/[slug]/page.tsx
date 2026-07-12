import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllSlugs, getArticleBySlug, getAllArticles } from "@/data/articles";
import CategoryBadge from "@/components/CategoryBadge";
import GoldRule from "@/components/GoldRule";
import ScrollProgress from "@/components/ScrollProgress";
import ArticleGrid from "@/components/ArticleGrid";
import SectionHeading from "@/components/SectionHeading";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  try {
    const mdxModule = await import(
      `@/content/articles/${slug}.mdx`
    );
    const MDXContent = mdxModule.default;

    const related = getAllArticles()
      .filter(
        (a) => a.category === article.category && a.slug !== article.slug
      )
      .slice(0, 3);

    return (
      <>
        <ScrollProgress />

        <article>
          {/* Hero image */}
          <div className="relative w-full h-[60vh] min-h-[400px]">
            <Image
              src={article.hero}
              alt={article.title}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mode-black via-mode-black/20 to-transparent" />
          </div>

          {/* Article header */}
          <header className="content-container -mt-20 relative z-10">
            <div className="max-w-3xl">
              <CategoryBadge category={article.category} className="mb-3" />
              <h1 className="font-display text-display-xl text-mode-white leading-[0.95] tracking-[-0.03em]">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 mb-6">
                <span className="font-body text-sm text-mode-gray-500">
                  {article.author}
                </span>
                <span className="text-mode-gray-700">&middot;</span>
                <time className="font-body text-sm text-mode-gray-500">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <GoldRule className="max-w-md neon-pulse-slow" />
            </div>
          </header>

          {/* Article body */}
          <div className="content-container section-spacing-md">
            <div className="max-w-3xl mdx-content">
              <MDXContent />
            </div>
          </div>

          {/* Bottom gold rule */}
          <div className="content-container">
            <GoldRule />
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="content-container section-spacing-md">
              <SectionHeading className="mb-10">
                Related Stories
              </SectionHeading>
              <ArticleGrid articles={related} columns={3} />
            </section>
          )}
        </article>
      </>
    );
  } catch {
    notFound();
  }
}

export const dynamic = "force-static";
