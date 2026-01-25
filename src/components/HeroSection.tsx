import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import perfil from "../media/perfil.png";

import { motion } from "framer-motion";
import TextType from "../efects/TextType";
import { useState } from "react";
import SplashCursor from "../efects/SplashCursor";

const HeroSection = () => {
  const [showSecond, setShowSecond] = useState(false);
  function calculateAge(birthYear: number, birthMonth: number): number {
    const today = new Date();
    let age = today.getFullYear() - birthYear;

    // Si aún no ha llegado el mes de cumpleaños, restamos 1
    if (today.getMonth() < birthMonth) {
      age--;
    }

    return age;
  }

  const edadprofesional = calculateAge(2016, 3);

  return (
    <section className="min-h-screen pt-0 lg:pt-0 relative overflow-hidden mt-16">
      <SplashCursor />

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      {/* Contenedor de columnas + onda */}
      <div className="relative">
        <div className="flex min-h-[calc(100vh-6rem)]">
          {/* Image Column - PC */}
          <div className="hidden lg:flex lg:w-[40%] relative">
            <div className=" h-auto flex items-center justify-center fixed top-16 -left-[4%] w-[50%]">
              <img
                src={perfil}
                alt="Verónica Borges, fundadora de vdmm-services"
                className="w-full h-full object-cover rounded-tr-[3rem] scale-x-[-1]"
              />
            </div>
          </div>

          {/* Mobile Image */}
          <div className="lg:hidden absolute top-0 left-0 right-0 h-[55%] flex items-center justify-center ">
            <div className="w-full h-full from-secondary via-card to-card/50 flex items-center justify-center border-t-4 border-primary/30 relative">
              <img
                src={perfil}
                alt="Verónica Borges, fundadora de vdmm-services, especialista en servicios informáticos"
                className="w-full h-full object-cover "
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
            </div>
          </div>

          {/* Content Column */}
          <div
            className="
              w-full lg:w-[60%] flex flex-col 
              px-6 lg:px-16 py-8 lg:py-16 
              mt-[320px] lg:mt-0 
              bg-cover bg-center bg-no-repeat
              relative
            "
          >
            <div className="max-w-2xl space-y-8 relative z-10">
              <div className="space-y-6">
                <motion.span
                  className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  +{edadprofesional} Años de Experiencia
                </motion.span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Soluciones <span className="text-gradient">Tecnológicas</span>{" "}
                  a tu Medida
                </h1>
                <div className="text-lg text-muted-foreground leading-relaxed text-justify">
                  <p className="font-semibold mb-2 text-left lg:text-left">
                    <TextType
                      text={[
                        "Soy Verónica Borges,",
                        " fundadora de VDMM-Services ...",
                        "especialista en servicios informáticos",
                        "y estoy aquí para ayudarte.",
                        " ¡Hablemos de cómo puedo mejorar tu experiencia tecnológica!",
                        " Tu tranquilidad digital es mi prioridad.",
                        " Juntos, haremos que la tecnología trabaje para ti.",
                        " ¡Contáctame hoy mismo!",
                      ]}
                      typingSpeed={50}
                      pauseDuration={3000}
                      deletingSpeed={20}
                      showCursor={true}
                      cursorCharacter="|"
                    />
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
                <Button asChild size="lg" className="liquid-box-btn">
                  <Link to="/contacto">
                    <span className="shine"></span>
                    Contacta Conmigo
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button asChild className="liquid-box-btn" size="lg">
                  <Link to="/servicios">
                    <span className="shine"></span>
                    Ver Servicios
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
