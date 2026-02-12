import { GridState } from "./types";

/**
 * Application-wide constants.
 *
 * Centralising magic numbers here makes tuning and testing trivial —
 * change one constant and the entire app adapts.
 */

/** Number of rows / columns in the grid */
export const GRID_SIZE = 3;

/** Cells with a value at or above this threshold become "locked" */
export const LOCK_THRESHOLD = 15;

/** Visual size of each grid box in pixels */
export const BOX_SIZE = 80;

/** Duration (ms) of the ripple highlight animation */
export const RIPPLE_DURATION_MS = 400;

/**
 * Creates a fresh grid with all cells initialised to 0.
 * Returns a new array each time to guarantee referential uniqueness.
 */
export const createInitialGrid = (): GridState =>
    Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => 0)
    );
