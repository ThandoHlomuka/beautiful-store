'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAdmin } from '@/context/AdminContext';
import { useCurrency, currencies } from '@/context/CurrencyContext';

export default function Header() {
  const { itemCount } = useCart();
  const { isAdmin } = useAdmin();
  const { currency, setCurrency } = useCurrency();
  const [cartOpen, setCartOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold gradient-text">LuxeStore</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
              >
                <span>{currency.symbol}</span>
                <span>{currency.code}</span>
                <svg className={`w-4 h-4 transition-transform ${currencyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-50 animate-fade-in">
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => { setCurrency(curr.code); setCurrencyOpen(false); }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between ${currency.code === curr.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                    >
                      <span>{curr.symbol} {curr.name}</span>
                      <span className="text-xs text-gray-400">{curr.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/admin-login"
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Admin
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}