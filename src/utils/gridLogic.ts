import { GridState, Position } from "../types";
import { GRID_SIZE, LOCK_THRESHOLD } from "../constants";

/**
 * Pure helper functions for the Recursive Grid.
 *
 * Every function here is side-effect free and works on plain data,
 * making the logic easy to test and reason about.
 */

// ─── Predicates ──────────────────────────────────────────────────

/** A cell is locked when its value reaches the threshold */
export const isLocked = (value: number): boolean => value >= LOCK_THRESHOLD;

/** Clamp a value so it never drops below 0 (defensive) */
export const clampValue = (value: number): number => Math.max(0, value);

// ─── Colour helpers ──────────────────────────────────────────────

/** Returns the background colour for a cell based on its value */
export const getCellBackground = (value: number): string => {
    if (isLocked(value)) return "#ef4444"; // red-500  — locked
    if (value % 2 !== 0) return "#1a237e"; // indigo   — odd
    return "#e0e0e0";                      // grey     — even
};

/** Returns the text colour for a cell based on its value */
export const getCellTextColor = (value: number): string => {
    if (isLocked(value)) return "#ffffff";
    if (value % 2 !== 0) return "#ffffff";
    return "#171717";
};

// ─── Immutable grid helpers ──────────────────────────────────────

/**
 * Returns a deep copy of the grid with a single cell mutated.
 *
 * We use map-based cloning so every row reference is new,
 * which plays nicely with React's shallow-comparison diffing.
 */
const setCellValue = (
    grid: GridState,
    row: number,
    col: number,
    value: number
): GridState =>
    grid.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? value : c)) : [...r]
    );

/**
 * Safely checks whether a position is within grid bounds.
 */
const isInBounds = (pos: Position): boolean =>
    pos.row >= 0 && pos.row < GRID_SIZE && pos.col >= 0 && pos.col < GRID_SIZE;

// ─── Core ripple logic ──────────────────────────────────────────

/**
 * The heart of the assignment: apply a click at (row, col) and
 * propagate ripple effects to neighbours.
 *
 * Rules:
 *  1. Increment clicked cell by 1.
 *  2. If new value is divisible by 3 → decrement right neighbour by 1
 *     (skip if cell is in the last column or neighbour is locked).
 *  3. If new value is divisible by 5 → increment bottom neighbour by 2
 *     (skip if cell is in the last row or neighbour is locked).
 *
 * Returns an object containing:
 *  - `grid`        : the updated grid state (immutable)
 *  - `affected`    : set of "row-col" keys of cells that were modified
 *                    by ripple (used for animation triggers)
 */
export interface RippleResult {
    grid: GridState;
    affected: Set<string>;
}

export const applyRipple = (
    grid: GridState,
    row: number,
    col: number
): RippleResult => {
    // Guard: do nothing if the clicked cell is locked
    if (isLocked(grid[row][col])) {
        return { grid, affected: new Set() };
    }

    const affected = new Set<string>();

    // Step 1 — increment the clicked cell
    const newValue = grid[row][col] + 1;
    let nextGrid = setCellValue(grid, row, col, newValue);

    // Step 2 — divisible-by-3 → decrement RIGHT neighbour
    if (newValue % 3 === 0) {
        const rightPos: Position = { row, col: col + 1 };

        if (isInBounds(rightPos) && !isLocked(nextGrid[rightPos.row][rightPos.col])) {
            const rightValue = clampValue(nextGrid[rightPos.row][rightPos.col] - 1);
            nextGrid = setCellValue(nextGrid, rightPos.row, rightPos.col, rightValue);
            affected.add(`${rightPos.row}-${rightPos.col}`);
        }
    }

    // Step 3 — divisible-by-5 → increment BOTTOM neighbour by 2
    if (newValue % 5 === 0) {
        const bottomPos: Position = { row: row + 1, col };

        if (isInBounds(bottomPos) && !isLocked(nextGrid[bottomPos.row][bottomPos.col])) {
            const bottomValue = nextGrid[bottomPos.row][bottomPos.col] + 2;
            nextGrid = setCellValue(nextGrid, bottomPos.row, bottomPos.col, bottomValue);
            affected.add(`${bottomPos.row}-${bottomPos.col}`);
        }
    }

    return { grid: nextGrid, affected };
};
