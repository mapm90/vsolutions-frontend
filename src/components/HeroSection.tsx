import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import perfil from "../media/perfil.jpg";
import logo from "../media/logo1.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-0 lg:pt-0 relative overflow-hidden bg-background">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      {/* Contenedor de columnas + onda */}
      <div className="relative">
        <div className="flex min-h-[calc(100vh-6rem)]">
          {/* Image Column - PC */}
          <div className="hidden lg:flex lg:w-[40%] relative items-end bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-tr-[3rem]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
            <div className="relative w-full h-full flex items-end justify-center">
              <div className="w-full h-full bg-gradient-to-t from-secondary via-card to-card/50 flex items-center justify-center border-t-4 border-r-4 border-primary/30 rounded-tr-[3rem]">
                <img
                  src={perfil}
                  className="w-full h-full object-cover rounded-tr-[3rem]"
                />
              </div>
            </div>
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden absolute top-0 left-0 right-0 h-[500px] flex items-center justify-center bg-gradient-to-b from-primary/10 to-transparent px-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-secondary via-card to-card/50 flex items-center justify-center border-t-4 border-primary/30 relative">
              <img src={perfil} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
            </div>
          </div>

          {/* Content Column */}
          <div
            className="
              w-full lg:w-[60%] flex flex-col justify-center 
              px-6 lg:px-16 py-8 lg:py-16 
              mt-[320px] lg:mt-0 
              bg-cover bg-center bg-no-repeat
              relative
            "
          >
            <div
              className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: `url(${logo})` }}
            />
            <div className="max-w-2xl space-y-8 relative z-10">
              <div className="space-y-6">
                <motion.span
                  className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  +10 Años de Experiencia
                </motion.span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Soluciones <span className="text-gradient">Tecnológicas</span>{" "}
                  a tu Medida
                </h1>
                <div className="text-lg text-muted-foreground leading-relaxed text-justify">
                  <p className="font-semibold mb-2">
                    Soy Verónica Borges, fundadora de{" "}
                    <span className="whitespace-nowrap">V-Services</span>
                  </p>
                  <p>
                    Con más de una década de experiencia en el sector
                    tecnológico, me dedico a ofrecer soluciones informáticas
                    personalizadas que realmente funcionan. Tanto en un ambiente
                    empresarial como para usuarios individuales en un ambiente
                    doméstico, mi objetivo es simplificar la tecnología y
                    hacerla accesible para todos.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="group">
                  <Link to="/contacto">
                    Contacta Conmigo
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/servicios">Ver Servicios</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------- SVG ONDA ------------------- */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden lg:block absolute -bottom-5 left-0 w-full z-20 pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="animatedGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ff6ec7">
                <animate
                  attributeName="stop-color"
                  values="#ff6ec7;#8e2de2;#ff6ec7"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#8e2de2">
                <animate
                  attributeName="stop-color"
                  values="#8e2de2;#ff6ec7;#8e2de2"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>

            {/* Mask para difuminar borde superior */}
            <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="20%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <mask id="maskFade">
              <rect
                x="0"
                y="0"
                width="1440"
                height="120"
                fill="url(#fadeMask)"
              />
            </mask>
          </defs>

          <path
            d="M0 120L60 105C120 90 240 60 360 52.5C480 45 600 60 720 67.5C840 75 960 75 1080 67.5C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#animatedGradient)"
            mask="url(#maskFade)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
