import useSWR from "swr";
import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TipCard from "@/components/TipCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/pages/api/fetchapi";
import { motion } from "framer-motion";
import NotFound from "./NotFound";
import ErrorPage from "./ErrorPage";
import { Helmet } from "react-helmet-async";
const categories = [
  "Todos",
  "Mantenimiento",
  "Hardware",
  "Software",
  "Seguridad",
];

interface Tip {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  date: string;
}

const fetcher = () => apiFetch<{ data: Tip[] }>("/tipss");

const Tips = () => {
  const { data, error } = useSWR("/tipss", fetcher);

  const tips = data?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(6);

  // Reset visibleCount cuando cambian búsqueda o categoría
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, selectedCategory]);

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tips, searchQuery, selectedCategory]);

  const visibleTips = filteredTips.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTips.length;
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Mostrar loader 2 segundos antes de renderizar datos (solo para testing)
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  if (error) return <ErrorPage />;

  if (!data || showLoader) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
        <div className="absolute h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-pulse" />

        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <div className="text-center">
            <p className="text-2xl font-semibold text-muted-foreground mb-4">
              Cargando Tips
              <span className="inline-flex ml-1 gap-0.5">
                <span className="inline-block animate-bounce">.</span>
                <span
                  className="inline-block animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                >
                  .
                </span>
                <span
                  className="inline-block animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                >
                  .
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

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
      </div>
      <Header />
      <Helmet>
        <meta
          name="google-site-verification"
          content="3I3BcxtLxT08wGKjkNOOqNRzPwLc8w5cHaeZEuHMe-g"
        />
        <title>Tips y Consejos | V-Services</title>
        <meta
          name="description"
          content="Descubre los mejores tips y consejos tecnológicos de V-Services para optimizar tus dispositivos, seguridad y software."
        />
        <link rel="canonical" href="https://v-services.vercel.app/tips" />

        {/* OpenGraph */}
        <meta property="og:title" content="Tips y Consejos | V-Services" />
        <meta
          property="og:description"
          content="Descubre los mejores tips y consejos tecnológicos de V-Services para optimizar tus dispositivos, seguridad y software."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://v-services.vercel.app/tips" />
        <meta property="og:image" content="/favicon.ico" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tips y Consejos | V-Services" />
        <meta
          name="twitter:description"
          content="Descubre los mejores tips y consejos tecnológicos de V-Services para optimizar tus dispositivos, seguridad y software."
        />
        <meta name="twitter:image" content="/favicon.ico" />

        {/* Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "V-Services Tips",
            url: "https://v-services.vercel.app/tips",
            description:
              "Tips y consejos tecnológicos de V-Services: optimización de dispositivos, seguridad, software y más.",
            publisher: {
              "@type": "Organization",
              name: "V-Services",
              logo: {
                "@type": "ImageObject",
                url: "/favicon.ico",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://v-services.vercel.app/tips",
            },
          })}
        </script>
      </Helmet>

      <motion.main
        className="relative z-10 mt-12 md:mt-10 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="text-center mb-2 md:mb-3 pt-0">
          {/* Hero Header */}
          <motion.div
            className="text-center mb-10 pt-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6">
              Nuestros <span className="text-gradient">Tips</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Trucos y consejos para tu vida tecnológica.
            </p>
          </motion.div>
          {/* Search y categorías */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          {filteredTips.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleTips.map((tip, index) => (
                  <div
                    key={tip._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TipCard {...tip} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Mostrar más tips
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No se encontraron tips.
              </p>
            </div>
          )}
        </motion.div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Tips;
