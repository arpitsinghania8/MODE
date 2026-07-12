---
name: framer-motion
description: "Animation engineering with Motion (formerly Framer Motion) — React, JavaScript, and Vue. Covers motion components, declarative animations, gesture handling (hover/press/drag), layout animations with `layout` prop, AnimatePresence for exit animations, scroll-driven animations with `useInView` and `useScroll`, spring physics, variants for orchestration, SVG morphing, and MotionValue-driven effects. Trigger on any animation, transition, gesture, or motion design task in a React/JS/Vue project."
---

# Motion (Framer Motion) — Animation Engineering

Production-grade animation library for React, JavaScript, and Vue. Hardware-accelerated, gesture-driven, layout-aware, and tree-shakable. The library was formerly called "framer-motion" and the React import is `motion/react` — but `framer-motion` as a package name still works for backward compatibility.

## Import Conventions

```tsx
// React (preferred — Motion v12+)
import { motion, AnimatePresence } from "motion/react"

// React (legacy — framer-motion v11 and below)
import { motion, AnimatePresence } from "framer-motion"

// Vanilla JS
import { animate, scroll, timeline } from "motion"

// Vue
import { motion } from "motion-v"
```

## Core Motion Components

```tsx
// All standard HTML/SVG elements become animated versions
<motion.div />
<motion.span />
<motion.button />
<motion.img />
<motion.svg />
<motion.path />
<motion.section />
<motion.ul /> <motion.li />

// Animate, initial, exit, and while- props control all states
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```

## Animation Props

### Declarative Animation

```tsx
// initial — the state before mount
initial={{ opacity: 0, scale: 0.9 }}

// animate — the state to animate to
animate={{ opacity: 1, scale: 1 }}

// exit — the state when unmounting (requires AnimatePresence parent)
exit={{ opacity: 0, scale: 0.9 }}

// Transition configuration
transition={{
  duration: 0.4,
  delay: 0.1,
  ease: "easeInOut",
  // Or use spring physics
  type: "spring",
  stiffness: 300,
  damping: 20,
}}
```

### Animatable Properties

| Category | Properties |
|---|---|
| Transforms | `x`, `y`, `rotate`, `scale`, `scaleX`, `scaleY`, `skewX`, `skewY`, `rotateX`, `rotateY`, `rotateZ`, `transformPerspective` |
| Position | `top`, `left`, `right`, `bottom` |
| Dimensions | `width`, `height` (prefer `layout` prop instead) |
| Visual | `opacity`, `backgroundColor`, `borderRadius`, `boxShadow`, `clipPath`, `filter`, `backdropFilter` |
| Colors | `color`, `borderColor`, `outlineColor`, `fill`, `stroke` |
| Path | `pathLength`, `pathOffset`, `pathSpacing` (for SVG) |

## Gesture Animations

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ outline: "2px solid blue" }}
  whileDrag={{ opacity: 0.8, scale: 1.1 }}
  whileInView={{ opacity: 1, y: 0 }}
/>
```

### Drag

```tsx
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
  dragElastic={0.2}
  dragMomentum={true}
  onDragEnd={(event, info) => {
    console.log(info.point.x, info.point.y)
  }}
/>
```

## Layout Animations

The `layout` prop is one of the most powerful features — it automatically animates any layout change (position, size) with a single prop:

```tsx
// Automatic layout animation
<motion.div layout />

// With transition customization
<motion.div
  layout
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>

// layoutId — shared layout animations across different components
// Elements with the same layoutId animate between each other
{isSelected && <motion.div layoutId="highlight" />}
{!isSelected && <motion.div layoutId="highlight" />}
```

## AnimatePresence — Exit Animations

```tsx
<AnimatePresence mode="wait" initial={false}>
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    />
  )}
</AnimatePresence>
```

**Props:**
| Prop | Purpose |
|---|---|
| `mode="wait"` | Wait for exiting element to finish before mounting the next |
| `mode="popLayout"` | Exiting element pops out, remaining elements reflow |
| `initial={false}` | Skip initial animation on first mount |
| `onExitComplete` | Callback when all exit animations finish |

## Variants — Orchestration & Stagger

```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(item => (
    <motion.li key={item.id} variants={item} />
  ))}
</motion.ul>
```

## Scroll-Driven Animations

### useInView — Trigger on scroll visibility

```tsx
import { useInView } from "motion/react"

