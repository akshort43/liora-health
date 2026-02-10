import { Button } from "@/components/ui/button";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useCallback } from "react";

const pageLinks = [
  { label: "Home", path: "/" },
  { label: "Our Story", path: "/founders" },
  { label: "Get Support", path: "/support" },
  { label: "FAQs", path: "/faqs" },
];

const sectionLinks = [
  { label: "How It Works", id: "how-it-works" },
  { label: "Advocacy", id: "advocacy" },
  { label: "Founders", id: "founders" },
];

const MAX_SCROLL_ATTEMPTS = 20;

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const scrollToSection = useCallback(
    (id: string) => {
      let attempts = 0;
      const scrollWhenReady = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }

        if (attempts < MAX_SCROLL_ATTEMPTS) {
          attempts += 1;
          requestAnimationFrame(scrollWhenReady);
        }
      };

      if (pathname !== "/") {
        navigate("/");
      }

      requestAnimationFrame(scrollWhenReady);
    },
    [pathname, navigate]
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl md:text-3xl tracking-tight text-primary hover:opacity-80 transition-opacity">
          LIORA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {sectionLinks.map((link) => (
            <Button
              key={link.id}
              variant="pill"
              size="sm"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </Button>
          ))}

          <div className="w-px h-5 bg-border mx-1" />

          {pageLinks.filter((l) => l.path !== "/").map((link) => (
            <Button key={link.path} variant={pathname === link.path ? "pill-active" : "pill"} size="sm" asChild>
              <Link to={link.path}>{link.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 pt-12">
            <nav className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Sections</p>
                {sectionLinks.map((link) => (
                  <Button
                    key={link.id}
                    variant="pill"
                    onClick={() => {
                      setOpen(false);
                      scrollToSection(link.id);
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>

              <div className="h-px bg-border" />

              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Pages</p>
                {pageLinks.map((link) => (
                  <Button
                    key={link.path}
                    variant={pathname === link.path ? "pill-active" : "pill"}
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link to={link.path}>{link.label}</Link>
                  </Button>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
