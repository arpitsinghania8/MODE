// src/components/SectionHeading.tsx
interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`font-display text-display-sm md:text-display-md text-mode-white tracking-[-0.02em] ${className}`}
    >
      {children}
    </h2>
  );
}
