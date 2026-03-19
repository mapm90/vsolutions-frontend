import {
  Monitor,
  Cpu,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-background">
      {/* Onda SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg
          className="relative block w-full h-[80px] md:h-[100px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="wave-glow"
              x="-10%"
              y="-100%"
              width="120%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path
            d="M0,0 C150,90 350,90 600,45 C850,0 1050,30 1200,90 L1200,120 L0,120 Z"
            fill="var(--footer-bg)"
          />

          <path
            d="M0,0 C150,90 350,90 600,45 C850,0 1050,30 1200,90"
            fill="none"
            stroke="var(--footer-bg)"
            strokeWidth="6"
            filter="url(#wave-glow)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Contenido del Footer */}
      <div
        style={{ backgroundColor: "var(--footer-bg)", color: "white" }}
        className="pt-8 pb-4"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Logo & Description */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded bg-white/30 flex items-center justify-center">
                    <Cpu className="w-2 h-2 text-white" />
                  </div>
                </div>
                <span className="font-display font-bold text-lg text-white">
                  vdmm-services
                </span>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed">
                Tu aliado en tecnología. Servicios informáticos profesionales
                para hogares, autónomos y empresas en España.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-semibold text-white mb-4">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-2">
                {["Inicio", "Servicios", "Tips", "Contacto"].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === "Inicio" ? "/" : `/${item.toLowerCase()}`}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-display font-semibold text-white mb-4">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70 text-sm">
                  <Mail className="w-4 h-4 text-white" />
                  <a
                    href="mailto:vservicesac@gmail.com"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    vservicesac@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/70 text-sm">
                  <Phone className="w-4 h-4 text-white" />
                  <a
                    href="tel:+34674993764"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    +34 674 99 37 64
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/70 text-sm">
                  <MapPin className="w-4 h-4 text-white" />
                  Servicio disponible en España
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display font-semibold text-white mb-4">
                Síguenos
              </h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  {
                    icon: Facebook,
                    href: "https://www.facebook.com/profile.php?id=61584523994754",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/vservicesac?utm_source=qr&igsh=NGp3cXdmeG9veTlu",
                  },
                  {
                    icon: Youtube,
                    href: "https://youtube.com/@vservicesac?si=pbmrQbuOHH0cxRK2",
                  },
                  {
                    icon: MessageCircle,
                    href: "https://wa.me/34674993764?text=Hola%2C%20quiero%20información",
                  },
                  { icon: Twitter, href: "https://x.com/Vservicesac" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/vservices-ac-677a55399?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
                  },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 rounded-lg bg-white/15 hover:bg-white/30 flex items-center justify-center text-white/80 hover:text-white transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-4 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} vdmm-services. Casi todos los
              derechos reservados. Servicios informáticos profesionales en
              España.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
