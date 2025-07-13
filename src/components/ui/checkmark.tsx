"use client";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useAnimate } from "motion/react";

// Imperative handle type exposed to parent components
export interface CheckmarkHandle {
  play: () => void;
}

interface CheckmarkProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  circleDelay?: number; // seconds between tick and circle draw
}

/**
 * React component that draws a tick ✔️ then a surrounding circle ⭘ using Motion One.
 *
 * Example:
 *   const ref = useRef<CheckmarkHandle>(null);
 *   <Checkmark ref={ref} />
 *   // later
 *   ref.current?.play();
 */
const Checkmark = forwardRef<CheckmarkHandle, CheckmarkProps>(
  (
    { size = 64, strokeWidth = 6, color = "#22c55e", circleDelay = 0.2 },
    ref,
  ) => {
    // Mount Motion One animator
    const [scope, animate] = useAnimate();
    const timeline = useRef<ReturnType<typeof animate> | null>(null);

    // Prepare SVG dash arrays on mount
    useEffect(() => {
      if (!scope.current) return;
      const tick = scope.current.querySelector<SVGPathElement>(".tick");
      const circle = scope.current.querySelector<SVGCircleElement>(".circle");
      if (!tick || !circle) return;

      const tickLen = tick.getTotalLength();
      const circleLen = circle.getTotalLength();

      tick.style.strokeDasharray = `${tickLen}`;
      tick.style.strokeDashoffset = `${tickLen}`;
      circle.style.strokeDasharray = `${circleLen}`;
      circle.style.strokeDashoffset = `${circleLen}`;
    }, [scope]);

    // Imperative start function
    const play = useCallback(() => {
      if (!scope.current) return;
      timeline.current?.cancel();
      timeline.current = animate([
        [
          ".tick",
          { strokeDashoffset: 0 },
          { duration: 0.45, easing: "ease-out" },
        ],
        [
          ".circle",
          { strokeDashoffset: 0 },
          { duration: 0.65, easing: "ease-out", at: circleDelay },
        ],
      ]);
    }, [animate, circleDelay]);

    useImperativeHandle(ref, () => ({ play }), [play]);

    return (
      <svg
        ref={scope as any}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      >
        <path className="tick" d="M26 52 L44 70 L74 35" />
        <circle className="circle" cx="50" cy="50" r="45" />
      </svg>
    );
  },
);

Checkmark.displayName = "Checkmark";
export default Checkmark;
