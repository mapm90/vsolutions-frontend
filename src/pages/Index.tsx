import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import fondo from "../media/pexels-tara-winstead-8386434.avif";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";
import { lazy } from "react";
const SplashCursor = lazy(() => import("../efects/SplashCursor"));
const Index = () => {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!heroRef.current) return;
    const y = Math.min(latest * 0.25, 150); // 0.25x velocidad, máximo 150px
    heroRef.current.style.transform = `translateY(-${y}px)`;
  });

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ══ CAPA -1 · FONDO FOTO + GLOWS (fixed, inmóvil) ══ */}
      <SplashCursor />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[60px]"
          style={{ background: "hsl(var(--glow-primary))" }}
        />
      </div>

      {/* ══ HEADER (fixed, siempre encima) ══ */}
      <div className="fixed top-0 left-0 right-0" style={{ zIndex: 50 }}>
        <Header />
      </div>

      {/* Helmet SEO */}
      <Helmet>
        <meta
          name="google-site-verification"
          content="3I3BcxtLxT08wGKjkNOOqNRzPwLc8w5cHaeZEuHMe-g"
        />
        <title>Servicios Informáticos en España | vdmm-services</title>
        <meta
          name="description"
          content="Servicios informáticos profesionales para hogares y empresas en España. Soporte técnico, mantenimiento IT y soluciones tecnológicas a tu medida."
        />
        <link rel="canonical" href="https://vdmm-services.vercel.app/" />
        <meta
          property="og:title"
          content="Servicios Informáticos en España | vdmm-services"
        />
        <meta
          property="og:description"
          content="Servicios informáticos profesionales para hogares y empresas en España. Soporte técnico, mantenimiento IT y soluciones tecnológicas."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vdmm-services.vercel.app/" />
        <meta property="og:image" content="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Servicios Informáticos en España | vdmm-services"
        />
        <meta
          name="twitter:description"
          content="Servicios informáticos profesionales para hogares y empresas en España."
        />
        <meta name="twitter:image" content="/favicon.ico" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "vdmm-services",
            url: "https://vdmm-services.vercel.app/",
            description:
              "Servicios informáticos profesionales para hogares y empresas en España. Soporte técnico, mantenimiento IT y soluciones tecnológicas a tu medida.",
            telephone: "+34674993764",
            email: "vservicesac@gmail.com",
            areaServed: "ES",
            address: {
              "@type": "PostalAddress",
              addressCountry: "ES",
              addressLocality: "España",
            },
            openingHours: ["Mo-Su 09:00-18:00"],
            sameAs: [
              "https://www.facebook.com/profile.php?id=61584523994754",
              "https://www.instagram.com/vservicesac?utm_source=qr&igsh=NGp3cXdmeG9veTlu",
            ],
            founder: { "@type": "Person", name: "Verónica Borges" },
          })}
        </script>
      </Helmet>

      {/* ══════════════════════════════════════════════════════
          CAPA 10 · HERO — fixed en su propia capa

          El Hero es fixed igual que el fondo.
          NO participa en el flujo del documento.
          Solo se mueve con parallax (lento) y se desvanece.
          El scroll lo gestiona el spacer de abajo.
      ══════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-x-0 top-0"
        style={{ zIndex: 10, height: "100vh", overflow: "visible" }}
      >
        <div
          ref={heroRef}
          className="w-full h-full"
          style={{ willChange: "transform" }}
        >
          <HeroSection />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          SPACER — le da altura al documento para que el scroll funcione

          Sin esto, como Hero y fondo son fixed, la página no tendría
          scroll. Este div empuja el Footer hacia abajo.
          100vh = el Footer aparece justo al terminar el viewport.
      ══════════════════════════════════════════════════════ */}
      <div style={{ height: "175vh" }} />

      {/* ══════════════════════════════════════════════════════
          CAPA 20 · FOOTER — flujo normal, sube encima del Hero

          z-20 > z-10 del Hero → el Footer tapa al Hero al subir.
          Sin margin negativo → empieza exactamente al terminar el spacer.
          La onda SVG del Footer ya hace el solapamiento visual suave.
      ══════════════════════════════════════════════════════ */}
      <div className="relative" style={{ zIndex: 20 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
