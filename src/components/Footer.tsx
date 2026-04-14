import { MapPin, Clock, MessageCircle, ExternalLink, Bike } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ref: footerRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const goToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const locations = [
    {
      name: 'Candeleda',
      address: 'Av. Ramón y Cajal, 1',
      mapsUrl: 'https://www.google.com/maps/place/La+Bicicleteria/@40.1525258,-5.2460641,17z/data=!3m1!4b1!4m6!3m5!1s0xd3fed5b935a167f:0x2fd92a6a4dbabbc7!8m2!3d40.1525218!4d-5.2411932!16s%2Fg%2F11jp07js69',
    },
    {
      name: 'Arenas de San Pedro',
      address: 'C. Puerto el Pico, 2',
      mapsUrl: 'https://www.google.com/maps/place/La+Bicicleteria/@40.2127858,-5.0860265,19z/data=!3m1!4b1!4m6!3m5!1s0xd3f8b6ee964e85d:0xf5fb7a420ee7125e!8m2!3d40.2127848!4d-5.0853828!16s%2Fg%2F11ylmjg92n',
    },
  ];

  return (
    <footer id="contacto" className="bg-dark-900 border-t border-white/5">
      {/* Main Footer */}
      <div ref={footerRef} className="max-w-5xl mx-auto section-padding py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className={`md:col-span-1 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <button
              onClick={goToHome}
              className="flex items-center gap-2 mb-4 cursor-pointer group"
            >
              <Bike className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-lg font-medium text-white">
                La Bicicletería
              </span>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Tu taller de confianza en Candeleda y Arenas de San Pedro.
              Experiencia y trato cercano de una tienda local.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-white">5.0</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <span className="text-gray-500 text-xs">(187 reseñas)</span>
            </div>
          </div>

          {/* Hours */}
          <div
            className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.15s' }}
          >
            <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-brand-400" />
              Horario
            </h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <span className="block text-white">Lunes a Viernes</span>
                <span className="text-gray-500">10:00 - 14:00 / 17:30 - 20:30</span>
              </li>
              <li>
                <span className="block text-white">Sábado y Domingo</span>
                <span className="text-gray-500">Cerrado</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div
            className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}
            style={{ animationDelay: '0.25s' }}
          >
            <h4 className="text-white font-medium mb-4 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-400" />
              Contacto
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              {locations.map((loc) => (
                <li key={loc.name}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-brand-400">{loc.name}</span>
                      <br />
                      <span className="text-gray-500">{loc.address}</span>
                    </div>
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://wa.me/34600123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-colors text-sm hover:scale-[1.02] transition-transform duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-5xl mx-auto section-padding py-4">
          <p className="text-center text-gray-500 text-xs">
            © {new Date().getFullYear()} La Bicicletería. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
