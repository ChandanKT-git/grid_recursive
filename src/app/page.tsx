import Grid from "../components/Grid";

/**
 * Root page — renders the Recursive Grid centred on screen.
 *
 * This is a Server Component by default; the interactive <Grid />
 * is a Client Component that manages its own state.
 */
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Recursive Grid
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Click a cell to increment · watch the ripple propagate
        </p>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      <Grid />

      {/* ── Rules legend ────────────────────────────────── */}
      <div className="mt-2 max-w-xs space-y-1 text-center text-[11px] leading-relaxed text-gray-400">
        <p>
          <span className="font-semibold text-gray-500">÷3</span> → right
          neighbour −1 &nbsp;|&nbsp;{" "}
          <span className="font-semibold text-gray-500">÷5</span> → bottom
          neighbour +2
        </p>
        <p>
          Value ≥ 15 → <span className="font-semibold text-red-500">locked</span>
        </p>
      </div>
    </main>
  );
}
