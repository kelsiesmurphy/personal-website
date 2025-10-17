import { Button } from "@repo/ui/components/ui/button";

export default function Navigation({ path }: { path: string }) {
  const navList = [
    { label: "home", href: "/" },
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
  ];

  return (
    <nav>
      <ul className="flex gap-4 flex-wrap">
        {navList.map((navItem) => (
          <li key={navItem.label}>
            <Button
              variant="link"
              className={`px-2 ${path === navItem.href && "underline"}`}
              asChild
            >
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
