import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "../media/logo1.png";

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
      const logoWidth = 48; // w-12 = 48px
      setMaxLeftPx(-(headerWidth / 2 - logoWidth / 2 - 16));
      // el -16 es padding de los lados (px-4)
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scroll hacia abajo: compacta inmediatamente
      if (currentScrollY > lastScrollY && currentScrollY > 5)
        setIsCompact(true);

      // Scroll hacia arriba: descompacta solo cuando logo esté cerca del centro
      if (currentScrollY < lastScrollY && scrollY <= 60) setIsCompact(false);

      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, scrollY]);

  // Interpolación del logo
  const progress = scrollY === 0 ? 0 : Math.min(scrollY / 120, 1);
  const logoTranslateX = maxLeftPx * progress;
  // Determinar si las letras deben mostrarse
  const showText = !isCompact || scrollY === 0;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        {/* Banner/fondo */}
        <div
          className={cn(
            "absolute inset-0 bg-background/70 glass border-b border-border/50 transition-opacity duration-300",
            isCompact ? "opacity-0" : "opacity-100"
          )}
        />

        <div className="relative w-full h-16 flex items-center justify-between px-4">
          {/* Logo centrado */}
          <div
            className="absolute left-1/2 top-1/2 flex items-center transition-transform duration-300"
            style={{
              transform: `translate(-50%, -50%) translateX(${logoTranslateX}px)`,
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center glow border border-primary/50">
              <img
                src={logo}
                alt="Logo"
                className="w-6 h-6 object-contain drop-shadow-lg"
              />
            </div>
            {showText && (
              <div className="flex flex-col ml-2 transition-opacity duration-150">
                <span className="font-display font-bold text-xl text-foreground">
                  V-Services
                </span>
                <span className="text-xs text-muted-foreground">
                  Servicios Informáticos
                </span>
              </div>
            )}
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

          {/* Mobile Menu Button */}
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
