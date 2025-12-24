import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Coments from "@/components/ComentsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  MessageCircle,
  Contact,
} from "lucide-react";
import { apiFetch } from "./api/fetchapi";
import ComentsCard from "@/components/ComentsCard";

const Contacto = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await apiFetch<{ id: string }>("/contacto", {
        method: "POST",
        body: JSON.stringify({
          nombre: formData.nombre,
          telefono: formData.telefono,
          correo: formData.email,
          asunto: formData.asunto,
          mensaje: formData.mensaje,
        }),
      });

      toast({
        title: "¡Mensaje enviado!",
        description: `ID de tu mensaje: ${data.id}`,
      });

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "",
        mensaje: "",
      });
    } catch (error: any) {
      console.error("Error real:", error);

      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "vservicesac@gmail.com",
      href: "mailto:vservicesac@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Teléfono",
      value: "+34 674 993 764",
      href: "tel:+34674993764",
    },
    {
      icon: <MessageCircle className="w-5 h-5 " />,
      label: "WhatsApp",
      value: "+34 674 993 764",
      href: "https://wa.me/34674993764",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Ubicación",
      value: "España",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Horario",
      value: "Lun - Sab: 9:00 - 18:00",
    },
  ];

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
              <span className="text-gradient">Contacta</span> con Nosotros
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-snug">
              ¿Tienes alguna pregunta o necesitas nuestros servicios?
              <br />
              ¡Estamos aquí para ayudarte!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="card-gradient rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Te responderemos en menos de 24h
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Asunto"
                  value={formData.asunto}
                  onChange={(e) =>
                    setFormData({ ...formData, asunto: e.target.value })
                  }
                  required
                />
                <Textarea
                  placeholder="Tu mensaje..."
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                  rows={5}
                  required
                />
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card-gradient rounded-2xl p-6 md:p-8 border border-border/50">
                <h3 className="font-display font-semibold text-xl text-foreground mb-6">
                  Información de Contacto
                </h3>

                <div className="space-y-5">
                  {contactInfo.map((item, index) => {
                    const Wrapper = item.href ? "a" : "div";

                    return (
                      <Wrapper
                        key={index}
                        {...(item.href && {
                          href: item.href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          className: "block hover:opacity-80 transition",
                        })}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                            {item.icon}
                          </div>
                          <div className="text-left">
                            <p className="text-sm text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-foreground font-medium">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.main>
      <ComentsCard />
      <Footer />
    </div>
  );
};

export default Contacto;
