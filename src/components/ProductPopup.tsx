'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';

interface ProductPopupProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductPopup({ product, isOpen, onClose }: ProductPopupProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user, addToWishlist, removeFromWishlist } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedImage(0);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !product) return null;

  const isWishlisted = user?.wishlist.includes(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (!user) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative bg-gray-100 dark:bg-gray-800">
              <div className="aspect-square relative">
                <Image
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {product.originalPrice && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
                {product.featured && (
                  <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === i ? 'border-blue-600' : 'border-transparent'}`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {user && (
                  <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full ${isWishlisted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:text-red-500'}`}
                  >
                    <svg className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                )}
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold dark:text-white">{product.name}</h2>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-semibold dark:text-gray-300">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 dark:text-gray-400">{product.reviewCount} reviews</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold gradient-text">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.fullDescription || product.description}</p>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 dark:text-gray-400">Qty:</span>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg">-</button>
                    <span className="w-12 text-center font-medium dark:text-white">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg">+</button>
                  </div>
                </div>
                <span className={`ml-auto ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary py-4 disabled:opacity-50"
                >
                  {showAdded ? '✓ Added!' : 'Add to Cart'}
                </button>
                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="px-6 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                >
                  View Details
                </Link>
              </div>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="pt-4 border-t dark:border-gray-700">
                  <h3 className="font-semibold mb-3 dark:text-white">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{key}:</span>{' '}
                        <span className="dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}