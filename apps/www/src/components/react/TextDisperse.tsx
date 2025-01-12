import {
  useState,
  type JSXElementConstructor,
  type ReactElement,
  type ReactNode,
  type ReactPortal,
} from "react";
import { motion } from "framer-motion";
import { disperse } from "./anim";
import type { JSX } from "react/jsx-runtime";

export default function TextDisperse({ children, setBackground }: any) {
  const [isAnimated, setIsAnimated] = useState(false);

  const getChars = (element: { props: { children: any } }) => {
    let chars: JSX.Element[] = [];
    const word = element.props.children;

    // Use spread operator to handle strings properly
    [...word].forEach((char, i) => {
      // Ensure the character is a valid ReactNode (string or element)
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
          }} // Handle space
        >
          {renderableChar === " " ? "\u00A0" : renderableChar}
        </motion.span>
      );
    });

    return chars;
  };

  const manageMouseEnter = () => {
    setBackground(true);
    setIsAnimated(true);
  };
  const manageMouseLeave = () => {
    setBackground(false);
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
