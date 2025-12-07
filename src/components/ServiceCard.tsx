import { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface ServiceCardProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ReactNode;
  features: string[];
}

const ServiceCard = ({ title, shortDescription, fullDescription, icon, features }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    descripcion: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call - Replace with actual Supabase call when enabled
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "¡Solicitud enviada!",
      description: "Nos pondremos en contacto contigo pronto.",
    });

    setFormData({ nombre: '', telefono: '', correo: '', descripcion: '' });
    setIsSubmitting(false);
    setIsExpanded(false);
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={cn(
          "card-gradient rounded-2xl p-6 cursor-pointer transition-all duration-300 border border-border/50 hover-glow group",
          "hover:border-primary/30 hover:scale-[1.02]"
        )}
      >
        <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{shortDescription}</p>
        <div className="mt-4 text-primary text-sm font-medium flex items-center gap-2">
          Ver más
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        >
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
          
          <div
            className="relative z-[101] w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-2">{title}</h2>
                  <p className="text-muted-foreground">{fullDescription}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-3">Incluye:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-4">Solicitar este servicio</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      required
                    />
                    <Input
                      type="tel"
                      placeholder="Teléfono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Correo electrónico"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Describe tu problema o necesidad..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Solicitar Servicio
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceCard;
