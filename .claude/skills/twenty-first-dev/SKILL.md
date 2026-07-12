---
name: twenty-first-dev
description: "Component sourcing and inspiration from 21st.dev — the component marketplace for React, Next.js, and Tailwind CSS. Covers semantic search across thousands of production-grade UI components and templates, installing components via `21st add`, using the 21st MCP server for agentic discovery, generating component variants with 21st AI, and publishing custom components. Trigger on any task involving component sourcing, UI inspiration, component marketplace browsing, installing pre-built React components, or finding production-quality UI building blocks."
---

# 21st.dev — Component Sourcing & Inspiration

21st.dev is a marketplace of thousands of production-grade React UI components, templates, and themes from the community. It provides a curated alternative to generating UI from scratch — giving agents access to real, tested, visually polished components that can be found via semantic search and installed directly into a project.

## Key Capabilities

| Feature | Description |
|---|---|
| **Search** | Semantic search across 1000s of components, templates, and themes. Find by category, keyword, or visual style. |
| **Install** | Pull component code into a project with `21st add <component>`. Dependencies included. |
| **Generate** | 21st AI produces multiple variants per prompt — compare, pick, and land in your agent. |
| **Publish** | One-command publishing with auto-detected name, tags, and demo. |
| **MCP Server** | Agentic workflows from Claude, Cursor, Codex, and any MCP-compatible client. |

## Finding Components

### Browse by Category

Components are organized into two main groups:

**Marketing Blocks:**
Heroes, Texts, Features, Backgrounds, Calls to Action, Testimonials, Pricing Sections, Docks, Maps, Footers, Navigation

**UI Components:**
Buttons, Cards, Inputs, Calendars, Forms, Accordions, Avatars, Badges, Tables, Tabs, Dialogs/Modals, Carousels, Date Pickers, Sliders, Tooltips, AI Chats, File Uploads, Empty States, Menus, Selects, Switches, Progress Bars, Skeletons, Alerts

**Templates:**
Landing Page, SaaS, Dashboard, Admin Panel, Portfolio, Blog, Documentation, Ecommerce, Authentication, AI Chat, Analytics, Mobile App

### Key Authors
Notable component authors on the platform include **aceternity**, **serafim**, and **easemize** — their components are widely used.

## Using Components in a Project

### Prerequisites
- React + Tailwind CSS project (Next.js, Vite, Remix, etc.)
- Node.js 18+

### Install with CLI

```bash
# Search for a component
npx 21st search button

# Add a component to your project
npx 21st add <component-name>

# This pulls the component code directly into the project
# with all npm dependencies resolved automatically
```

### Using the MCP Server

The MCP server enables AI agents to search, discover, and install components directly from the conversation:

```json
// Add to your .mcp.json or Claude MCP config
{
  "mcpServers": {
    "21st": {
      "command": "npx",
      "args": ["@21st-dev/mcp"],
      "env": {
        "API_KEY_21ST": "<your-api-key>"
      }
    }
  }
}
```

The MCP server provides:
- **Search** — semantic search for components by description or use case
- **Install** — pull components into the project directory
- **Generate** — create component variants with 21st AI
- **Logo discovery** — find logos by brand name (returns SVG)
- **Publish** — publish custom components via MCP

### Authentication

Get an API key from the 21st.dev dashboard. It works across:
- MCP config (`API_KEY_21ST` env var)
- CLI `--api-key` flag
- CI pipelines via environment variable

## Workflow: Find & Install Components

When building a UI and you need inspiration or ready-made components:

1. **Identify what you need** — a button style? A pricing table? A hero section?
2. **Search 21st.dev** — use semantic search to describe what you need in natural language
3. **Browse results** — look at the most popular or highest-rated components
4. **Install** — run `21st add <component-name>` to pull the code
5. **Customize** — components are fully customizable; they bring their own styles, Tailwind classes, and structure
6. **Integrate** — wire up your state management, data fetching, and logic

## Workflow: Publish Components

```bash
# One-command publishing
npx 21st publish

# Auto-detects: component name, tags, demo
# Publishes to your 21st.dev profile
```

## Best Practices

| Do | Don't |
|---|---|
| Search for existing components before building from scratch | Install components without checking dependencies |
| Browse by category and popularity to find well-tested options | Override component structure in ways that break responsiveness |
| Customize styles with Tailwind classes after installation | Add components that conflict with your existing design system |
| Use the MCP server for agentic discovery during development | Ignore licensing — check each component's license |
| Publish reusable components back to the community | Install every component as a separate copy (extract shared patterns) |
| Filter by framework compatibility (Next.js, Vite, etc.) | Assume components work without your project's Tailwind config |

## Popular Components (Reference)

These are some of the most installed components as of mid-2026:
- Container Scroll Animation
- Scroll Media Expansion Hero
- Spline Scene
- Spotlight Card
- Radial Orbital Timeline
- Testimonials Columns
- Background Paths
- Animated Hero
- Display Cards
- Glowing Effect

## Checklist

- [ ] Search 21st.dev before building a common UI pattern from scratch
- [ ] Use the MCP server for in-context component discovery during development
- [ ] Verify component compatibility with your framework (Next.js / Vite / Remix)
- [ ] Customize colors and spacing to match your project's design system
- [ ] Only install what you need — avoid dependency bloat
- [ ] Check accessibility of sourced components
- [ ] Publish reusable components back to the community
