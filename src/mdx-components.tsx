// src/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="heading-display-xl text-mode-white mt-16 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="heading-display-lg text-mode-white mt-14 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="heading-display-md text-mode-white mt-10 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="heading-display-sm text-mode-white mt-8 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6">
      {children}
    </p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-mode-gold underline underline-offset-2 decoration-mode-gold/40 hover:decoration-mode-gold transition-all duration-200"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6 list-disc list-inside space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-body text-mode-gray-500 text-lg leading-[1.6] mb-6 list-decimal list-inside space-y-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-mode-gold pl-6 my-10 font-display text-display-sm italic text-mode-gold leading-[1.3]">
      {children}
    </blockquote>
  ),
  hr: () => (
    <div className="h-px w-full bg-mode-gold my-12" aria-hidden="true" />
  ),
  img: ({ src, alt }) => (
    <div className="my-10 relative w-full aspect-[16/9] overflow-hidden rounded-sm">
      {src && (
        <Image
          src={src}
          alt={alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      )}
    </div>
  ),
  code: ({ children }) => (
    <code className="bg-mode-gray-800 text-mode-gray-300 px-2 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-mode-gray-800 p-4 rounded-sm overflow-x-auto mb-6 text-sm">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
