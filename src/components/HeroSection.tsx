import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import perfil from "../media/perfil.avif";
import { motion } from "framer-motion";
import TextType from "../efects/TextType";
import { useState } from "react";
import { Suspense } from "react";

const HeroSection = () => {
  const [showSecond, setShowSecond] = useState(false);
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  function calculateAge(birthYear: number, birthMonth: number): number {
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    if (today.getMonth() < birthMonth) age--;
    return age;
  }

  const edadprofesional = calculateAge(2016, 2);

  return (
    // La section ocupa exactamente el viewport
    <section className="w-full h-screen relative">
      {!isMobile && <Suspense fallback={null}></Suspense>}
      {/* Glows internos del hero */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      {/* ── IMAGEN PERFIL — PC ── */}
      {/* Ocupa el 40% izquierdo, altura completa desde top del header */}
      <div className="hidden lg:block absolute top-16 left-0 w-[40%]">
        {/* ── BADGE EXPERIENCIA — solo PC, flota sobre la foto ── */}
        <motion.span
          className="hidden lg:inline-block absolute top-24 right-[-3%] z-20 px-4 py-2 rounded-full glass text-sm font-medium text-primary bg-background/ backdrop-blur-md border border-primary/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
        >
          +{edadprofesional} Años de Experiencia
        </motion.span>
        <img
          src={perfil}
          alt="Verónica Borges, fundadora de vdmm-services"
          className="w-full object-top rounded-tr-[3rem] scale-x-[-1]"
          loading="lazy"
        />
      </div>
      {/* ── IMAGEN PERFIL — Móvil ── */}
      <div className="lg:hidden absolute top-16 left-0 right-0 h-[55%]">
        <img
          src={perfil}
          alt="Verónica Borges, fundadora de vdmm-services"
          className="w-full h-full object-contain"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />
      </div>
      <div className="absolute top-16 right-0 w-full lg:w-[60%] h-[calc(100%-4rem)] flex flex-col justify-center px-6 lg:px-16 py-8 lg:pt-20 pt-8">
        <div className="max-w-2xl space-y-3 rounded-2xl p-6">
          <div className="space-y-2 lg:pt-2">
            <motion.span
              className="lg:hidden inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3 }}
            >
              +{edadprofesional} Años de Experiencia
            </motion.span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground lg:mt-10">
              Soluciones <span className="text-gradient">Tecnológicas</span> a
              tu Medida
            </h1>

            <div className="text-lg text-white/95 leading-relaxed text-justify font-mono bg-black/10 backdrop-blur-sm rounded-xl p-4">
             <p className="font-semibold mb-2 text-left">
                <TextType
                  text={[
                    "Soy Verónica Borges,",
                    " fundadora de VDMM-Services",
                    " especialista informática,",
                    " y estoy aquí para ayudarte",
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
                Con más de una década de experiencia en el sector tecnológico,
                me dedico a ofrecer soluciones informáticas personalizadas que
                realmente funcionan. Tanto en un ambiente empresarial como para
                usuarios individuales en un ambiente doméstico, mi objetivo es
                simplificar la tecnología y hacerla accesible para todos.
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
    </section>
  );
};

export default HeroSection;
