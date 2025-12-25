import { useState, useRef, ReactElement } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/pages/api/fetchapi";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  avatar?: string;
  text: string;
  rating: number;
}

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: ReactElement;
  features: string[];
  index?: number;
  backgroundImage?: string;
  testimonial?: Testimonial;
}

const ServiceCard = ({
  title,
  shortDescription,
  fullDescription,
  icon,
  features,
  index = 0,
  backgroundImage,
  testimonial,
}: ServiceCardProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    descripcion: "",
    servicio: title,
  });
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.correo ||
      !formData.descripcion
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      await apiFetch("/solicitudes", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast({
        title: "Éxito",
        description: `Gracias por contactarnos, ${formData.nombre}. Te responderemos pronto.`,
      });
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        descripcion: "",
        servicio: title,
      });
      setOpenForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al enviar solicitud",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onMouseMove={handleMouseMove}
      className="group relative"
    >
      {/* Outer glow effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-glow-primary via-glow-accent to-glow-pink opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700" />

      {/* Animated border */}
      <div className="absolute -inset-[1px] rounded-3xl overflow-hidden">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--glow-primary)), hsl(var(--glow-accent)), hsl(var(--glow-pink)), hsl(var(--glow-cyan)), hsl(var(--glow-primary)))",
            backgroundSize: "300% 100%",
            animation: "gradient-shift 4s linear infinite",
          }}
        />
      </div>

      {/* Main card container */}
      <div className="relative glass rounded-3xl overflow-hidden p-8 md:p-10 transition-all duration-500 group-hover:shadow-glow-lg">
        {/* Spotlight effect following cursor */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(600px circle at ${x}px ${y}px, hsl(var(--glow-primary) / 0.15), transparent 40%)`
            ),
          }}
        />

        {/* Background image with enhanced effects */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-3xl">
            {/* Base image with parallax-like zoom on hover */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px) brightness(0.8) saturate(1.4)",
              }}
            />

            {/* Animated gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--glow-primary) / 0.3), hsl(var(--glow-accent) / 0.2), hsl(var(--background) / 0.9))",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 10s ease infinite",
              }}
            />

            {/* Glass overlay for readability */}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />

            {/* Grain texture */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
                backgroundRepeat: "repeat",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Header with floating icon */}
          <div className="flex items-start gap-6 mb-6">
            {/* Floating glowing icon */}
            <motion.div
              className="relative flex-shrink-0"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Icon glow background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-glow-primary to-glow-accent opacity-50 blur-xl animate-pulse-glow" />

              {/* Icon container */}
              <div className="relative w-16 h-16 rounded-2xl glass flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                <div className="text-primary icon-glow scale-125">{icon}</div>
              </div>
            </motion.div>

            {/* Title */}
            <div className="flex-1 text-left md:text-center">
              <motion.h3
                className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2"
                initial={{ opacity: 0, x: 0 }} // no mover en móvil
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {title}
              </motion.h3>
              <motion.p
                className="text-muted-foreground text-sm md:text-base"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {shortDescription}
              </motion.p>
            </div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="mb-6 text-left max-w-full"
          >
            <p className="text-foreground/90 leading-relaxed">
              {fullDescription}
            </p>
          </motion.div>

          {/* Features list with staggered animation */}
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: index * 0.1 + 0.5,
                },
              },
            }}
          >
            {features.map((feature, i) => (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="flex items-center gap-3 text-foreground/80"
              >
                <div className="flex items-center gap-2 mb-2">
                  {/* Puntito visible con gradiente y glow */}
                  <span
                    className="inline-block w-4 h-4 rounded-full bg-gradient-to-r from-glow-primary to-glow-accent shadow-[0_0_8px_rgba(0,255,200,0.6),0_0_12px_rgba(255,100,255,0.4)] animate-bounce"
                    style={{
                      animationDuration: "1s",
                      animationTimingFunction: "ease-in-out",
                      animationIterationCount: "infinite",
                    }}
                  />

                  {/* Texto */}
                  <span className="text-sm font-medium text-foreground">
                    {feature}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mini testimonial */}
          {testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="glass rounded-2xl p-4 mb-6 border border-primary/10"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-glow-primary to-glow-accent flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
                  {/* Glow animado detrás */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-glow-primary to-glow-accent opacity-25 blur-xl animate-pulse"></span>

                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="relative w-10 h-10 rounded-full object-cover shadow-inner"
                    />
                  ) : (
                    <span className="relative z-10 text-primary font-display font-bold text-lg drop-shadow-md animate-bounce">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/20 p-4 rounded-lg max-w-md">
                    <p className="text-left text-muted-foreground text-xs italic">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            <Button
              onClick={() => setOpenForm(!openForm)}
              className="btn-premium text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl"
            >
              {openForm ? "Cerrar formulario" : "Solicitar servicio"}
            </Button>
          </motion.div>

          {/* Animated Form */}
          <AnimatePresence>
            {openForm && (
              <motion.form
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onSubmit={handleSubmit}
                className="mt-6 overflow-hidden"
              >
                <div className="glass rounded-2xl p-6 space-y-4 border border-primary/10">
                  <motion.h4
                    className="text-lg font-semibold text-foreground mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Solicitar presupuesto
                  </motion.h4>

                  {[
                    {
                      name: "nombre",
                      placeholder: "Nombre completo",
                      type: "text",
                    },
                    { name: "telefono", placeholder: "Teléfono", type: "tel" },
                    {
                      name: "correo",
                      placeholder: "Correo electrónico",
                      type: "email",
                    },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.08 }}
                    >
                      <Input
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="input-glass"
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Textarea
                      name="descripcion"
                      placeholder="Descripción de la solicitud"
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="input-glass min-h-[100px]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="btn-premium w-full text-primary-foreground font-semibold py-6 rounded-xl"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          Enviando...
                        </span>
                      ) : (
                        "Enviar solicitud"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
