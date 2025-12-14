import { Monitor, Cpu, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, MessageCircle, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer1 = () => {
  return (
    <footer >
      

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
                  vservicesac@gmail.com
                </li>
                <li className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  +34 674993764
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
                  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61584523994754' },
                   { icon: Instagram, href: 'https://www.instagram.com/vservicesac?utm_source=qr&igsh=NGp3cXdmeG9veTlu ' },
                  { icon: Youtube, href: 'https://youtube.com/@vservicesac?si=pbmrQbuOHH0cxRK2' },
                   { icon: MessageCircle, href: 'https://wa.me/34674993764?text=Hola%2C%20quiero%20información' },
                  
                  { icon: Twitter, href: 'https://x.com/Vservicesac' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/vservices-ac-677a55399?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ' },
                 
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

export default Footer1;
