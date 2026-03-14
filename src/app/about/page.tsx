'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';

export default function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      
      <main className="pt-24 pb-16">
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About LuxeStore</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">We are dedicated to providing premium quality products with exceptional customer service.</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2024, LuxeStore started with a simple mission: to make premium products accessible to everyone. 
                We believe that quality shouldn't come at a premium price.
              </p>
              <p className="text-gray-600">
                Today, we serve thousands of happy customers worldwide, offering a curated selection of products 
                across Electronics, Clothing, Home & Garden, Sports, Beauty, and Books.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl font-bold gradient-text">50K+</div>
                <div className="text-gray-600 mt-2">Happy Customers</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl font-bold gradient-text">1000+</div>
                <div className="text-gray-600 mt-2">Products</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl font-bold gradient-text">50+</div>
                <div className="text-gray-600 mt-2">Countries</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                <div className="text-4xl font-bold gradient-text">4.9</div>
                <div className="text-gray-600 mt-2">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🚚', title: 'Free Shipping', desc: 'Free shipping on orders over $50' },
                { icon: '🛡️', title: 'Secure Payments', desc: '100% secure payment processing' },
                { icon: '↩️', title: 'Easy Returns', desc: '30-day return policy' },
                { icon: '💬', title: '24/7 Support', desc: 'Round-the-clock customer support' },
                { icon: '✅', title: 'Quality Guaranteed', desc: 'All products quality tested' },
                { icon: '⚡', title: 'Fast Delivery', desc: 'Quick delivery within 3-5 days' }
              ].map((item, i) => (
                <div key={i} className="text-center p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}