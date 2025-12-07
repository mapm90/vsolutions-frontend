import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import perfil from '../media/perfil.jpg';


const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 relative overflow-hidden bg-background">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="flex min-h-[calc(100vh-6rem)] ">
        {/* Image Column - Left, Full Height, Edge to Edge */}
        <div className="hidden lg:flex lg:w-[40%] relative items-end bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-tr-[3rem]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          
          {/* Founder Image Placeholder - Full width of column */}
          <div className="relative w-full h-full flex items-end justify-center ">
            <div className="w-full h-full bg-gradient-to-t from-secondary via-card to-card/50 flex items-center justify-center border-t-4 border-r-4 border-primary/30 rounded-tr-[3rem]">
              <img 
                src={perfil}
                  className="w-full h-full object-cover rounded-tr-[3rem]"
              />
            </div>
            
          </div>
        </div>

        {/* Mobile Image */}
        <div className="lg:hidden absolute top-24 left-0 right-0 h-[300px] flex items-center justify-center bg-gradient-to-b from-primary/10 to-transparent">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-secondary to-card flex items-center justify-center border-4 border-primary/30 glow">
            <div className="text-center">
              
      <img 
          src={perfil}
            className="w-full h-full object-cover rounded-t-[3rem]"
              />
            </div>
          </div>
        </div>

        {/* Content Column - Right */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center px-6 lg:px-16 py-8 lg:py-16 mt-[320px] lg:mt-0">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary font-medium">
                                <span>+10 años de experiencia</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                Soluciones{' '}
                <span className="text-gradient">Tecnológicas</span>{' '}
                a tu Medida
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Soy Verónica Borges, fundadora de V-Solutions. Con más de una década de experiencia en el sector tecnológico, me dedico a ofrecer soluciones informáticas personalizadas que realmente funcionan.
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
