/* animationHelpers.ts -------------------------------------------- */

import { type useAnimate } from "motion/react";

export async function runSubmitAnimation(
  animate: ReturnType<typeof useAnimate>[1],
): Promise<void> {
  // 1. Hide the form elements
  await Promise.all([
    animate(
      ".field-parent",
      { opacity: 0, y: 20 },
      { duration: 0.3, delay: 0.1 },
    ),
    animate(
      "button[type='submit']",
      { opacity: 0, y: 20 },
      { duration: 0.3, delay: 0.1 },
    ),
    animate("h2", { opacity: 0, y: 20 }, { duration: 0.3, delay: 0.1 }),
  ]);

  await animate(
    ".field-parent, button[type='submit'], h2",
    { pointerEvents: "none", userSelect: "none" },
    { duration: 0 },
  );

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 350);
  });

  await animate(
    ".checkmark-path",
    {
      strokeDasharray: "0 100",
      opacity: 1,
      transitionTimingFunction: "ease-out",
    },
    { duration: 0 },
  );

  await animate(
    ".orbit-path",
    {
      strokeDasharray: "0 283", // 283 ≈ 2π × 45 (circumference)
      opacity: 0,
    },
    { duration: 0 },
  );

  await animate(
    ".checkmark-path",
    { strokeDasharray: "100 100" },
    { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  );

  await animate(".orbit-path", { opacity: 0.3 }, { duration: 0.2 });
  await animate(
    ".orbit-path",
    { strokeDasharray: "283 283" },
    { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  );

  await animate(".msg", { opacity: 1, y: 0 }, { duration: 0.3, delay: 0.1 });
  await animate(
    ".reset-btn",
    { opacity: 1, x: 0, pointerEvents: "auto", userSelect: "auto" },
    { duration: 0.3 },
  );
}

export async function resetAnimation(
  animate: ReturnType<typeof useAnimate>[1],
): Promise<void> {
  await Promise.all([
    animate(".msg", { opacity: 0, y: 10 }, { duration: 0.3 }),
    animate(
      ".checkmark-path",
      { strokeDasharray: "0 100", opacity: 0 },
      { duration: 0.2, delay: 0.3 },
    ),
    animate(
      ".orbit-path",
      { strokeDasharray: "0 283", opacity: 0 },
      { duration: 1.2, delay: 0.5 },
    ),
    animate(
      ".reset-btn",
      { opacity: 0, x: 10, pointerEvents: "none", userSelect: "none" },
      { duration: 0.3 },
    ),
  ]);

  await animate(
    ".field-parent, button[type='submit'], h2",
    { pointerEvents: "auto", userSelect: "auto" },
    { duration: 0 },
  );

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });

  await Promise.all([
    animate(".field-parent", { opacity: 1, y: 0 }, { duration: 0.3 }),
    animate("button[type='submit']", { opacity: 1, y: 0 }, { duration: 0.3 }),
    animate("h2", { opacity: 1, y: 0 }, { duration: 0.3 }),
  ]);
}