function Section() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    />
  )
}
```

### whileInView — Simplified scroll-triggered animation

```tsx
<motion.div
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
/>
```

### useScroll — Progress-linked animations

```tsx
import { useScroll, useTransform } from "motion/react"

function ParallaxSection() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return <motion.div style={{ scale, opacity }} />
}
```

## Motion Values — Real-Time Animation Drivers

```tsx
const x = useMotionValue(0)
const rotate = useTransform(x, [-100, 0, 100], [-45, 0, 45])

// useSpring — smooth derived values with physics
const smoothX = useSpring(x, { stiffness: 300, damping: 30 })

// useVelocity — access velocity of any motion value
const velocity = useVelocity(x)

return <motion.div style={{ x, rotate }} drag="x" dragConstraints={{ left: -200, right: 200 }} />
```

## Spring Physics

```tsx
// Spring is the default for transform animations
transition={{
  type: "spring",
  stiffness: 300,    // Higher = snappier (default 100)
  damping: 20,       // Higher = less bounce (default 10)
  mass: 1,           // Higher = slower, more inertia
  bounce: 0.25,      // 0 = no bounce, 1 = max bounce
  // Or use presets:
  // "spring" → default spring
  // type: "spring", stiffness: 100, damping: 30
  // type: "spring", stiffness: 200, damping: 20 (snappy)
  // type: "spring", stiffness: 400, damping: 30 (very snappy)
}}

// For non-transform properties, tween (duration-based) is the default
transition={{
  duration: 0.3,
  ease: "easeOut",
  // Built-in easings: "linear", "easeIn", "easeOut", "easeInOut", "circIn", "circOut", "circInOut", "backIn", "backOut", "backInOut", "anticipate"
  // Custom cubic bezier: [0.17, 0.67, 0.83, 0.67]
}}
```

## Keyframes

```tsx
<motion.div
  animate={{
    x: [0, 100, 200],     // Sequence of values
    opacity: [0, 1, 0],
  }}
  transition={{
    duration: 2,
    times: [0, 0.5, 1],   // Timing distribution (0-1)
    repeat: Infinity,
    repeatType: "reverse", // "loop" | "reverse" | "mirror"
  }}
/>
```

## Orchestration

```tsx
// Sequencing — set when children start relative to parent
transition={{
  delay: 0.5,             // Wait before starting
  delayChildren: 0.2,     // Delay before children start
  staggerChildren: 0.1,   // Each child starts this much after the last
  staggerDirection: 1,    // 1 = forward, -1 = reverse
  when: "beforeChildren", // "beforeChildren" | "afterChildren"
}}
```

## SVG & Path Animation

```tsx
<motion.path
  d="M0 100 L100 0 L200 100"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
  // Also available: pathOffset, pathSpacing
/>

// SVG morphing — animate between path data strings
<motion.path
  animate={{ d: isRound ? "M0,100 C..." : "M0,0 L..." }}
  transition={{ duration: 0.5 }}
/>
```

## Performance Best Practices

| Do | Don't |
|---|---|
| Animate `transform` and `opacity` for 60fps | Animate `width`, `height`, `top`, `left` directly (causes layout) |
| Use `layout` prop instead of animating dimensions | Use `will-change` on every element |
| Prefer `whileInView` over scroll listeners | Override `transform` from CSS (motion manages it) |
| Use `transformTemplate` for custom transforms | Nest many `motion` components unnecessarily |
| Clean up event subscriptions in `useEffect` | Animate elements below the fold eagerly |

## Checklist

- [ ] Prefer `transform` properties (x, y, scale, rotate) over layout properties for better performance
- [ ] Use `AnimatePresence` with `key` for list enter/exit animations
- [ ] Wrap exit animations in `<AnimatePresence>` — without it, exit is ignored
- [ ] Use `layoutId` for shared-element transitions (hero animations, modals)
- [ ] Respect `prefers-reduced-motion` with `useReducedMotion()`
- [ ] Use `once: true` with `useInView` to avoid re-triggering
- [ ] Set `initial={false}` on `AnimatePresence` when you don't want initial mount animations
- [ ] Use variants for coordinating parent-child animation timing
- [ ] Use `useMotionValue` + `useTransform` for gesture-driven animations (drag, scroll-linked)
- [ ] Use spring for natural-feeling UI interactions, tween for precise timeline-driven animations
