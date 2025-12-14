import useSWR from 'swr';
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TipCard from '@/components/TipCard';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['Todos', 'Mantenimiento', 'Hardware', 'Software', 'Seguridad'];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Tips = () => {
  // 👉 ahora apunta al backend real
  const { data, error } = useSWR('http://10.185.57.129:4000/', fetcher);


  // 👉 los tips vienen dentro de data.data
  const tips = data?.data || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredTips = useMemo(() => {
    return tips.filter((tip: any) => {
      const matchesSearch =
        tip.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'Todos' || tip.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, tips]);

  const visibleTips = filteredTips.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTips.length;

  if (error) return <div>Error al cargar tips</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">

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

          {/* Tips */}
          {filteredTips.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleTips.map((tip: any, index: number) => (
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
                    onClick={() => setVisibleCount(prev => prev + 6)}
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
