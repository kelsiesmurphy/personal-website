"use client";

import UseAnimations from "react-useanimations";
import type { Animation } from "react-useanimations/utils";

export default function AnimatedIcon({ animation, loop }: { animation: Animation; loop: boolean }) {
  return <UseAnimations loop={loop} animation={animation} />;
}
