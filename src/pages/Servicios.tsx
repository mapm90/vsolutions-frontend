import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Monitor, HardDrive, Shield, Wifi, Wrench, Cloud, MonitorCheck, MonitorCog, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react';
  
const serviceVariants = {
  

  
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: 'blur(6px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0)',
    transition: {
      delay: i * 0.12,
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
    },
  }),
}

const services = [
  {
    title: 'Instalacion y mantenimiento de Software',
    shortDescription: '¿Crees que tu ordenador está lento o necesitas revizar por si faltan actualizaciones o hay alguno causando problemas, o necesitas algun software en especifico para el trabajo, el estudio o el ocio?',
    fullDescription: 'Ofrecemos servicios de instalación y configuración de software, desde sistemas operativos hasta aplicaciones específicas, asegurando que todo funcione correctamente.',
    icon: <MonitorCheck className="w-7 h-7 text-primary" />,
    features: ['Diagnóstico gratuito', 'Reparación de hardware', 'Cambio de componentes', 'Limpieza interna'],
  },
  {
    title: 'Reparación de Equipos',
    shortDescription: '¿Tuviste algun accidente con tu ordenador o simplemente dejo de funcionar correctamente?',
    fullDescription: 'Servicio completo de diagnóstico y reparación para todo tipo de ordenadores. Identificamos el problema y lo solucionamos de forma rápida y eficiente.',
    icon: <Wrench className="w-7 h-7 text-primary" />,
    features: ['Diagnóstico gratuito', 'Reparación de hardware', 'Cambio de componentes', 'Limpieza interna',],
  },

{
    title: 'Móviles y tablets',
    shortDescription: '¿Fallos en el sistema operativo, pantalla rota, bateria que no dura nada o problemas de conectividad?',
    fullDescription: 'Reparación y mantenimiento de dispositivos móviles y tablets, incluyendo reemplazo de pantallas, baterías y solución de problemas de software.',
    icon: <MonitorCog className="w-7 h-7 text-primary" />,
    features: ['Reemplazo de pantallas', 'Cambio de baterías', 'Solución de problemas de software', 'Recuperación de datos', 'Garantía de 3 meses'],
  },
    
  {
    title: 'Mantenimiento Preventivo',
    shortDescription: '¿Notas que tu equipo se sobrecalienta o va mas lento de lo normal  o se apaga de repente?',
    fullDescription: 'El mantenimiento preventivo alarga la vida útil de tu equipo y previene fallos inesperados. Incluye limpieza, actualización y optimización.',
    icon: <MonitorCog className="w-7 h-7 text-primary" />,
    features: ['Limpieza de sistema', 'Actualización de software', 'Optimización de rendimiento', 'Backup de datos', 'Informe de estado'],
  },
  
  {
    title: 'Seguridad Informática',
    shortDescription: '¿Los virus no te dejan apenas trabajar o navegar con tranquilidad, o sospechas que tienes intrusos o tu informacion esta expuesta?',
    fullDescription: 'Instalación y configuración de soluciones de seguridad, eliminación de malware y asesoramiento para mantener tu información protegida.',
    icon: <ShieldCheck className="w-7 h-7 text-primary" />,
    features: ['Antivirus profesional', 'Eliminación de malware', 'Firewall', 'Copias de seguridad', 'Asesoramiento de seguridad'],
  },
  {
    title: 'Redes y Conectividad',
    shortDescription: '¿Tienes nuevos equipos que conectar o la señal de internet no llega bien a todas las zonas de tu casa u oficina?',
    fullDescription: 'Instalación y configuración de redes WiFi, cableado estructurado, y solución de problemas de conectividad para hogares y empresas.',
    icon: <Wifi className="w-7 h-7 text-primary" />,
    features: ['Instalación de redes WiFi', 'Cableado estructurado', 'Extensores de señal', 'Configuración de routers', 'VPN'],
  },
   {title: 'Ensamblaje y Actualización de ordenadores',
shortDescription: '¿Quieres dar un salto de calidad y rendimiento a tu equipo actual o prefieres un equipo totalmente nuevo adaptado a tus necesidades?',
fullDescription: 'Hacemos tu proyecto a medida para que tu PC alcance el mejor rendimiento según tu presupuesto, desde la selección de componentes hasta el ensamblaje y configuración final. También realizamos actualizaciones y mejoras de equipos existentes, garantizando compatibilidad y eficiencia.',
icon: <MonitorCheck className="w-7 h-7 text-primary" />,
features: [ 'Montaje de PCs personalizadas',  'Actualización de componentes (RAM, GPU, SSD, etc.)',  'Optimización del rendimiento',  'Asesoramiento según presupuesto',  'Compatibilidad garantizada'],
},
 {title: 'Sitios web y aplicaciones',
shortDescription: '¿Sientes que tu negocio o proyecto necesita una presencia en linea profesional o una aplicacion para mejorar tus procesos o servicios?',
fullDescription: 'Ofrecemos desarrollo de sitios web personalizados y aplicaciones móviles adaptadas a tus necesidades, desde el diseño hasta la implementación y mantenimiento, asegurando una experiencia de usuario óptima y funcionalidad avanzada.',
icon: <MonitorCheck className="w-7 h-7 text-primary" />,
features: [ 'Diseño web personalizado',  'Desarrollo de aplicaciones móviles',  'Optimización SEO',  'Mantenimiento y soporte',  'Integración con e-commerce y redes sociales'],
},
   {title: 'Asesorias y consultorias informaticas',
shortDescription: '¿No sabes que equipo o software necesitas para tu trabajo, estudio o ocio o simplemente quieres mejorar tu infraestructura tecnologica, o crees que hay algo que las tecnologias te pueden resolver? ',
fullDescription: 'Tenemos la experiencia para asesorarte en la selección de hardware y software que mejor se adapte a tus necesidades, así como en la optimización de tus sistemas actuales. Ofrecemos consultorías personalizadas para ayudarte a tomar decisiones informadas y maximizar el rendimiento de tu infraestructura tecnológica.',
icon: <MonitorCheck className="w-7 h-7 text-primary" />,
features: [ 'Asesorias',  'Consejos',  'tips',  'Asesoramiento según presupuesto',  ],
},

];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @keyframes slideFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nuestros <span className="text-gradient">Servicios</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Soluciones informáticas profesionales adaptadas a tus necesidades. Haz clic en cualquier servicio para más información y solicitar presupuesto.
            </p>
          </div>

          {/* Services List */}
          <div className="space-y-6">
  {services.map((service, index) => (
    <motion.div
      key={service.title}
      custom={index}
      variants={serviceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-3px' }}
    >
      <ServiceCard {...service} />
    </motion.div>
  ))}
</div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Servicios;
