import { useState, useEffect } from 'react';
import { Menu, X, Monitor, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Tips', path: '/tips' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <>
      {/* Top Banner - hides on scroll */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <div className="glass border-b border-border/50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Spacer for centering */}
            <div className="w-48 hidden md:block" />

            {/* Centered Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center glow">
                  <Monitor className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-md bg-accent flex items-center justify-center">
                  <Cpu className="w-3 h-3 text-accent-foreground" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-foreground">TechSoluciones</span>
                <span className="text-xs text-muted-foreground">Servicios Informáticos</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative font-medium text-sm transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-primary" : "text-foreground/80"
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
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Compact Header - shows on scroll */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="glass border-b border-border/50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Compact Logo (Isotipo) */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow">
                <Monitor className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">TS</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative font-medium text-sm transition-colors hover:text-primary",
                    location.pathname === item.path ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)} />
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
