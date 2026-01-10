import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "../media/logo1.png";

// easing cúbico (movimiento orgánico)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [maxLeftPx, setMaxLeftPx] = useState(0);
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Tips", path: "/tips" },
    { name: "Contacto", path: "/contacto" },
  ];

  // Calcula desplazamiento máximo del logo
  useEffect(() => {
    const handleResize = () => {
      const headerWidth = window.innerWidth;
      const logoWidth = 48;
      setMaxLeftPx(-(headerWidth / 2 - logoWidth / 2 - 16));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 5)
        setIsCompact(true);

      if (currentScrollY < lastScrollY && scrollY <= 60) setIsCompact(false);

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollY]);

  // Interpolación orgánica del logo
  const rawProgress = Math.min(scrollY / 140, 1);
  const easedProgress = easeInOutCubic(rawProgress);
  const logoTranslateX = maxLeftPx * easedProgress;

  const showText = !isCompact || scrollY === 0;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <div
          className={cn(
            "absolute inset-0 bg-background/0 backdrop-blur-md glass border-b border-border/50 transition-opacity duration-300",
            isCompact ? "opacity-90" : "opacity-100"
          )}
        />

        <div className="relative w-full h-16 flex items-center justify-between px-4">
          {/* Logo */}
          <div
            className="absolute left-1/2 top-1/2 flex items-center transition-transform duration-500 ease-out"
            style={{
              transform: `translate(-50%, -50%) translateX(${logoTranslateX}px)`,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center glow border border-primary/50">
              <img
                src={logo}
                alt="Logo de vdmm-services"
                className="w-6 h-6 object-contain drop-shadow-lg"
              />
            </div>

            <div
              className={cn(
                "flex flex-col ml-2 overflow-hidden",
                // Transiciona explícitamente el blur
                "transition-[opacity,transform,max-width,filter]",
                "duration-[300ms,600ms] ease-out",
                showText
                  ? "opacity-100 translate-x-0 scale-100 max-w-[220px] blur-0"
                  : "opacity-0 -translate-x-3 scale-95 max-w-0 blur-[4px]"
              )}
            >
              <span className="font-display font-bold text-xl text-foreground whitespace-nowrap">
                vdmm-services
              </span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                Servicios Informáticos
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative font-medium text-sm transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors ml-auto"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <nav className="absolute top-20 left-4 right-4 glass rounded-2xl p-6 flex flex-col gap-4">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-medium text-lg py-3 px-4 rounded-xl transition-all",
                location.pathname === item.path
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/80 hover:bg-secondary hover:text-foreground"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
