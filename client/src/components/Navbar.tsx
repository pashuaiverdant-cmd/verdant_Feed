import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Buy Livestock Feed" },
    { href: "/blog", label: "Blog" },
    { href: "/diet-planner", label: "Diet Planner" },
    { href: "/about", label: "About Us" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        
        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src="./img/logo.jpg"
            alt="Mera Pashu Logo"
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            Verdant Feed
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
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
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary hover:bg-primary/10 hover:text-primary"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 shadow-lg animate-in slide-in-from-top-5">
          <div className="flex flex-col space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer",
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
