import { useState } from "react";

export default function ProfileImage() {
  const [toggleDisguise, setToggleDisguise] = useState(false);
  return (
    <div
      className="relative not-prose w-28"
      onClick={() => setToggleDisguise(!toggleDisguise)}
    >
      <img
        src="/about/kelsie-murphy.jpg"
        className="relative aspect-square object-cover w-28 rounded-full"
      />
      {toggleDisguise && (
        <img src="/about/disguise.svg" className="absolute top-0 w-28" />
      )}
    </div>
  );
}
