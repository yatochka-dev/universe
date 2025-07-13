import { Button } from "~/components/ui/button";
import React from "react";

export function Checkmark({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div
      className={`absolute top-[50%] left-[50%] flex h-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center`}
    >
      <div className={"relative flex flex-col items-center gap-2"}>
        <svg width={80} height={80} viewBox="0 0 100 100" className="relative">
          {/* Orbit path that gets drawn */}
          <circle
            className="orbit-path"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={"white"}
            strokeWidth="4"
            opacity="0"
            strokeDasharray="0 283"
            style={{
              filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.4))",
            }}
          />

          {/* Checkmark path */}
          <path
            className="checkmark-path translate-y-[0.125rem]"
            d="M25 50 L40 65 L75 30"
            fill="none"
            stroke={"white"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0 100"
            opacity="0"
            style={{
              filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.4))",
            }}
          />
        </svg>
        <p
          className={"text-muted-foreground msg text-center"}
          style={{
            opacity: 0,
            transform: "translateY(10px)",
          }}
        >
          {message}
        </p>
        <Button
          onClick={onReset}
          variant={"ghost"}
          style={{
            opacity: 0,
            transform: "translateX(10px)",
            pointerEvents: "none",
            userSelect: "none",
          }}
          className={
            "reset-btn absolute -bottom-[180%] cursor-pointer justify-self-end"
          }
        >
          Fill again?
        </Button>
      </div>
    </div>
  );
}
