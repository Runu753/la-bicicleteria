import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Cart = () => {
  const { items, itemCount, total, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [, setCheckoutStep] = useState<'cart' | 'login' | 'checkout'>('cart');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isCartOpen) {
      // Pequeño delay para que el DOM monte antes de iniciar la transición
      const t = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(t);
    } else {
      setIsVisible(false);
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCheckoutStep('login');
    } else {
      // In a real app, this would redirect to payment
      alert('Redirigiendo a pasarela de pago...');
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop con fade */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Panel — slide desde la derecha */}
      <div
        className={`relative w-full max-w-md bg-dark-800 h-full shadow-2xl flex flex-col border-l border-white/10 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-medium text-white">Tu Carrito</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-brand-500/20 text-brand-400 text-xs font-medium rounded">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-scale-in">
              <ShoppingCart className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-400 text-sm mb-1">Tu carrito está vacío</p>
              <p className="text-gray-500 text-xs">Añade productos para empezar</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary mt-4 text-sm"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-dark-900 rounded-lg border border-white/5 animate-fade-in-up hover:border-white/10 transition-colors"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                    <p className="text-gray-500 text-xs mb-1">{item.category}</p>
                    <div className="text-brand-400 text-sm font-medium">
                      {item.price.toLocaleString('es-ES')} €
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-gray-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Vaciar carrito
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/5 bg-dark-800">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">{total.toLocaleString('es-ES')} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Envío</span>
                <span className="text-green-400">Gratis</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-white font-medium">Total</span>
                <span className="text-lg font-semibold text-brand-400">
                  {total.toLocaleString('es-ES')} €
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isAuthenticated ? 'Proceder al pago' : 'Iniciar sesión para comprar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
