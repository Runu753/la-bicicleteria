import { Wrench, Bike, Truck, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group p-6 rounded-xl bg-dark-800 border border-white/10 hover:border-brand-500/40 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(38,166,154,0.08)] ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-brand-500/20 group-hover:scale-110">
        <service.icon className="w-5 h-5 text-brand-400" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-medium text-white mb-3">
        {service.title}
      </h3>
      <p className="text-gray-400 mb-4 text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {service.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
            <ChevronRight className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.1 });

  const services = [
    {
      icon: Wrench,
      title: 'Mecánicos de élite',
      description:
        'Nuestros profesionales formaron parte del equipo mecánico de la Selección Española. Tu bici recibe el mismo trato que la de un campeón.',
      features: ['Ajuste profesional', 'Preparación de carreras', 'Mecánica de precisión'],
    },
    {
      icon: Bike,
      title: 'Distribuidor oficial',
      description:
        'Distribuidores autorizados de Scott y Orbea. Encuentra tu bici ideal con asesoramiento personalizado de verdaderos expertos.',
      features: ['Catálogo completo', 'Asesoramiento experto', 'Financiación disponible'],
    },
    {
      icon: Truck,
      title: 'Recogida a domicilio',
      description:
        '¿No puedes venir al taller? No te preocupes. Recogemos tu bici en toda la zona de Candeleda y alrededores.',
      features: ['Zona de Candeleda', 'Horario flexible', 'Entrega en 24-48h'],
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-dark-900">
      <div className="max-w-5xl mx-auto section-padding">
        {/* Section Header simple con animación */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-12 ${
            headerVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">
            Todo lo que tu bici <span className="text-brand-400">necesita</span>
          </h2>
          {/* Línea decorativa */}
          <span
            className={`reveal-line mx-auto mb-4 w-12 ${headerVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          />
          <p className="text-gray-400 leading-relaxed">
            Desde un simple ajuste hasta la preparación para tu próxima gran carrera,
            nuestros profesionales tienen la experiencia que buscas.
          </p>
        </div>

        {/* Services Grid con animaciones */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA simple con animación */}
        <div
          ref={ctaRef}
          className={`mt-12 text-center ${ctaVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <p className="text-gray-400 text-sm mb-3">
            ¿Necesitas algo específico para tu bici?
          </p>
          <a
            href="https://wa.me/34600123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors hover:gap-2"
          >
            Habla con nuestros profesionales
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
