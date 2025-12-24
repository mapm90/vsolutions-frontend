import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
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
      </div>{" "}
      <Header />
      <motion.main
        className="relative z-10 mt-[var(--header-height)] pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.main>
      <Footer1 />
    </div>
  );
};

export default Index;
