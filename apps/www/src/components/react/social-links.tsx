import { Button } from "@repo/ui/components/ui/button";
import AnimatedIcon from "./animated-icon";
import linkedin from "react-useanimations/lib/linkedin";
import github from "react-useanimations/lib/github";
import type { Animation } from "react-useanimations/utils";
import BlueskyIcon from "./bluesky-icon";
import RSSIcon from "./rss-icon";
import type { JSX } from "react";

type SocialItem = {
  label: string;
  href: string;
  animation: Animation | undefined;
  icon?: () => JSX.Element | undefined;
};

export default function SocialLinks() {
  const socialList: SocialItem[] = [
    {
      label: "bluesky",
      href: "https://bsky.app/profile/kelsiesmurphy.com",
      animation: undefined,
      icon: BlueskyIcon,
    },
    {
      label: "linkedin",
      href: "https://www.linkedin.com/in/kelsiesmurphy/",
      animation: linkedin,
      icon: undefined,
    },
    {
      label: "github",
      href: "https://github.com/kelsiesmurphy",
      animation: github,
      icon: undefined,
    },
    {
      label: "rss",
      href: "https://kelsiesmurphy.com/rss.xml",
      animation: undefined,
      icon: RSSIcon,
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
                  <AnimatedIcon animation={socialItem.animation} />
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
