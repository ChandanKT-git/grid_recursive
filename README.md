# 🔲 Recursive Grid

> An interactive 3×3 grid with click-driven ripple propagation — built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

🔗 **Live Demo:** [recursivegrid.vercel.app](https://recursivegrid.vercel.app/)

![Recursive Grid Screenshot](./public/screenshots/Screenshot%202026-02-13%20020717.png)

---

## ✨ What It Does

Each cell in the grid holds a numeric value starting at **0**. Clicking a cell increments it by 1 — but that single click can ripple outward and affect its neighbours, creating a chain of interactions across the grid.

### Ripple Rules

| Trigger | Effect | Boundary |
|---|---|---|
| New value **divisible by 3** | Right neighbour **−1** | Skipped if cell is in the last column |
| New value **divisible by 5** | Bottom neighbour **+2** | Skipped if cell is in the last row |

### Cell States

| State | Background | Text | Behaviour |
|---|---|---|---|
| **Even value** | `#e0e0e0` (grey) | Dark | Clickable |
| **Odd value** | `#1a237e` (indigo) | White | Clickable |
| **Value ≥ 15** | `#ef4444` (red) | White | 🔒 Locked — cannot be clicked or modified by neighbours |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind v4 + ripple-pulse keyframe animation
│   ├── layout.tsx           # Root layout — Inter font, SEO metadata
│   └── page.tsx             # Home page — centred grid with header & legend
├── components/
│   ├── Grid.tsx             # State owner — click handler, ripple animation, reset
│   └── GridBox.tsx          # Single cell — memoised, dynamic colours, locked overlay
├── utils/
│   └── gridLogic.ts         # Pure functions — ripple algorithm, colour helpers
├── constants.ts             # Grid size, lock threshold, box dimensions
└── types.ts                 # CellValue, GridState, Position
```

---

## 🧠 Architecture & Design Decisions

- **Pure ripple function** — All grid logic lives in `gridLogic.ts` as side-effect-free functions, making it easy to test and reason about.
- **Immutable state updates** — Every cell mutation produces a new grid via `map`-based cloning, ensuring React's shallow comparison works correctly.
- **Memoised `GridBox`** — Wrapped in `React.memo` to prevent unnecessary re-renders when sibling cells change.
- **Functional `setState`** — State updates use the callback form (`setGrid(prev => ...)`) for safe concurrent access.
- **CSS-driven animation** — The ripple highlight uses a `@keyframes` animation, keeping JS overhead at zero.
- **Defensive clamping** — Cell values are clamped to ≥ 0 so neighbour decrements never produce negative numbers.
- **Edge safety** — Bounds-checked before every neighbour access; the app never crashes at grid edges.

---

## 🎯 Bonus Features

- ↻ **Reset button** — returns all cells to their initial state
- 🔒 **Locked indicator** — subtle overlay text + `cursor-not-allowed` on cells ≥ 15
- ✨ **Ripple animation** — pulse effect on neighbours affected by a click
- 🛡️ **Negative protection** — values are clamped to never drop below 0

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 15 (App Router) | Framework |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | v4 | Styling |
| **React** | 19 | UI library |

---

## 📦 Deploy

This project is deployed on **Vercel** with zero configuration.

🔗 [recursivegrid.vercel.app](https://recursivegrid.vercel.app/)
