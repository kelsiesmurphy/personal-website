"use client";

import UseAnimations from "react-useanimations";
import type { Animation } from "react-useanimations/utils";

export default function AnimatedIcon({ animation }: { animation: Animation }) {
  return <UseAnimations loop animation={animation} />;
}
