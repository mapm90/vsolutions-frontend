import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Monitor, HardDrive, Shield, Wifi, Wrench, Cloud } from 'lucide-react';

const services = [
  {
    title: 'Reparación de Equipos',
    shortDescription: 'Diagnóstico y reparación de ordenadores de escritorio y portátiles.',
    fullDescription: 'Servicio completo de diagnóstico y reparación para todo tipo de ordenadores. Identificamos el problema y lo solucionamos de forma rápida y eficiente.',
    icon: <Wrench className="w-7 h-7 text-primary" />,
    features: ['Diagnóstico gratuito', 'Reparación de hardware', 'Cambio de componentes', 'Limpieza interna', 'Garantía de 6 meses'],
  },
  {
    title: 'Mantenimiento Preventivo',
    shortDescription: 'Evita problemas futuros con un mantenimiento regular de tu equipo.',
    fullDescription: 'El mantenimiento preventivo alarga la vida útil de tu equipo y previene fallos inesperados. Incluye limpieza, actualización y optimización.',
    icon: <Monitor className="w-7 h-7 text-primary" />,
    features: ['Limpieza de sistema', 'Actualización de software', 'Optimización de rendimiento', 'Backup de datos', 'Informe de estado'],
  },
  {
    title: 'Recuperación de Datos',
    shortDescription: 'Recuperamos tus archivos importantes de discos dañados.',
    fullDescription: 'Utilizamos herramientas profesionales para recuperar datos de discos duros dañados, memorias USB, tarjetas SD y otros dispositivos.',
    icon: <HardDrive className="w-7 h-7 text-primary" />,
    features: ['Recuperación de HDD/SSD', 'Memorias USB', 'Tarjetas SD', 'RAID', 'Evaluación sin compromiso'],
  },
  {
    title: 'Seguridad Informática',
    shortDescription: 'Protege tu equipo y datos contra virus y amenazas.',
    fullDescription: 'Instalación y configuración de soluciones de seguridad, eliminación de malware y asesoramiento para mantener tu información protegida.',
    icon: <Shield className="w-7 h-7 text-primary" />,
    features: ['Antivirus profesional', 'Eliminación de malware', 'Firewall', 'Copias de seguridad', 'Asesoramiento de seguridad'],
  },
  {
    title: 'Redes y Conectividad',
    shortDescription: 'Configuración y optimización de redes domésticas y empresariales.',
    fullDescription: 'Instalación y configuración de redes WiFi, cableado estructurado, y solución de problemas de conectividad para hogares y empresas.',
    icon: <Wifi className="w-7 h-7 text-primary" />,
    features: ['Instalación de redes WiFi', 'Cableado estructurado', 'Extensores de señal', 'Configuración de routers', 'VPN'],
  },
  {
    title: 'Servicios en la Nube',
    shortDescription: 'Migración y gestión de servicios cloud para tu negocio.',
    fullDescription: 'Te ayudamos a migrar tus servicios a la nube, configurar almacenamiento online y gestionar tus recursos de forma eficiente y segura.',
    icon: <Cloud className="w-7 h-7 text-primary" />,
    features: ['Migración a la nube', 'Google Workspace', 'Microsoft 365', 'Backup en la nube', 'Sincronización de archivos'],
  },
];

const Servicios = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nuestros <span className="text-gradient">Servicios</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Soluciones informáticas profesionales adaptadas a tus necesidades. Haz clic en cualquier servicio para más información y solicitar presupuesto.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Servicios;
