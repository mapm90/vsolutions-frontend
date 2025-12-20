import Header from "@/components/Header";
import Footer1 from "@/components/Footer1";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <motion.main
        className="mt-[var(--header-height)] pb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeroSection />
      </motion.main>
      <Footer1 />
    </div>
  );
};

export default Index;
