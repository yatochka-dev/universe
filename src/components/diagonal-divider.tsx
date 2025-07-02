interface DiagonalDividerProps {
  direction?: "left" | "right";
  color?: string;
  className?: string;
}

export function DiagonalDivider({
  direction = "right",
  color = "#ffffff",
  className = "",
}: DiagonalDividerProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={
            direction === "right"
              ? "M0,0 L1200,0 L1200,60 L0,120 Z"
              : "M0,0 L1200,0 L1200,120 L0,60 Z"
          }
          fill={color}
        />
      </svg>
    </div>
  );
}
