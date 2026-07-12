import Link from "next/link";
import GoldRule from "@/components/GoldRule";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-32">
      <div className="content-container text-center max-w-lg">
        <h1 className="font-display text-display-xl text-mode-white mb-4">
          404
        </h1>
        <GoldRule className="mb-6 max-w-xs mx-auto" />
        <p className="font-body text-lg text-mode-gray-500 mb-8">
          This page does not exist. The article may have been removed or the
          link is incorrect.
        </p>
        <Link
          href="/"
          className="inline-block font-body text-sm uppercase tracking-[0.15em] text-mode-black bg-mode-gold px-6 py-3 rounded-sm hover:bg-mode-gold/90 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
