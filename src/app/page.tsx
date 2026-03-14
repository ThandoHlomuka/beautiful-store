'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { categories } from '@/data/products';
import Link from 'next/link';

export default function Home() {
  const { featuredProducts } = useProducts();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <main className="pt-16">
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                  New Collection 2026
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Discover
                  <span className="gradient-text block">Premium Quality</span>
                  Products
                </h1>
                <p className="mt-6 text-xl text-gray-600 max-w-lg">
                  Shop the latest trends with our curated collection of premium products. 
                  Free shipping on orders over $50.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/products" className="btn-primary text-lg px-8 py-4">
                    Shop Now
                  </Link>
                  <button className="btn-secondary text-lg px-8 py-4">
                    Learn More
                  </button>
                </div>
                <div className="mt-12 flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">50K+</div>
                    <div className="text-gray-500 text-sm">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">1000+</div>
                    <div className="text-gray-500 text-sm">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text">4.9</div>
                    <div className="text-gray-500 text-sm">Rating</div>
                  </div>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="w-48 h-64 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300 animate-fade-in stagger-1">
                      <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-48 h-48 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300 animate-fade-in stagger-2">
                      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-12">
                    <div className="w-48 h-48 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-[5deg] hover:rotate-0 transition-transform duration-300 animate-fade-in stagger-3">
                      <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300" alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-48 h-64 bg-white rounded-2xl shadow-xl overflow-hidden transform rotate-[5deg] hover:rotate-0 transition-transform duration-300 animate-fade-in stagger-4">
                      <img src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Shop by Category</h2>
              <p className="mt-4 text-gray-600">Browse our wide range of products</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="group p-6 bg-gray-50 rounded-2xl text-center hover:bg-gradient-to-br hover:from-blue-50 hover:to-orange-50 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <span className="text-2xl">
                      {['📱', '👕', '🏠', '⚽', '💄', '📚'][index]}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-800 group-hover:text-blue-600">{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold">Featured Products</h2>
                <p className="mt-2 text-gray-600">Handpicked favorites from our collection</p>
              </div>
              <Link href="/products" className="btn-secondary hidden md:inline-flex">
                View All
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Link href="/products" className="btn-secondary">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-gray-600">On orders over $50</p>
              </div>
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure checkout</p>
              </div>
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
                <p className="text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">L</span>
                  </div>
                  <span className="text-xl font-bold">LuxeStore</span>
                </div>
                <p className="text-gray-400">Your premium destination for quality products.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Shop</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/products" className="hover:text-white">All Products</Link></li>
                  <li><Link href="/products?category=Electronics" className="hover:text-white">Electronics</Link></li>
                  <li><Link href="/products?category=Clothing" className="hover:text-white">Clothing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">FAQs</a></li>
                  <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Newsletter</h4>
                <p className="text-gray-400 mb-4">Subscribe for updates and exclusive offers.</p>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border-none" />
                  <button className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700">Subscribe</button>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              © 2026 LuxeStore. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}