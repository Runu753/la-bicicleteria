import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bike, MessageCircle, Mail, ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Brand icons as SVG components
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

interface NavigationProps {
  onOpenAuth: () => void;
}

const Navigation = ({ onOpenAuth }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const { itemCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const goToShop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/tienda') {
      navigate('/tienda');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Esperar a que la navegación complete antes de hacer scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setIsContactOpen(false);
      }
    };
    if (isContactOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isContactOpen]);

  const contactOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: 'https://wa.me/34600123456',
    },
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://www.instagram.com/labicicleteriabikeshop/',
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: 'https://www.facebook.com/labicicleteriabikeshop/?locale=es_LA',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:labicicleteriabikeshop@gmail.com',
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-dark-900/90 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo simplificado */}
          <button
            onClick={goToHome}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <Bike className="w-6 h-6 text-brand-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-lg font-medium text-white">
              La Bicicletería
            </span>
          </button>

          {/* Desktop Navigation limpia */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={goToShop}
              className="nav-link text-gray-300 hover:text-white transition-colors text-sm"
            >
              Tienda
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="nav-link text-gray-300 hover:text-white transition-colors text-sm"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="nav-link text-gray-300 hover:text-white transition-colors text-sm"
            >
              Contacto
            </button>

            {/* Contact Dropdown — click para abrir */}
            <div
              ref={contactRef}
              className="relative"
            >
              <button
                onClick={() => setIsContactOpen((prev) => !prev)}
                className={`btn-primary text-sm py-2 px-5 transition-opacity ${isContactOpen ? 'opacity-90' : ''}`}
              >
                Contactar
              </button>

              {/* El pt-2 cubre el hueco visual y evita que el ratón "salga" */}
              <div className="absolute top-full right-0 pt-2">
                <div
                  className={`w-48 py-2 rounded-lg bg-dark-800 border border-white/10 shadow-xl transition-all duration-200 ${
                    isContactOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {contactOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <a
                        key={option.name}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsContactOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                      >
                        <IconComponent />
                        <span>{option.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1 text-gray-300 hover:text-white transition-colors">
                  <div className="w-7 h-7 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 text-sm font-medium">
                    {user?.name.charAt(0)}
                  </div>
                </button>
                <div className="absolute top-full right-0 mt-2 w-44 py-2 rounded-lg bg-dark-800 border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-white/5">
                    <p className="text-white text-sm truncate">{user?.name}</p>
                    <p className="text-gray-500 text-xs truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-400 hover:bg-white/5 transition-colors text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-brand-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-dark-800 rounded-lg p-4 space-y-1 border border-white/10">
            <button
              onClick={() => {
                goToShop();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Tienda
            </button>
            <button
              onClick={() => {
                scrollToSection('servicios');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Servicios
            </button>
            <button
              onClick={() => {
                scrollToSection('contacto');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              Contacto
            </button>

            <div className="border-t border-white/10 pt-3 mt-3">
              <p className="px-4 text-xs text-gray-500 mb-2">Contactar vía</p>
              <div className="grid grid-cols-2 gap-2">
                {contactOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-sm"
                    >
                      <IconComponent />
                      <span>{option.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {!isAuthenticated && (
              <div className="border-t border-white/10 pt-3 mt-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="btn-primary w-full text-sm"
                >
                  Iniciar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
