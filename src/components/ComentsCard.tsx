import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/pages/api/fetchapi";

interface Comentario {
  _id: string;
  nombre: string;
  comentario: string;
  fecha: string;
  aprobado: boolean;
}
function tiempoRelativo(fecha: string | Date) {
  const ahora = new Date();
  const f = new Date(fecha);
  const diffMs = ahora.getTime() - f.getTime();

  const segundos = Math.floor(diffMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const meses = Math.floor(dias / 30);
  const anios = Math.floor(dias / 365);

  if (segundos < 60) return "Hace un momento";
  if (minutos < 60) return `Hace ${minutos} minuto${minutos > 1 ? "s" : ""}`;
  if (horas < 24) return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
  if (dias < 30) return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
  if (meses < 12) return `Hace ${meses} mes${meses > 1 ? "es" : ""}`;
  return `Hace ${anios} año${anios > 1 ? "s" : ""}`;
}

const accionesComentario: string[] = [
  "ha comentado 💬",
  "nos dice 👇",
  "compartió su opinión ✍️",
  "ha escrito ✍️",
  "dejó este comentario 💭",
  "nos cuenta 💬",
  "expresó su opinión 🗣️",
  "quiso compartir esto ✨",
  "comentó lo siguiente 👇",
  "dejó estas palabras ✨",
  "nos deja su mensaje 💭",
  "aportó su punto de vista ✍️",
  "nos comparte su experiencia 💬",
  "ha querido dejar su opinión ✨",
  "expresó lo siguiente 👇",
  "nos transmite su mensaje 💭",
  "ha aportado este comentario ✍️",
  "nos hace llegar su opinión 💬",
  "quiso decirnos esto 👇",
  "ha dejado su punto de vista 🗣️",
  "nos comparte estas palabras ✨",
  "aportó este mensaje 💭",
  "comentó su experiencia ✍️",
  "nos dejó este aporte 💬",
];

const ComentsCard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    comentario: "",
  });
  const [loading, setLoading] = useState(false);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  // Obtener comentarios aprobados
  const obtenerComentarios = async () => {
    try {
      const res = await apiFetch("/comentario", {
        method: "GET", // explícito para que quede claro que es lectura
      });

      if ((res as any).success) {
        setComentarios((res as any).data.filter((c: Comentario) => c.aprobado));
      }
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.comentario) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      await apiFetch("/comentario", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      toast({
        title: "Éxito",
        description: "Comentario enviado correctamente.",
      });

      setFormData({ nombre: "", comentario: "" });
      setOpenForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Error al enviar comentario",
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
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <div className="card-gradient rounded-2xl p-6 md:p-8 border border-border/50">
        <h2 className="font-display font-semibold text-xl text-foreground mb-6">
          Deja tu comentario
        </h2>

        <Button onClick={() => setOpenForm(!openForm)}>
          {openForm ? "Cerrar sin enviar" : "Escribir comentario"}
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
              <Textarea
                name="comentario"
                placeholder="Escribe tu comentario aquí"
                value={formData.comentario}
                onChange={handleChange}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Enviando..." : "Publicar Comentario"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <h3 className="text-lg font-semibold mt-6 mb-2">
          Lo que se comenta de V-Services:
        </h3>
        <ul className="space-y-2">
          {[...comentarios]
            .sort(
              (a, b) =>
                new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            )
            .map((c) => (
              <li key={c._id} className="border p-2 rounded">
                <p className="font-bold">
                  {c.nombre}{" "}
                  {
                    accionesComentario[
                      Math.floor(Math.random() * accionesComentario.length)
                    ]
                  }
                </p>
                <p>{c.comentario}</p>
                <p className="text-sm text-gray-500">
                  {tiempoRelativo(c.fecha)}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ComentsCard;
