import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Glows decorativos */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl animate-pulse" />

      <div className="relative z-10 text-center max-w-md px-6">
        <span className="block text-sm uppercase tracking-widest text-muted-foreground">
          Error
        </span>

        <h1 className="mt-2 text-7xl font-extrabold tracking-tight text-primary drop-shadow-sm">
          404
        </h1>

        <p className="mt-6 text-lg font-medium">Esta página no existe</p>

        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            Volver al inicio
          </a>

          <a
            href="javascript:history.back()"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Página anterior
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
