import { useState, useEffect, useRef, ReactElement } from "react";
import ElectricBorder from "../efects/ElectricBorder";
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
import { Star, Terminal, ChevronRight, Send, X } from "lucide-react";

/* ── Types ───────────────────────────────────────────── */
interface Testimonial {
  name: string;
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
}
interface TestimonialResponse {
  success: boolean;
  data: Array<{ nombre: string; comentario: string; aprobado: boolean }>;
}

/* ── Typewriter hook ─────────────────────────────────── */
function useTypewriter(text: string, speed = 18, active = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) {
      setOut(text);
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      setOut(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);
  return out;
}

/* ── HUD corner ornament ─────────────────────────────── */
const HUDCorner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    pointerEvents: "none",
    zIndex: 10,
    borderColor: "var(--hud-corner)",
  };
  const sides: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: "2px solid", borderLeft: "2px solid" },
    tr: { top: 0, right: 0, borderTop: "2px solid", borderRight: "2px solid" },
    bl: {
      bottom: 0,
      left: 0,
      borderBottom: "2px solid",
      borderLeft: "2px solid",
    },
    br: {
      bottom: 0,
      right: 0,
      borderBottom: "2px solid",
      borderRight: "2px solid",
    },
  };
  return <div style={{ ...base, ...sides[pos] }} />;
};

/* ── Scanlines ───────────────────────────────────────── */
const Scanlines = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 6,
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 2px, var(--hud-scan) 2px, var(--hud-scan) 4px)",
    }}
  />
);

/* ── Blinking cursor ─────────────────────────────────── */
const Cursor = () => (
  <motion.span
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.5, repeat: Infinity }}
  >
    ▌
  </motion.span>
);

