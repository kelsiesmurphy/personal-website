import { useRef } from "react";
import TextDisperse from "./TextDisperse";

export default function Name() {
  const background: any = useRef(null);

  const setBackground = (isActive: boolean) => {
    if (background.current)
      background.current.style.opacity = isActive ? 0.8 : 0;
  };

  return (
    <TextDisperse setBackground={setBackground}>
      <h1 className="font-nord font-bold text-2xl">Kelsie Murphy</h1>
    </TextDisperse>
  );
}
