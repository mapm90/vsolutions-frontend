import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <motion.div
      className="min-h-screen bg-background relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* 🔹 Helmet para SEO */}
      <Helmet>
        <meta
          name="google-site-verification"
          content="3I3BcxtLxT08wGKjkNOOqNRzPwLc8w5cHaeZEuHMe-g"
        />
        <title>Servicios Informáticos en España | V-Services</title>
        <meta
          name="description"
          content="Servicios informáticos profesionales para hogares y empresas en España. Soporte técnico, mantenimiento IT y soluciones tecnológicas a tu medida."
        />
        <link rel="canonical" href="https://v-services.vercel.app/" />

        {/* OpenGraph */}
        <meta
          property="og:title"
          content="Servicios Informáticos en España | V-Services"
        />
        <meta
          property="og:description"
          content="Servicios informáticos profesionales para hogares y empresas en España. Soporte técnico, mantenimiento IT y soluciones tecnológicas."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v-services.vercel.app/" />
        <meta property="og:image" content="/favicon.ico" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Servicios Informáticos en España | V-Services"
        />
        <meta
          name="twitter:description"
          content="Servicios informáticos profesionales para hogares y empresas en España."
        />
        <meta name="twitter:image" content="/favicon.ico" />

        {/* Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "V-Services",
            url: "https://v-services.vercel.app/",
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
              "https://www.instagram.com/vservicesac?utm_source=qr&igsh=NGp3cXdmeG9veTlu ",
            ],
            founder: {
              "@type": "Person",
              name: "Verónica Borges",
            },
          })}
        </script>
      </Helmet>

      {/* 🌟 Fondo animado */}
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <HeroSection />
      </motion.main>

      <Footer1 />
    </motion.div>
  );
};

export default Index;
