import { useState } from "react";
import { motion } from "framer-motion";
import { disperse } from "./anim";
import type { JSX } from "react/jsx-runtime";

export default function TextDisperse({ children }: any) {
  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (element: { props: { children: any } }) => {
    let chars: JSX.Element[] = [];
    const word = element.props.children;
    [...word].forEach((char, i) => {
      const renderableChar =
        typeof char === "string" || typeof char === "number" ? char : "";

      chars.push(
        <motion.span
          custom={i}
          variants={disperse}
          animate={isAnimated ? "open" : "closed"}
          key={`${renderableChar}-${i}`}
          style={{
            display: renderableChar === " " ? "inline-block" : undefined,
          }}
        >
          {renderableChar === " " ? "\u00A0" : renderableChar}
        </motion.span>
      );
    });

    return chars;
  };

  const manageMouseEnter = () => {
    setIsAnimated(true);
  };
  const manageMouseLeave = () => {
    setIsAnimated(false);
  };

  return (
    <div
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      className="introLine font-nord font-bold text-2xl not-prose text-foreground"
    >
      {getChars(children)}
    </div>
  );
}
