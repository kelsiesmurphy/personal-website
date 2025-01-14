import { Button } from "@repo/ui/components/ui/button";

export default function Navigation() {
  const navList = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "writing", href: "/writing" },
    { label: "projects", href: "/projects" },
  ];

  return (
    <nav>
      <ul className="flex gap-4 flex-wrap">
        {navList.map((navItem) => (
          <li key={navItem.label}>
            <Button variant="link" className="px-2" asChild>
              <a className="font-normal" href={navItem.href}>
                {navItem.label}
              </a>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
