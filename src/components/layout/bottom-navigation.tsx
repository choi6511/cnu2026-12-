"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "지도", icon: "map" },
  { href: "/collection", label: "캐릭터 도감", icon: "collection" },
] as const;

function isNavigationItemActive(pathname: string, href: "/" | "/collection") {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/places/");
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationIcon({ icon }: Readonly<{ icon: "map" | "collection" }>) {
  if (icon === "map") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3Z" />
        <path d="M9 3v15M15 6v15" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5v-12Z" />
      <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8" />
    </svg>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-navigation" aria-label="주요 메뉴">
      {navigationItems.map((item) => {
        const isActive = isNavigationItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            className="bottom-nav-link"
            href={item.href}
            aria-current={isActive ? "page" : undefined}
          >
            <NavigationIcon icon={item.icon} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
