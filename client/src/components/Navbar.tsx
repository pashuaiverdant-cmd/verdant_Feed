import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();

  const links = [
    { href: "/", key: "home", fallback: "Home" },
    { href: "/products", key: "products", fallback: "Buy Livestock Feed" },
    { href: "/blog", key: "blog", fallback: "Blog" },
    { href: "/diet-planner", key: "dietPlanner", fallback: "Diet Planner" },
    { href: "/about", key: "about", fallback: "About Us" },
    { href: "/genetics", key: "genetics", fallback: "Genetics" },
  ] as const;

  // safer active logic (supports nested routes)
  const isActive = (path: string) =>
    path === "/" ? location === "/" : location.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 font-sans">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo + Brand (never translate) */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          {/* HARD no-translate wrapper to prevent Google Translate DOM injection breaking layout */}
          <span
            className="flex items-center gap-3 notranslate"
            translate="no"
            data-notranslate="true"
            suppressHydrationWarning
          >
            <img
              src="/img/logo.jpg"
              alt={t("nav.logoAlt", "Verdant Feed Logo")}
              className="h-10 w-10 shrink-0 object-contain transition-transform group-hover:scale-105"
              draggable={false}
            />

            <span
              data-verdant-brand
              className="font-serif text-2xl font-semibold tracking-tight text-primary notranslate whitespace-nowrap"
              translate="no"
            >
              Verdant Feed
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center space-x-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {t(`nav.${link.key}`, link.fallback)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:bg-primary/10 hover:text-primary"
            aria-label={
              isOpen
                ? t("nav.closeMenu", "Close menu")
                : t("nav.openMenu", "Open menu")
            }
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium cursor-pointer",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${link.key}`, link.fallback)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}