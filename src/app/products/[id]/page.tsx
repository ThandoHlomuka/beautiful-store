'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { mockProducts, Product, Review } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';

const generateReviews = (productId: string): Review[] => {
  const names = ['John D.', 'Sarah M.', 'Mike R.', 'Emma L.', 'David K.', 'Lisa P.', 'Tom H.', 'Anna W.'];
  const comments = [
    'Absolutely love this product! Exceeded my expectations.',
    'Great quality and fast shipping. Highly recommended!',
    'Good value for money. Would buy again.',
    'The product looks even better in person. Very happy!',
    'Customer service was excellent. Quick response.',
    'Perfect for my needs. Could not be happier.',
    'Quality is top-notch. Worth every penny.',
    'Amazing experience from order to delivery.'
  ];
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${productId}-review-${i}`,
    userId: `user${i}`,
    userName: names[i % names.length],
    rating: Math.floor(Math.random() * 2) + 4,
    comment: comments[i % comments.length],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    helpful: Math.floor(Math.random() * 20)
  }));
};

export default function ProductPage() {
  const params = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });

  const product = products.find(p => p.id === params.id) || mockProducts.find(p => p.id === params.id);
  const upsellProducts = product?.upsellProducts?.map(id => 
    products.find(p => p.id === id) || mockProducts.find(p => p.id === id)
  ).filter(Boolean) as Product[];

  useEffect(() => {
    if (product) {
      setReviews(generateReviews(product.id));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: `review-${Date.now()}`,
      userId: 'current-user',
      userName: newReview.name || 'Anonymous',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      helpful: 0
    };
    setReviews([review, ...reviews]);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Home</Link> / 
            <Link href="/products" className="hover:text-blue-600"> Products</Link> / 
            <span className="ml-2">{product.name}</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-10">
              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
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
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 ${selectedImage === i ? 'border-blue-600' : 'border-transparent'}`}
                      >
                        <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{product.reviewCount} reviews</span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold gradient-text">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">Quantity:</span>
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-l-lg"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span className={`ml-auto ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 lg:p-10">
              <h2 className="text-2xl font-bold mb-6">Specifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 bg-white rounded-3xl shadow-sm p-6 lg:p-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews</h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="btn-secondary"
              >
                Write a Review
              </button>
            </div>

            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-bold mb-4">Write Your Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <svg className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    placeholder="Share your experience with this product"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.userName}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <button className="mt-3 text-sm text-blue-600 hover:underline">
                    Helpful ({review.helpful})
                  </button>
                </div>
              ))}
            </div>
          </div>

          {upsellProducts && upsellProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {upsellProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPopup(false)} />
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full animate-fade-in text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Added to Cart!</h3>
            <p className="text-gray-600 mb-6">{product.name} has been added to your cart.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowPopup(false)} className="flex-1 btn-secondary">
                Continue Shopping
              </button>
              <button onClick={() => { setShowPopup(false); setCartOpen(true); }} className="flex-1 btn-primary">
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}