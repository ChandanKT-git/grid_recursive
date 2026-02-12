# Recursive Grid

An interactive 3×3 grid with click-driven ripple propagation, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

## Features

- **3×3 interactive grid** — click any cell to increment its value
- **Ripple propagation** — divisible-by-3 decrements the right neighbour; divisible-by-5 increments the bottom neighbour by 2
- **Dynamic colouring** — even (grey), odd (indigo), locked ≥ 15 (red)
- **Locked cells** — cannot be clicked or modified by neighbours
- **Reset button** — returns all cells to 0
- **Ripple animation** — subtle pulse on affected neighbours
- **Edge-safe** — all boundary checks handled, no crashes
- **Immutable state** — functional updates, memoised components

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind + ripple animation keyframes
│   ├── layout.tsx       # Root layout with Inter font
│   └── page.tsx         # Home page — centres the grid
├── components/
│   ├── Grid.tsx         # State management + layout
│   └── GridBox.tsx      # Single cell (memoised)
├── utils/
│   └── gridLogic.ts     # Pure functions: ripple, colours, predicates
├── constants.ts         # Grid size, thresholds, box dimensions
└── types.ts             # TypeScript type definitions
```

## Architecture Decisions

| Decision | Rationale |
|---|---|
| Pure ripple function | Easily testable, no side effects |
| Memoised `GridBox` | Prevents re-renders of unchanged cells |
| Functional state update | Safe with React's batched updates |
| Immutable grid cloning | Every `setCellValue` produces a new grid |
| Ripple animation via CSS class | Zero JS animation overhead |
| Clamped values | Defensive — values never go below 0 |
