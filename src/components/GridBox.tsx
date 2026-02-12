"use client";

import React, { memo } from "react";
import { BOX_SIZE } from "../constants";
import { getCellBackground, getCellTextColor, isLocked } from "../utils/gridLogic";

/**
 * Props for a single grid box.
 *
 * `rippleActive` triggers a brief CSS animation when this cell was
 * affected by a neighbour's ripple — purely cosmetic.
 */
interface GridBoxProps {
    value: number;
    onClick: () => void;
    rippleActive: boolean;
}

/**
 * A single cell in the 3×3 grid.
 *
 * Memoised to prevent re-renders when sibling cells change.
 * All visual logic (colours, cursor, scale) is derived from `value`.
 */
const GridBox: React.FC<GridBoxProps> = memo(function GridBox({
    value,
    onClick,
    rippleActive,
}) {
    const locked = isLocked(value);
    const bg = getCellBackground(value);
    const color = getCellTextColor(value);

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={locked}
            aria-label={`Cell value ${value}${locked ? " (locked)" : ""}`}
            className={`
        relative flex items-center justify-center
        select-none rounded-[4px] font-bold text-lg
        transition-all duration-200 ease-in-out
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        ${locked ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:scale-110 active:scale-95"}
        ${rippleActive ? "animate-ripple" : ""}
      `}
            style={{
                width: BOX_SIZE,
                height: BOX_SIZE,
                backgroundColor: bg,
                color,
                boxShadow: "2px 2px 0px black",
            }}
        >
            {/* Numeric value */}
            <span className="relative z-10">{value}</span>

            {/* Locked overlay — subtle visual indicator */}
            {locked && (
                <span
                    className="
            absolute inset-0 z-20 flex items-end justify-center
            rounded-[4px] bg-black/20 pb-1
            text-[9px] font-semibold uppercase tracking-wider text-white/80
          "
                >
                    locked
                </span>
            )}
        </button>
    );
});

export default GridBox;
