import { Star, MapPin } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const TrustBar = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-6 bg-dark-800 border-y border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto section-padding">
        <div
          ref={ref}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm"
        >
          {/* Google Rating */}
          <div className={`flex items-center gap-2 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-white font-medium">5.0</span>
            <span className="text-gray-500">Google Maps</span>
          </div>

          {/* Divider */}
          <div className={`hidden sm:block w-px h-4 bg-white/10 ${isVisible ? 'animate-scale-in delay-150' : 'opacity-0'}`} />

          {/* Reviews Count */}
          <div className={`text-gray-500 ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
            <span className="text-white font-medium">187 reseñas</span>
            <span className="ml-1">de clientes</span>
          </div>

          {/* Divider */}
          <div className={`hidden sm:block w-px h-4 bg-white/10 ${isVisible ? 'animate-scale-in delay-300' : 'opacity-0'}`} />

          {/* Location */}
          <div className={`flex items-center gap-1.5 text-gray-500 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.35s' }}>
            <MapPin className="w-4 h-4 text-brand-400" />
            <span>Candeleda y Arenas de San Pedro</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
