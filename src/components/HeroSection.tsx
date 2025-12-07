import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
          {/* Image Column - Left, Full Height */}
          <div className="lg:w-2/5 relative flex items-end justify-center lg:justify-start order-1 lg:order-1 mb-8 lg:mb-0">
            <div className="relative w-full max-w-sm lg:max-w-none lg:w-full h-[400px] lg:h-full">
              {/* Founder Image Placeholder */}
              <div className="absolute bottom-0 left-1/2 lg:left-0 -translate-x-1/2 lg:translate-x-0 w-72 lg:w-[90%] h-[90%] overflow-hidden">
                {/* Gradient background behind image */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent rounded-t-3xl" />
                
                <div className="relative w-full h-full flex items-end justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-secondary to-card flex items-center justify-center border-t-4 border-x-4 border-primary/30 rounded-t-3xl">
                    <div className="text-center p-6">
                      <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center glow">
                        <Sparkles className="w-14 h-14 text-primary" />
                      </div>
                      <p className="text-muted-foreground text-base">Foto de Fundadora</p>
                      <p className="text-muted-foreground/60 text-sm mt-2">Medio perfil, hasta la cintura</p>
                      <p className="text-muted-foreground/60 text-xs mt-1">Alegre y profesional</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-10 right-4 lg:right-0 w-14 h-14 rounded-xl glass flex items-center justify-center animate-float">
                <span className="text-xl">💻</span>
              </div>
              <div className="absolute top-1/3 right-0 lg:-right-4 w-12 h-12 rounded-xl glass flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-lg">🔧</span>
              </div>
              <div className="absolute bottom-1/4 right-8 lg:right-4 w-10 h-10 rounded-lg glass flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-base">🛡️</span>
              </div>
            </div>
          </div>

          {/* Content Column - Right */}
          <div className="lg:w-3/5 lg:pl-12 flex flex-col justify-center order-2 lg:order-2 py-8 lg:py-16">
            <div className="space-y-8">
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
                  Soy María González, fundadora de TechSoluciones. Con más de una década de experiencia en el sector tecnológico, me dedico a ofrecer soluciones informáticas personalizadas que realmente funcionan.
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
      </div>
    </section>
  );
};

export default HeroSection;
