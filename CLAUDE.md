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
├── pages/
│   ├── index.astro       — Homepage (timeline, search, filter)
│   └── admin.astro       — Admin page (password gate, CRUD form)
├── layouts/
│   └── BaseLayout.astro  — Shared HTML shell (global reset, container)
├── scripts/
│   ├── storage.js        — localStorage CRUD utilities
│   ├── index.js          — Index page rendering & interaction
│   └── admin.js          — Admin page logic (form, tags, delete)
public/
├── CNAME                 — Custom domain for GitHub Pages
```

## Commands

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build to dist/
npm run preview    # Preview built site
```

## Features

- Timeline view of AI learning journey
- User input for learning entries (date, title, content, tags, achievements)
- Search and filter by tags/keywords
- Data persists in browser localStorage
