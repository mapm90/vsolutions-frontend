import { Monitor, Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Wavy top SVG */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full overflow-hidden">
        <svg
  viewBox="0 0 1440 120"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-full h-auto"
  preserveAspectRatio="none"
>
  <defs>
    <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#ff6ec7">
        <animate
          attributeName="stop-color"
          values="#ff6ec7;#8e2de2;#ff6ec7"
          dur="5s"
          repeatCount="indefinite"
        />
      </stop>
      <stop offset="100%" stopColor="#8e2de2">
        <animate
          attributeName="stop-color"
          values="#8e2de2;#ff6ec7;#8e2de2"
          dur="5s"
          repeatCount="indefinite"
        />
      </stop>
    </linearGradient>
  </defs>

  <path
    d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
    fill="url(#animatedGradient)"
  />
</svg>

      </div>

      <div className="bg-card pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded bg-accent flex items-center justify-center">
                    <Cpu className="w-2 h-2 text-accent-foreground" />
                  </div>
                </div>
                <span className="font-display font-bold text-lg text-foreground">V-Services</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tu aliado en tecnología. Soluciones informáticas profesionales para hogares y empresas.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {['Inicio', 'Servicios', 'Tips', 'Contacto'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Contacto</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  info@V-Services.com
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  +34 912 345 678
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  España
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">Síguenos</h4>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Instagram, href: '#' },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover-glow"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} V-Services. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
