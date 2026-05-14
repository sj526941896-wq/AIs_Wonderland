# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal AI learning journey tracker. The goal is to build a webpage that displays the user's AI learning process, where learning content and achievements are entered by the user.

## Current State

Under development. Implementation started on 2026/05/14.

## Tech Stack

- **Frontend**: Astro (static site generator, component-based)
- **Data Storage**: localStorage (client-side only)
- **Deployment**: Static hosting for domain ais.aitennis.top (GitHub Pages)

## Project Structure

```
src/
├── content/
│   ├── config.ts                    — Content collection schema
│   ├── entries/                     — Markdown articles (.md)
│   └── profile.json                 — Personal profile (name, bio)
├── pages/
│   └── index.astro                  — Homepage (timeline, search, filter)
├── layouts/
│   └── BaseLayout.astro             — Shared HTML shell
├── scripts/
│   └── index.js                     — Search/filter client-side logic
```

## Commands

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build to dist/
npm run preview    # Preview built site
```

## How to Add an Entry

1. Create a `.md` file in `src/content/entries/`
2. Add frontmatter (title, date, tags, achievement)
3. Write the body in Markdown
4. Commit and push — GitHub Actions deploys automatically

## Features

- Timeline view of AI learning journey
- User input for learning entries (date, title, content, tags, achievements)
- Search and filter by tags/keywords
- Data persists in browser localStorage
