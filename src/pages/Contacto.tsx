import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';

const Contacto = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "¡Mensaje enviado!",
      description: "Te responderemos lo antes posible.",
    });

    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@techsoluciones.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Teléfono', value: '+34 912 345 678' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Ubicación', value: 'Madrid, España' },
    { icon: <Clock className="w-5 h-5" />, label: 'Horario', value: 'Lun - Vie: 9:00 - 18:00' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Contacta</span> con Nosotros
            </h1>
            <p className="text-muted-foreground text-lg">
              ¿Tienes alguna pregunta o necesitas nuestros servicios? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="card-gradient rounded-2xl p-6 md:p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-xl text-foreground">Envíanos un mensaje</h2>
                  <p className="text-sm text-muted-foreground">Te responderemos en menos de 24h</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Asunto"
                  value={formData.asunto}
                  onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Tu mensaje..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  rows={5}
                  required
                />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
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
                <h3 className="font-display font-semibold text-xl text-foreground mb-6">Información de Contacto</h3>
                <div className="space-y-5">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="text-foreground font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card-gradient rounded-2xl overflow-hidden border border-border/50 aspect-video">
                <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">Mapa interactivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacto;
