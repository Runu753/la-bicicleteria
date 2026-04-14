import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.1 });

  const testimonials = [
    {
      name: 'Marc Garcia',
      role: 'Ciclista aficionado',
      content:
        'La honestidad de Diego es impresionante. Me dijo exactamente lo que necesitaba mi bici y lo que no. No intenta venderte lo que no hace falta. Ya llevo 3 años yendo y no cambiaría por nada.',
      rating: 5,
    },
    {
      name: 'Victor Diaz',
      role: 'Ciclista de carretera',
      content:
        'Los únicos que tocan mis bici para una carrera son ellos. La rapidez con la que preparan todo es increíble. Me sacaron de un apuro el día antes de una competición importante.',
      rating: 5,
    },
    {
      name: 'Ana Carrillo',
      role: 'MTB enthusiast',
      content:
        'El trato impecable desde el primer día. Marcos se tomó el tiempo de explicarme todo lo que le hizo a la bici y darme consejos de mantenimiento. Se nota que les importa el cliente.',
      rating: 5,
    },
    {
      name: 'Javier Martin',
      role: 'Triatleta',
      content:
        'Profesionalidad y cercanía. Esa combinación es difícil de encontrar. Me han montado dos bici desde cero y el resultado ha sido espectacular en ambas ocasiones.',
      rating: 5,
    },
    {
      name: 'Laura Sanchez',
      role: 'Ciclista urbana',
      content:
        'Descubrí La Bicicletería por las reseñas de Google y superó mis expectativas. Diego arregló una avería que otros talleres no lograban identificar. Muy recomendable.',
      rating: 5,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-20 bg-dark-800">
      <div className="max-w-4xl mx-auto section-padding">
        {/* Section Header simple con animación */}
        <div
          ref={headerRef}
          className={`text-center mb-12 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            Lo que dicen nuestros <span className="text-brand-400">clientes</span>
          </h2>
          {/* Línea decorativa */}
          <span
            className={`reveal-line mx-auto mb-3 w-12 ${headerVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          />
          <p className="text-gray-400 text-sm">
            187 reseñas que avalan nuestro compromiso
          </p>
        </div>

        {/* Testimonial Card con animación */}
        <div
          ref={cardRef}
          className={`relative ${cardVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="p-8 sm:p-10 rounded-xl bg-dark-900 border border-white/10 transition-all duration-500">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Content con transición suave */}
            <div key={currentIndex} className="animate-fade-in-up" style={{ animationDuration: '0.4s' }}>
              <blockquote className="text-lg text-gray-300 leading-relaxed mb-8">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-medium">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="p-2 rounded-lg border border-white/10 hover:border-brand-500/50 text-gray-400 hover:text-white transition-all duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-4 bg-brand-500'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Ir a testimonio ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-lg border border-white/10 hover:border-brand-500/50 text-gray-400 hover:text-white transition-all duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
