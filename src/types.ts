/**
 * Core type definitions for the Recursive Grid application.
 *
 * Keeping types in a single file ensures consistency across
 * components and utility functions.
 */

/** A single cell's numeric value */
export type CellValue = number;

/** The full grid state — a 2D array of cell values */
export type GridState = CellValue[][];

/** A position within the grid, identified by row and column indices */
export interface Position {
    row: number;
    col: number;
}
