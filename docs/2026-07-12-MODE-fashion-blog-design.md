# MODE Fashion Blog — Design System

## Style Direction
Swiss Modernism 2.0 — clean, bold typography, generous whitespace, minimal ornamentation.

## Typography
- **Display (serif):** Playfair Display via `var(--font-display)`, fallback `serif`
- **Body (sans-serif):** Inter via `var(--font-body)`, fallback `sans-serif`

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| mode-black | #0a0a0a | Primary text / dark bg |
| mode-white | #fafafa | Primary bg / light text |
| mode-gray-50 | #f8f8f8 | Subtle backgrounds |
| mode-gray-100 | #eee | Borders / dividers |
| mode-gray-200 | #ddd | Muted borders |
| mode-gray-300 | #bbb | Disabled elements |
| mode-gray-400 | #999 | Secondary text |
| mode-gray-500 | #777 | Placeholder text |
| mode-gray-600 | #555 | Muted text |
| mode-gray-700 | #333 | Dark UI elements |
| mode-gray-800 | #222 | Near-black surfaces |
| mode-gray-900 | #111 | Deep surfaces |
| mode-accent | #d4a853 | Gold accent (WCAG AA on #0a0a0a: 5.3:1) |
| mode-accentDim | #b8923f | Dimmed gold accent |

## Spacing
- `section: 6rem` for vertical section spacing.

## Font Sizes
- `display-xl`: 5rem / 0.95 line-height / -0.04em tracking
- `display-lg`: 3.5rem / 1 line-height / -0.03em tracking
- `display-md`: 2.5rem / 1.1 line-height / -0.02em tracking
- `display-sm`: 1.75rem / 1.15 line-height / -0.01em tracking

## Dark Mode
Toggled via `class` strategy on `<html>`. Tailwind `darkMode: "class"`.
