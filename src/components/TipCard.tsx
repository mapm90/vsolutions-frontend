import { useState } from "react";
import { Play, X, ExternalLink, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TipCardProps {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  date: string;
}

const TipCard = ({
  title,
  description,
  thumbnail,
  videoUrl,
  category,
  date,
}: TipCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : "";
  };

  const videoId = getYouTubeId(videoUrl);

  return (
    <>
      {/* Card */}
      <div
        className={cn(
          "card-gradient rounded-2xl overflow-hidden border border-border/50 transition-all duration-300 group",
          "hover:border-primary/30 hover:-translate-y-1 hover-glow cursor-pointer"
        )}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center glow">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full glass text-xs font-medium text-primary">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="w-3 h-3" />
            {date}
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Modal - Fixed positioning with proper z-index */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />

          <div
            className="relative z-[101] w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-secondary hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Embed */}
            <div className="aspect-video bg-muted">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Video no disponible
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-xs font-medium text-primary">
                  {category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {date}
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                {title}
              </h2>
              <p className="text-muted-foreground mb-4">{description}</p>
              <Button asChild variant="outline">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver en YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TipCard;
