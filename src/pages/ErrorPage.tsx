const ErrorPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Glows decorativos */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-400/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-red-500/20 blur-3xl animate-pulse animation-delay-200" />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl font-extrabold text-red-600 mb-4 drop-shadow-lg animate-fade-in">
          Error
        </h1>
        <p
          className="text-lg text-red-800 mb-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Oops! Algo salió mal y no podemos cargar esta página.
        </p>

        <div
          className="flex justify-center gap-6 mt-4 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
          >
            Volver al inicio
          </a>
          <button
            onClick={() => location.reload()}
            className="px-6 py-3 rounded-xl border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition transform hover:scale-105"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
