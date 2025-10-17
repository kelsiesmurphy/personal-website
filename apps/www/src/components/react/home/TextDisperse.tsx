import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { disperse } from "./anim";
import type { JSX } from "react/jsx-runtime";

export default function TextDisperse({ children }: any) {
  const [isAnimated, setIsAnimated] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const delayTimeout = setTimeout(() => {
        setIsAnimated(true);
        const animTimeout = setTimeout(() => setIsAnimated(false), 1200);
        return () => clearTimeout(animTimeout);
      }, 500);

      return () => clearTimeout(delayTimeout);
    }
  }, [isInView]);

  const getChars = (element: { props: { children: any } }) => {
    const word = element.props.children;
    return [...word].map((char: string, i: number) => {
      const renderableChar =
        typeof char === "string" || typeof char === "number" ? char : "";

      return (
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
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsAnimated(true)}
      onMouseLeave={() => setIsAnimated(false)}
      className="introLine font-nord font-bold text-2xl not-prose text-foreground"
    >
      {getChars(children)}
    </div>
  );
}
