import { useState } from "react";
import { ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/pages/api/fetchapi";

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: ReactElement;
  features: string[];
  index?: number; // opcional para animación
  backgroundImage?: string;
}

const ServiceCard = ({
  title,
  shortDescription,
  fullDescription,
  icon,
  features,
  index = 0,
  backgroundImage,
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
        description: "Solicitud enviada correctamente",
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
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.12,
        type: "spring",
        stiffness: 120,
        damping: 20,
      }}
    >
      <div className="relative rounded-2xl overflow-hidden border border-border/50 p-6 md:p-8 w-full max-w-6xl mx-auto">
        {/* Imagen de fondo solo mitad inferior con degradado suave */}
        {backgroundImage && (
          <div
            className="absolute inset-0 z-0 pointer-events-none rounded-2xl overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `
        linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.2) 60%),
        url(${backgroundImage})
      `,
              backgroundSize: "cover",
              backgroundPosition: "center bottom",
              backgroundRepeat: "no-repeat",
              filter: "blur(8px) brightness(1.5) saturate(2)",
              opacity: 0.3, // baja opacidad para que el texto resalte
              transform: "scale(1.05)",
              maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, black 60%, transparent 100%)",
              willChange: "transform",
            }}
          />
        )}

        {/* Overlay oscuro */}
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none rounded-2xl" />
        )}

        {/* Contenido */}
        <div className="relative z-20">
          <h3 className="font-display font-semibold text-xl text-foreground mb-6">
            {title}
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 text-primary">{icon}</div>
              <div className="flex-1">
                <p className="text-muted-foreground mb-2 text-justify">
                  {shortDescription}
                </p>
                <p className="text-foreground mb-4 text-justify">
                  {fullDescription}
                </p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  {features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <Button onClick={() => setOpenForm(!openForm)}>
                  {openForm ? "Cerrar sin enviar" : "Solicitar servicio"}
                </Button>

                <AnimatePresence>
                  {openForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="mt-4 space-y-3"
                    >
                      <Input
                        name="nombre"
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                      <Input
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                      <Input
                        name="correo"
                        placeholder="Correo electrónico"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                      />
                      <Textarea
                        name="descripcion"
                        placeholder="Descripción de la solicitud"
                        value={formData.descripcion}
                        onChange={handleChange}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar solicitud"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
