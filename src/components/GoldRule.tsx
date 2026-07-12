// src/components/GoldRule.tsx
interface GoldRuleProps {
  className?: string;
  thick?: boolean;
}

export default function GoldRule({
  className = "",
  thick = false,
}: GoldRuleProps) {
  return (
    <div
      className={`${thick ? "h-0.5" : "h-px"} w-full bg-mode-gold ${className}`}
      aria-hidden="true"
    />
  );
}
