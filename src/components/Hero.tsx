import { MessageCircle, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 via-dark-900 to-dark-900" />
        {/* Glow sutil centrado */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(ellipse, #26a69a 0%, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto section-padding pt-32 pb-28">
        <div className="text-center">
          {/* Badge con shimmer */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-shimmer border border-brand-500/20 text-brand-400 text-sm mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
            Especialistas en Candeleda y Arenas de San Pedro
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight animate-fade-in"
            style={{ animationDelay: '0.12s' }}
          >
            Tu pasión en <span className="text-brand-400">las mejores manos</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: '0.24s' }}
          >
            Diego y Marcos te esperan en La Bicicletería.{' '}
            Expertos en mecánica de competición y distribuidores oficiales Scott y Orbea.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in"
            style={{ animationDelay: '0.36s' }}
          >
            <a
              href="https://wa.me/34600123456"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-3 hover:scale-[1.03] transition-transform duration-200"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </a>
            <button
              onClick={scrollToServices}
              className="btn-outline text-base px-8 py-3 hover:scale-[1.03] transition-transform duration-200"
            >
              Ver servicios
            </button>
          </div>

          {/* Stats */}
          <div
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto animate-fade-in"
            style={{ animationDelay: '0.48s' }}
          >
            <div className="text-center">
              <div className="text-2xl font-semibold text-white mb-1">5.0</div>
              <div className="text-sm text-gray-500">Valoración</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl font-semibold text-white mb-1">187</div>
              <div className="text-sm text-gray-500">Reseñas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-white mb-1">15+</div>
              <div className="text-sm text-gray-500">Años</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        aria-label="Scroll hacia abajo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 hover:text-brand-400 transition-colors duration-300 animate-fade-in"
        style={{ animationDelay: '0.8s' }}
      >
        <span className="text-xs tracking-widest uppercase">Explorar</span>
        <ChevronDown className="w-4 h-4 animate-scroll-bounce" />
      </button>
    </section>
  );
};

export default Hero;
