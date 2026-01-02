import { useState } from "react";
import { Button } from "../components/Button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "HOME", href: "#" },
    { label: "ABOUT", href: "#about" },
    { label: "PROGRAMS", href: "#programs" },
    { label: "PAGE", href: "#" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 5 L35 15 L30 20 L35 25 L20 35 L15 30 L25 20 L15 10 Z" />
            </svg>
            <span className="font-display text-2xl tracking-wide text-foreground">RUNMATE</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display text-sm tracking-wider text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <Button variant="hero" size="default" className="hidden lg:flex">
            CONTACT US
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 font-display text-sm tracking-wider text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" size="default" className="mt-4 w-full">
              CONTACT US
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
