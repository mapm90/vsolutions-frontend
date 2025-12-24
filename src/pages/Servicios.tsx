import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import {
  Wifi,
  Wrench,
  MonitorCheck,
  MonitorCog,
  ShieldCheck,
  Code2,
  Lightbulb,
  Cpu,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import syelow from "../media/syelow.png";
import sblue from "../media/sblue.png";
import sgreen from "../media/sgreen.png";
import sorange from "../media/sorange.png";

// Sample testimonials for each service
const testimonials = {
  software: {
    name: "Carlos M.",
    text: "Excelente servicio, mi PC funciona como nueva",
    rating: 5,
  },
  reparacion: {
    name: "Ana L.",
    text: "Muy profesionales y rápidos",
    rating: 5,
  },
  moviles: {
    name: "Miguel R.",
    text: "Repararon mi móvil en tiempo récord",
    rating: 4,
  },
  mantenimiento: {
    name: "Laura S.",
    text: "Mi equipo ya no se sobrecalienta",
    rating: 5,
  },
  seguridad: {
    name: "Pedro G.",
    text: "Me salvaron de un ransomware",
    rating: 5,
  },
  redes: {
    name: "María T.",
    text: "WiFi perfecto en toda la casa",
    rating: 5,
  },
  ensamblaje: {
    name: "Jorge F.",
    text: "El PC gaming que siempre soñé",
    rating: 5,
  },
  web: {
    name: "Elena V.",
    text: "Mi negocio creció gracias a la web",
    rating: 5,
  },
  asesoria: {
    name: "Roberto D.",
    text: "Consejos que valen oro",
    rating: 4,
  },
};

const services = [
  {
    title: "Instalación y mantenimiento de Software",
    shortDescription:
      "¿Crees que tu ordenador está lento o necesitas revisar por si faltan actualizaciones?",
    fullDescription:
      "Ofrecemos servicios de instalación y configuración de software, desde sistemas operativos hasta aplicaciones específicas, asegurando que todo funcione correctamente.",
    icon: <MonitorCheck className="w-7 h-7" />,
    features: [
      "Diagnóstico gratuito",
      "Instalación de software",
      "Actualizaciones",
      "Optimización del sistema",
    ],
    backgroundImage: sblue,
    testimonial: testimonials.software,
  },
  {
    title: "Reparación de Equipos",
    shortDescription:
      "¿Tuviste algún accidente con tu ordenador o simplemente dejó de funcionar?",
    fullDescription:
      "Servicio completo de diagnóstico y reparación para todo tipo de ordenadores. Identificamos el problema y lo solucionamos de forma rápida y eficiente.",
    icon: <Wrench className="w-7 h-7" />,
    features: [
      "Diagnóstico gratuito",
      "Reparación de hardware",
      "Cambio de componentes",
      "Limpieza interna",
    ],
    backgroundImage: sgreen,
    testimonial: testimonials.reparacion,
  },
  {
    title: "Móviles y tablets",
    shortDescription:
      "¿Pantalla rota, batería que no dura o problemas de conectividad?",
    fullDescription:
      "Reparación y mantenimiento de dispositivos móviles y tablets, incluyendo reemplazo de pantallas, baterías y solución de problemas de software.",
    icon: <Smartphone className="w-7 h-7" />,
    features: [
      "Reemplazo de pantallas",
      "Cambio de baterías",
      "Solución de software",
      "Recuperación de datos",
    ],
    backgroundImage: syelow,
    testimonial: testimonials.moviles,
  },
  {
    title: "Mantenimiento Preventivo",
    shortDescription:
      "¿Tu equipo se sobrecalienta o va más lento de lo normal?",
    fullDescription:
      "El mantenimiento preventivo alarga la vida útil de tu equipo y previene fallos inesperados. Incluye limpieza, actualización y optimización.",
    icon: <MonitorCog className="w-7 h-7" />,
    features: [
      "Limpieza de sistema",
      "Actualización de software",
      "Optimización",
      "Backup de datos",
    ],
    backgroundImage: sorange,
    testimonial: testimonials.mantenimiento,
  },
  {
    title: "Seguridad Informática",
    shortDescription:
      "¿Virus, malware o sospechas que tu información está expuesta?",
    fullDescription:
      "Instalación y configuración de soluciones de seguridad, eliminación de malware y asesoramiento para mantener tu información protegida.",
    icon: <ShieldCheck className="w-7 h-7" />,
    features: [
      "Antivirus profesional",
      "Eliminación de malware",
      "Firewall",
      "Copias de seguridad",
    ],
    backgroundImage: sblue,
    testimonial: testimonials.seguridad,
  },
  {
    title: "Redes y Conectividad",
    shortDescription:
      "¿La señal WiFi no llega bien a todas las zonas de tu casa?",
    fullDescription:
      "Instalación y configuración de redes WiFi, cableado estructurado, y solución de problemas de conectividad para hogares y empresas.",
    icon: <Wifi className="w-7 h-7" />,
    features: [
      "Instalación de redes WiFi",
      "Cableado estructurado",
      "Extensores de señal",
      "Configuración VPN",
    ],
    backgroundImage: sgreen,
    testimonial: testimonials.redes,
  },
  {
    title: "Ensamblaje y Actualización",
    shortDescription:
      "¿Quieres dar un salto de rendimiento a tu equipo actual?",
    fullDescription:
      "Hacemos tu proyecto a medida para que tu PC alcance el mejor rendimiento según tu presupuesto, desde la selección de componentes hasta el ensamblaje final.",
    icon: <Cpu className="w-7 h-7" />,
    features: [
      "Montaje de PCs",
      "Actualización de RAM, GPU, SSD",
      "Optimización",
      "Compatibilidad garantizada",
    ],
    backgroundImage: sorange,
    testimonial: testimonials.ensamblaje,
  },
  {
    title: "Sitios web y aplicaciones",
    shortDescription: "¿Tu negocio necesita presencia online profesional?",
    fullDescription:
      "Desarrollo de sitios web personalizados y aplicaciones móviles adaptadas a tus necesidades, desde el diseño hasta la implementación.",
    icon: <Code2 className="w-7 h-7" />,
    features: [
      "Diseño web personalizado",
      "Apps móviles",
      "Optimización SEO",
      "E-commerce",
    ],
    backgroundImage: sblue,
    testimonial: testimonials.web,
  },
  {
    title: "Asesorías y consultorías",
    shortDescription: "¿No sabes qué equipo o software necesitas?",
    fullDescription:
      "Asesoramiento en la selección de hardware y software que mejor se adapte a tus necesidades, así como en la optimización de tus sistemas actuales.",
    icon: <Lightbulb className="w-7 h-7" />,
    features: [
      "Asesorías personalizadas",
      "Análisis de necesidades",
      "Recomendaciones",
      "Optimización de costos",
    ],
    backgroundImage: sgreen,
    testimonial: testimonials.asesoria,
  },
];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-pulse-glow"
          style={{ background: "hsl(var(--glow-primary))" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px] animate-pulse-glow"
          style={{
            background: "hsl(var(--glow-accent))",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-[80px] animate-pulse-glow"
          style={{
            background: "hsl(var(--glow-pink))",
            animationDelay: "4s",
          }}
        />
      </div>

      <Header />

      <motion.main
        className="relative z-10 mt-[var(--header-height)] pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Header */}
          <motion.div
            className="text-center mb-20 pt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Soluciones profesionales
            </motion.span>

            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              Nuestros <span className="text-gradient">Servicios</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Soluciones informáticas profesionales adaptadas a tus necesidades.
              Haz clic en cualquier servicio para más información.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Servicios;
