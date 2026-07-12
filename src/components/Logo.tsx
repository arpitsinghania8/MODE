// src/components/Logo.tsx
"use client";

interface LogoProps {
  /** "full" — mark + wordmark (for header/footer). "mark" — monogram only (for small contexts). */
  variant?: "full" | "mark";
  /** Show the tagline below the wordmark (full variant only). True by default. */
  showTagline?: boolean;
  className?: string;
}

function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Geometric M — Swiss Modernism: outer frame with inner diagonal cutout */}
      <path
        d="M 10 8 L 10 92 L 90 92 L 90 8 Z M 26 8 L 50 92 L 74 8 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  showTagline = true,
  className = "",
}: LogoProps) {
  if (variant === "mark") {
    return <Monogram className={className} />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Monogram mark */}
      <Monogram className="w-9 h-9 shrink-0 text-mode-gold" />

      {/* Wordmark + tagline */}
      <div>
        <span className="font-display text-display-sm text-mode-white leading-none block">
          MODE
        </span>
        {showTagline && (
          <p className="font-body text-[10px] text-mode-gray-500 tracking-[0.2em] uppercase mt-0.5 leading-tight whitespace-nowrap">
            The Business of Fashion &amp; Culture
          </p>
        )}
      </div>
    </div>
  );
}
