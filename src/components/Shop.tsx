import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { Product } from '../data/products';

interface ShopProps {
  initialCategory?: string;
}

const ProductCard = ({ product, index, onOpen, onAdd }: { product: Product; index: number; onOpen: (p: Product) => void; onAdd: (p: Product) => void }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <div
      ref={ref}
      onClick={() => onOpen(product)}
      className={`group bg-dark-800 rounded-xl overflow-hidden border border-white/10 hover:border-brand-500/40 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(38,166,154,0.08)] cursor-pointer ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${(index % 4) * 0.1}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-brand-400 mb-1">
          {product.brand} · {product.category}
        </div>
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-semibold text-white">
            {product.price.toLocaleString('es-ES')} €
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through">
              {product.originalPrice.toLocaleString('es-ES')} €
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onAdd(product)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-dark-900 border border-white/10 text-white text-sm hover:border-brand-500/30 transition-all hover:scale-[1.02]"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir
          </button>
          <button
            onClick={() => {
              onAdd(product);
            }}
            className="flex-1 px-3 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium transition-all hover:scale-[1.02]"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

const Shop = ({ initialCategory }: ShopProps = {}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart, setIsCartOpen } = useCart();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });

  const categories = [
    { id: null, name: 'Todos' },
    { id: 'Descenso', name: 'Descenso' },
    { id: 'Enduro', name: 'Enduro' },
    { id: 'MTB', name: 'MTB' },
    { id: 'Carretera', name: 'Carretera' },
    { id: 'Eléctricas', name: 'Eléctricas' },
    { id: 'Accesorios', name: 'Accesorios' },
    { id: 'Componentes', name: 'Componentes' },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory || p.subcategory === selectedCategory)
    : products;

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <section id="tienda" className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Header con animación */}
        <div
          ref={headerRef}
          className={`text-center max-w-2xl mx-auto mb-10 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3 tracking-tight">
            Nuestra <span className="text-brand-400">Tienda</span>
          </h2>
          {/* Línea decorativa */}
          <span
            className={`reveal-line mx-auto mb-3 w-12 ${headerVisible ? 'is-visible' : ''}`}
            style={{ animationDelay: '0.3s' }}
          />
          <p className="text-gray-400">
            Catálogo Scott y Orbea. Bicicletas y accesorios de alta gama.
          </p>
        </div>

        {/* Category Filters con animación */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                selectedCategory === cat.id || (cat.id === null && selectedCategory === null)
                  ? 'bg-brand-500 text-white'
                  : 'bg-dark-800 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid con animaciones */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onOpen={openProductDetail}
              onAdd={handleAddToCart}
            />
          ))}
        </div>

        {/* Product Detail Modal con animación */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-dark-800 rounded-xl max-w-3xl w-full overflow-hidden border border-white/10 max-h-[90vh] overflow-y-auto animate-fade-in-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-square">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm">
                      <span className="text-brand-400">{selectedProduct.brand}</span>
                      <span className="text-gray-500 mx-1">·</span>
                      <span className="text-gray-400">{selectedProduct.category}</span>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-3">{selectedProduct.name}</h2>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{selectedProduct.description}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-semibold text-white">
                      {selectedProduct.price.toLocaleString('es-ES')} €
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-gray-500 line-through">
                        {selectedProduct.originalPrice.toLocaleString('es-ES')} €
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 text-sm">Especificaciones</h4>
                    <ul className="space-y-1.5">
                      {Object.entries(selectedProduct.specs).map(([key, value]) => (
                        <li key={key} className="flex justify-between text-sm border-b border-white/5 pb-1.5">
                          <span className="text-gray-400">{key}</span>
                          <span className="text-white">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-gray-400 mb-4">
                    Stock: <span className="text-brand-400">{selectedProduct.stock} unidades</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 btn-primary text-sm hover:scale-[1.02] transition-transform"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1.5" />
                      Añadir al carrito
                    </button>
                    <button
                      onClick={() => {
                        handleBuyNow(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 btn-outline text-sm hover:scale-[1.02] transition-transform"
                    >
                      Comprar ya
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
