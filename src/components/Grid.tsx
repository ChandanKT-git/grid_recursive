"use client";

import React, { useCallback, useRef, useState } from "react";
import { createInitialGrid, GRID_SIZE, RIPPLE_DURATION_MS } from "../constants";
import { GridState } from "../types";
import { applyRipple, isLocked } from "../utils/gridLogic";
import GridBox from "./GridBox";

/**
 * The main Grid component.
 *
 * Owns all mutable state (grid values + active ripple indicators)
 * and exposes a Reset button. Clicking a cell triggers the ripple
 * algorithm and briefly flags affected neighbours for animation.
 */
const Grid: React.FC = () => {
    const [grid, setGrid] = useState<GridState>(createInitialGrid);

    /**
     * `rippleCells` tracks which cells are currently highlighted by a
     * ripple animation.  We use a Set of "row-col" keys so we can
     * clear them after the animation completes.
     */
    const [rippleCells, setRippleCells] = useState<Set<string>>(new Set());

    /**
     * We keep a ref to a timeout so we can cancel it if the user
     * clicks rapidly — prevents stale cleanup from clearing a
     * fresh ripple set.
     */
    const rippleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    /**
     * Handle a cell click.
     *
     * 1. Early-exit if the cell is locked.
     * 2. Compute the new grid via the pure `applyRipple` helper.
     * 3. Set the new grid state (functional update for safety).
     * 4. Flash the affected-cell indicators, then clear after timeout.
     */
    const handleCellClick = useCallback(
        (row: number, col: number) => {
            setGrid((prevGrid) => {
                // Guard: locked cells cannot be clicked
                if (isLocked(prevGrid[row][col])) return prevGrid;

                const { grid: nextGrid, affected } = applyRipple(prevGrid, row, col);

                // Trigger ripple animation for affected neighbours
                if (affected.size > 0) {
                    // Cancel any pending cleanup from a previous rapid click
                    if (rippleTimeoutRef.current) {
                        clearTimeout(rippleTimeoutRef.current);
                    }

                    setRippleCells(affected);

                    rippleTimeoutRef.current = setTimeout(() => {
                        setRippleCells(new Set());
                        rippleTimeoutRef.current = null;
                    }, RIPPLE_DURATION_MS);
                }

                return nextGrid;
            });
        },
        [] // no deps — we read everything via functional update or refs
    );

    /** Reset the grid to its initial state and clear any active ripples */
    const handleReset = useCallback(() => {
        setGrid(createInitialGrid());
        setRippleCells(new Set());

        if (rippleTimeoutRef.current) {
            clearTimeout(rippleTimeoutRef.current);
            rippleTimeoutRef.current = null;
        }
    }, []);

    return (
        <div className="flex flex-col items-center gap-8">
            {/* ── 3×3 Grid ──────────────────────────────────────── */}
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: `repeat(${GRID_SIZE}, auto)`,
                }}
                role="grid"
                aria-label="Recursive Grid"
            >
                {grid.map((row, rowIdx) =>
                    row.map((cellValue, colIdx) => (
                        <GridBox
                            key={`${rowIdx}-${colIdx}`}
                            value={cellValue}
                            onClick={() => handleCellClick(rowIdx, colIdx)}
                            rippleActive={rippleCells.has(`${rowIdx}-${colIdx}`)}
                        />
                    ))
                )}
            </div>

            {/* ── Reset Button ──────────────────────────────────── */}
            <button
                type="button"
                onClick={handleReset}
                className="
          rounded-lg border border-gray-300 bg-white px-6 py-2
          text-sm font-semibold text-gray-700 shadow-sm
          transition-all duration-200 ease-in-out
          hover:bg-gray-100 hover:shadow-md
          active:scale-95
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        "
            >
                ↻ Reset Grid
            </button>
        </div>
    );
};

export default Grid;
