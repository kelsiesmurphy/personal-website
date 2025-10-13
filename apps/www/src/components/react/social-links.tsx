import { Button } from "@repo/ui/components/ui/button";
import AnimatedIcon from "./animated-icon";
import linkedin from "react-useanimations/lib/linkedin";
import github from "react-useanimations/lib/github";
import instagram from "react-useanimations/lib/instagram";
import type { Animation } from "react-useanimations/utils";
import BlueskyIcon from "./bluesky-icon";
import type { JSX } from "react";

type SocialItem = {
  label: string;
  href: string;
  animation: Animation | undefined;
  loop: boolean;
  icon?: () => JSX.Element | undefined;
};

export default function SocialLinks() {
  const socialList: SocialItem[] = [
    {
      label: "bluesky",
      href: "https://bsky.app/profile/kelsiesmurphy.com",
      animation: undefined,
      loop: false,
      icon: BlueskyIcon,
    },
    {
      label: "instagram",
      href: "https://www.instagram.com/kelsiesmurphy/",
      animation: instagram,
      loop: false,
      icon: undefined,
    },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/kelsiesmurphy/",
      animation: linkedin,
      loop: true,
      icon: undefined,
    },
    {
      label: "github",
      href: "https://github.com/kelsiesmurphy",
      animation: github,
      loop: true,
      icon: undefined,
    },
  ];

  return (
    <nav>
      <ul className="flex gap-2 pt-8 flex-wrap">
        {socialList.map((socialItem) => (
          <li key={socialItem.label}>
            <Button variant="link" className="px-2" asChild>
              <a
                className="font-normal text-base"
                target="_blank"
                href={socialItem.href}
              >
                {socialItem.animation ? (
                  <AnimatedIcon
                    animation={socialItem.animation}
                    loop={socialItem.loop}
                  />
                ) : (
                  socialItem.icon && (
                    <div className="hover:animate-ping">
                      <socialItem.icon />
                    </div>
                  )
                )}
                {socialItem.label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