/* ══ ServiceCard ════════════════════════════════════════ */
const ServiceCard = ({
  title,
  shortDescription,
  fullDescription,
  icon,
  features,
  index = 0,
}: ServiceCardProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [booted, setBooted] = useState(false);
  const [statusMsg, setStatusMsg] = useState("INICIALIZANDO...");
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    descripcion: "",
    servicio: title,
  });
  const [loading, setLoading] = useState(false);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const spotlightY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const typedTitle = useTypewriter(title.toUpperCase(), 40, booted);
  const typedDesc = useTypewriter(shortDescription, 12, booted);

  useEffect(() => {
    const msgs = [
      "CARGANDO MÓDULOS...",
      "VERIFICANDO CONEXIÓN...",
      "SISTEMA LISTO",
    ];
    let i = 0;
    const id = setInterval(() => {
      setStatusMsg(msgs[i]);
      i++;
      if (i >= msgs.length) {
        clearInterval(id);
        setBooted(true);
      }
    }, 600);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.correo ||
      !formData.descripcion
    ) {
      toast({
        title: "ERROR",
        description: "Campos incompletos",
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
        title: "TRANSMISIÓN OK",
        description: `Solicitud recibida: ${formData.nombre}`,
      });
      setFormData({
        nombre: "",
        telefono: "",
        correo: "",
        descripcion: "",
        servicio: title,
      });
      setOpenForm(false);
    } catch (err: unknown) {
      toast({
        title: "ERROR",
        description:
          err instanceof Error ? err.message : "Error de transmisión",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchTestimonial = async () => {
    try {
      const res = await apiFetch("/comentario");
      if ((res as TestimonialResponse).success) {
        const ok = (res as TestimonialResponse).data.filter((c) => c.aprobado);
        if (!ok.length) return;
        const r = ok[Math.floor(Math.random() * ok.length)];
        setTestimonial({
          name: r.nombre,
          text: r.comentario,
          rating: Math.floor(Math.random() * 2) + 4,
        });
      }
    } catch {
      /* silent */
    }
  };

  useEffect(() => {
    fetchTestimonial();
    const id = setInterval(fetchTestimonial, 10000);
    return () => clearInterval(id);
  }, []);

  const clipCard =
    "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))";
  const clipForm =
    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)";
  const clipIcon =
    "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.18, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group relative"
      style={{ fontFamily: "monospace" }}
    >
      {/* Outer ambient glow */}
      <motion.div
        className="absolute -inset-2 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, var(--hud-outer-glow), transparent 70%)",
          clipPath: clipCard,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.7,
        }}
      />

      {/* ── Card shell ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "var(--hud-bg)",
          border: "1px solid var(--hud-border)",
          clipPath: clipCard,
          boxShadow: "var(--hud-shadow)",
        }}
      >
        <HUDCorner pos="tl" />
        <HUDCorner pos="tr" />
        <HUDCorner pos="bl" />
        <HUDCorner pos="br" />
        <Scanlines />

        {/* Spotlight on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [spotlightX, spotlightY],
              ([x, y]) =>
                `radial-gradient(320px circle at ${x}px ${y}px, var(--hud-cyan-glow), transparent 65%)`,
            ),
            zIndex: 5,
          }}
        />

        {/* Travelling scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--hud-scan-line), transparent)",
            zIndex: 7,
            opacity: 0.5,
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: index * 1.8,
          }}
        />

        {/* ── Header bar ── */}
        <div
          className="relative flex items-center justify-between px-5 py-2.5 border-b"
          style={{
            borderColor: "var(--hud-border-dim)",
            background: "var(--hud-header-bg)",
            zIndex: 8,
          }}
        >
          <div className="flex items-center gap-2">
            <Terminal
              className="w-3.5 h-3.5"
              style={{ color: "var(--hud-cyan)" }}
            />
            {/* era text-[10px] → ahora text-xs (12px) */}
            <span
              className="text-xs tracking-[0.2em] uppercase font-bold"
              style={{ color: "var(--hud-cyan)" }}
            >
              SYS.MODULE_{String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <motion.span
            className="text-xs tracking-widest"
            style={{ color: "var(--hud-cyan-dim)" }}
            animate={{ opacity: booted ? 1 : [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: booted ? 0 : Infinity }}
          >
            {booted ? "● ONLINE" : statusMsg}
          </motion.span>
        </div>

        {/* ── Content ── */}
        <div className="relative p-6 md:p-8" style={{ zIndex: 8 }}>
          {/* Icon + title */}
          <div className="flex items-start gap-4 mb-6">
            <motion.div
              className="flex-shrink-0"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.4,
              }}
            >
              <div
                className="relative w-16 h-16 flex items-center justify-center overflow-hidden"
                style={{
                  border: "1px solid var(--hud-border)",
                  background: "var(--hud-bg-deep)",
                  clipPath: clipIcon,
                }}
              >
                <motion.div
                  className="absolute inset-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  style={{
                    border: "1px dashed var(--hud-border-dim)",
                    clipPath: clipIcon,
                  }}
                />
                {/* icono un poco más grande */}
                <div
                  style={{
                    color: "var(--hud-cyan)",
                    position: "relative",
                    zIndex: 1,
                    transform: "scale(1.2)",
                  }}
                >
                  {icon}
                </div>
              </div>
            </motion.div>

            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  style={{
                    color: "var(--hud-accent)",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  &gt;&gt;
                </span>
                {/* título: era text-lg md:text-xl → text-xl md:text-2xl */}
                <h3
                  className="text-xl md:text-2xl font-bold tracking-wider"
                  style={{ color: "var(--hud-text)" }}
                >
                  {typedTitle}
                  {booted && typedTitle.length < title.length && <Cursor />}
                </h3>
              </div>
              {/* short desc: era text-xs → text-sm */}
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--hud-text-faint)" }}
              >
                {typedDesc}
                {booted && typedDesc.length < shortDescription.length && (
                  <Cursor />
                )}
              </p>
            </div>
          </div>

          {/* Full description: era text-xs → text-sm */}
          <motion.div
            className="mb-6 p-4 text-sm leading-relaxed"
            style={{
              borderLeft: "2px solid var(--hud-border)",
              color: "var(--hud-text-muted)",
              background: "var(--hud-feature-bg)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.8 }}
          >
            <span style={{ color: "var(--hud-cyan-dim)" }}>// </span>
            {fullDescription}
          </motion.div>

          {/* Features: era text-xs → text-sm */}
          <div className="mb-6 space-y-1.5">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm py-2 px-3"
                style={{
                  color: "var(--hud-text-muted)",
                  background: "var(--hud-feature-bg)",
                }}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 + i * 0.07 }}
                whileHover={{
                  x: 4,
                  backgroundColor: "var(--hud-feature-hover)",
                  color: "var(--hud-text)",
                  transition: { duration: 0.12 },
                }}
              >
                <ChevronRight
                  className="w-3.5 h-3.5 flex-shrink-0"
                  style={{ color: "var(--hud-accent)" }}
                />
                <span>{feat}</span>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="h-px flex-1"
              style={{ background: "var(--hud-border-dim)" }}
            />
            {/* era text-[9px] → text-[11px] */}
            <span
              className="text-[11px] tracking-[0.2em] font-bold"
              style={{ color: "var(--hud-text-faint)" }}
            >
              OPINIONES.USR
            </span>
            <div
              className="h-px flex-1"
              style={{ background: "var(--hud-border-dim)" }}
            />
          </div>

          {/* Testimonial */}
          <AnimatePresence mode="wait">
            {testimonial && (
              <motion.div
                key={testimonial.name + testimonial.text}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="mb-6 p-4 text-sm"
                style={{
                  border: "1px solid var(--hud-testi-border)",
                  background: "var(--hud-testi-bg)",
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "var(--hud-bg-deep)",
                      border: "1px solid var(--hud-border)",
                      color: "var(--hud-cyan)",
                      clipPath: clipIcon,
                    }}
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  {/* nombre: era text-[11px] → text-sm */}
                  <span
                    className="font-bold tracking-wider text-sm"
                    style={{ color: "var(--hud-cyan)" }}
                  >
                    {testimonial.name.toUpperCase()}
                  </span>
                  <div className="flex gap-0.5 ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3"
                        style={{
                          color:
                            i < testimonial.rating
                              ? "#F59E0B"
                              : "var(--hud-border-dim)",
                          fill:
                            i < testimonial.rating ? "#F59E0B" : "transparent",
                        }}
                      />
                    ))}
                  </div>
                </div>
                {/* texto testimonio: era text-xs implícito → text-sm */}
                <p
                  className="text-sm"
                  style={{ color: "var(--hud-text-muted)", lineHeight: 1.6 }}
                >
                  <span style={{ color: "var(--hud-cyan-dim)" }}>"</span>
                  {testimonial.text}
                  <span style={{ color: "var(--hud-cyan-dim)" }}>"</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CTA con ElectricBorder ── */}
          <div style={{ position: "relative", zIndex: 20, paddingTop: 8 }}>
            <ElectricBorder
              color="#38BDF8"
              speed={1.2}
              chaos={0.25}
              borderRadius={6}
              style={{ width: "100%" }}
            >
              <motion.button
                onClick={() => setOpenForm(!openForm)}
                className="w-full relative overflow-hidden font-bold tracking-[0.18em] uppercase flex items-center justify-center gap-3 py-4 px-6"
                style={{
                  fontSize: 13 /* era text-xs (12px) → 13px */,
                  background: openForm
                    ? "var(--hud-btn-open-bg)"
                    : "linear-gradient(90deg, var(--hud-btn-from), var(--hud-btn-to))",
                  color: openForm ? "var(--hud-btn-open-txt)" : "white",
                  cursor: "pointer",
                  border: "none",
                  borderRadius: 6,
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1 }}
              >
                {!openForm && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)",
                    }}
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                )}
                {openForm ? (
                  <>
                    <X className="w-4 h-4" />
                    <span>CERRAR FORMULARIO</span>
                  </>
                ) : (
                  <>
                    <Terminal className="w-4 h-4" />
                    <span>INICIAR SOLICITUD</span>
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                  </>
                )}
              </motion.button>
            </ElectricBorder>
          </div>

          {/* Form */}
          <AnimatePresence>
            {openForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                onSubmit={handleSubmit}
                className="mt-3 overflow-hidden"
              >
                <div
                  className="p-5 space-y-4"
                  style={{
                    border: "1px solid var(--hud-border-dim)",
                    background: "var(--hud-form-bg)",
                    clipPath: clipForm,
                  }}
                >
                  <div
                    className="flex items-center gap-2 pb-2 border-b"
                    style={{ borderColor: "var(--hud-border-dim)" }}
                  >
                    <Terminal
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--hud-cyan)" }}
                    />
                    {/* era text-[10px] → text-xs */}
                    <span
                      className="text-xs tracking-[0.2em] uppercase font-bold"
                      style={{ color: "var(--hud-cyan)" }}
                    >
                      FORMULARIO DE SOLICITUD
                    </span>
                  </div>

                  {[
                    {
                      name: "nombre",
                      placeholder: "nombre_completo",
                      type: "text",
                    },
                    { name: "telefono", placeholder: "telefono", type: "tel" },
                    {
                      name: "correo",
                      placeholder: "correo@electronico.com",
                      type: "email",
                    },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 + i * 0.07 }}
                    >
                      {/* era text-[10px] → text-xs */}
                      <span
                        className="text-xs flex-shrink-0 font-bold"
                        style={{ color: "var(--hud-cyan-dim)" }}
                      >
                        $
                      </span>
                      <Input
                        name={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        className="text-sm border-0 border-b rounded-none bg-transparent px-0 focus-visible:ring-0"
                        style={{
                          borderBottom: "1px solid var(--hud-input-border)",
                          color: "var(--hud-input-text)",
                          fontFamily: "monospace",
                          caretColor: "var(--hud-cyan)",
                        }}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span
                      className="text-xs mt-2 flex-shrink-0 font-bold"
                      style={{ color: "var(--hud-cyan-dim)" }}
                    >
                      $
                    </span>
                    <Textarea
                      name="descripcion"
                      placeholder="descripcion_del_problema..."
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="text-sm border-0 border-b rounded-none bg-transparent px-0 min-h-[80px] focus-visible:ring-0 resize-none"
                      style={{
                        borderBottom: "1px solid var(--hud-input-border)",
                        color: "var(--hud-input-text)",
                        fontFamily: "monospace",
                        caretColor: "var(--hud-cyan)",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 text-sm tracking-[0.15em] uppercase font-bold border-0 rounded-none"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--hud-btn-from), var(--hud-btn-to))",
                        color: "white",
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="inline-block w-3.5 h-3.5 border border-white/40 border-t-white rounded-full"
                          />
                          TRANSMITIENDO...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          ENVIAR SOLICITUD
                        </span>
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
