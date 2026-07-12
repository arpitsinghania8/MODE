# .claude — Project-level Claude Configuration

This directory contains project-level configuration for Claude Code.

## Structure

```
.claude/
├── README.md          ← you are here
├── skills/            ← reusable skills (SLI commands)
│                      drop .md files here, add to AGENTS.md
├── agents/            ← custom agent type definitions
│                      AGENTS.md / CLAUDE.md can reference these
├── workflows/         ← orchestration scripts for multi-agent tasks
├── instructions/      ← project-specific instructions loaded per session
└── templates/         ← reusable templates (issue forms, PR templates, etc.)
```
