import useSWR from 'swr';
import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipCard from '@/components/TipCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/pages/api/fetchapi';

const categories = ['Todos', 'Mantenimiento', 'Hardware', 'Software', 'Seguridad'];
  
interface Tip {

  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  date: string;
}

const fetcher = () => apiFetch<{ data: Tip[] }>('/tipss');

const Tips = () => {
  const { data, error } = useSWR('/tipss', fetcher);

  const tips = data?.data || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(6);

  // Reset visibleCount cuando cambian búsqueda o categoría
  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, selectedCategory]);

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [tips, searchQuery, selectedCategory]);

  const visibleTips = filteredTips.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTips.length;

  if (error) return <div>Error al cargar tips</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nuestros <span className="text-gradient">Tips</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Consejos y trucos tecnológicos para optimizar tu experiencia digital.
            </p>
          </div>
          {/* Search y categorías */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tips */}
          {filteredTips.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleTips.map((tip, index) => (
                  <div
                    key={tip._id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TipCard {...tip} />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Cargar más tips
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No se encontraron tips.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tips;
