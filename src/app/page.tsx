export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black text-white">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-32 px-16">
        <h1 className="font-display text-display-xl text-gold mb-6">
          Hello MODE
        </h1>
        <div className="gold-rule max-w-md mb-8" />
        <p className="font-body text-lg leading-body text-white/60 max-w-lg text-center">
          A curated editorial experience covering fashion, culture, and style
          through the lens of Swiss Modernism.
        </p>
      </main>
    </div>
  );
}
