import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipCard from '@/components/TipCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const tips = [
  {
    id: 1,
    title: 'Cómo limpiar tu PC por dentro sin dañarlo',
    description: 'Aprende a realizar una limpieza profunda de tu ordenador para mejorar su rendimiento y evitar sobrecalentamiento.',
    thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Mantenimiento',
    date: '15 Nov 2024',
  },
  {
    id: 2,
    title: '5 señales de que tu disco duro está fallando',
    description: 'Identifica los síntomas de un disco duro en mal estado antes de perder tus datos importantes.',
    thumbnail: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Hardware',
    date: '10 Nov 2024',
  },
  {
    id: 3,
    title: 'Protege tu WiFi: Configuración segura',
    description: 'Guía paso a paso para configurar tu red WiFi de forma segura y evitar intrusos.',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Seguridad',
    date: '5 Nov 2024',
  },
  {
    id: 4,
    title: 'Windows lento: Soluciones rápidas',
    description: 'Tips efectivos para acelerar Windows cuando tu ordenador empieza a ir lento.',
    thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Software',
    date: '1 Nov 2024',
  },
  {
    id: 5,
    title: 'Cómo hacer backup de tus datos',
    description: 'La regla 3-2-1 de copias de seguridad y las mejores herramientas gratuitas.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Seguridad',
    date: '28 Oct 2024',
  },
  {
    id: 6,
    title: 'Ampliar memoria RAM: Todo lo que necesitas saber',
    description: 'Guía completa para elegir e instalar memoria RAM compatible con tu equipo.',
    thumbnail: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Hardware',
    date: '20 Oct 2024',
  },
];

const categories = ['Todos', 'Mantenimiento', 'Hardware', 'Software', 'Seguridad'];

const Tips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const visibleTips = filteredTips.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTips.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Tips y <span className="text-gradient">Tutoriales</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Consejos prácticos y guías en video para sacar el máximo provecho a tu tecnología.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tips Grid */}
          {filteredTips.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleTips.map((tip, index) => (
                  <div
                    key={tip.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TipCard {...tip} />
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount(prev => prev + 6)}
                  >
                    Cargar más tips
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No se encontraron tips con esos criterios.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
