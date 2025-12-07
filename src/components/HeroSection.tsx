import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Image Column */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative h-[500px] lg:h-[600px] flex items-end justify-center">
              {/* Background shape */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-[90%] rounded-t-full bg-gradient-to-t from-primary/20 to-transparent" />
              
              {/* Founder Image Placeholder */}
              <div className="relative z-10 w-72 h-[480px] lg:w-80 lg:h-[550px] rounded-t-full overflow-hidden border-4 border-primary/30 glow">
                <div className="w-full h-full bg-gradient-to-br from-secondary to-card flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm">Foto del Fundador</p>
                    <p className="text-muted-foreground/60 text-xs mt-1">Alegre, brazos cruzados</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-20 left-0 w-16 h-16 rounded-xl glass flex items-center justify-center animate-float">
                <span className="text-2xl">💻</span>
              </div>
              <div className="absolute top-40 right-0 w-14 h-14 rounded-xl glass flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-xl">🔧</span>
              </div>
              <div className="absolute bottom-32 left-4 w-12 h-12 rounded-lg glass flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-lg">🛡️</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <Sparkles className="w-4 h-4" />
                <span>+10 años de experiencia</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Soluciones{' '}
                <span className="text-gradient">Tecnológicas</span>{' '}
                a tu Medida
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Soy Carlos Martínez, fundador de TechSoluciones. Con más de una década de experiencia en el sector tecnológico, me dedico a ofrecer soluciones informáticas personalizadas que realmente funcionan.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display font-semibold text-xl text-foreground">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3">
                {[
                  'Atención personalizada y cercana',
                  'Diagnóstico gratuito y sin compromiso',
                  'Soluciones rápidas y efectivas',
                  'Garantía en todos nuestros servicios'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="group">
                <Link to="/contacto">
                  Contacta Conmigo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/servicios">
                  Ver Servicios
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
