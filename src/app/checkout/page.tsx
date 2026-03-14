'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { logUpdate } from '@/lib/updateLogger';

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

const shippingOptions: ShippingOption[] = [
  { id: 'bobgo-standard', name: 'Bobgo Standard', description: 'Reliable delivery', price: 99, estimatedDays: '3-5 days' },
  { id: 'bobgo-express', name: 'Bobgo Express', description: 'Fast delivery', price: 199, estimatedDays: '1-2 days' },
  { id: 'bobgo-overnight', name: 'Bobgo Overnight', description: 'Next day delivery', price: 349, estimatedDays: 'Next day' },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const { user, addAddress } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  });

  useEffect(() => {
    if (!user && !orderPlaced) {
      router.push('/login?redirect=/checkout');
    }
  }, [user, orderPlaced, router]);

  const shippingCost = selectedShipping.price;
  const finalTotal = total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (step < 3) {
      setStep(step + 1);
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1500));

    const order = {
      id: Date.now().toString(),
      items,
      subtotal: total,
      shipping: shippingCost,
      total: finalTotal,
      shippingMethod: selectedShipping.name,
      status: 'pending' as const,
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.province} ${formData.postalCode}`,
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));

    clearCart();
    setOrderPlaced(true);
    setLoading(false);
    
    logUpdate('success', 'Order', `New order placed: R${finalTotal.toFixed(2)}`, { orderId: order.id, items: items.length });
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your order. We've sent a confirmation email to {formData.email}.
            Your order will be shipped via {selectedShipping.name}.
          </p>
          <div className="space-y-3">
            <Link href="/products" className="btn-primary block">
              Continue Shopping
            </Link>
            <Link href="/account" className="btn-secondary block">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Store
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {s}
                    </div>
                    <span className={`ml-2 text-sm hidden sm:inline ${step >= s ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                      {s === 1 ? 'Shipping' : s === 2 ? 'Delivery' : 'Payment'}
                    </span>
                    {s < 3 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border rounded-xl"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border rounded-xl"
                        placeholder="Street address"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={e => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 border rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Province</label>
                        <input
                          type="text"
                          value={formData.province}
                          onChange={e => setFormData({ ...formData, province: e.target.value })}
                          className="w-full px-4 py-3 border rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full px-4 py-3 border rounded-xl"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Delivery Method (Bobgo)</h2>
                    <div className="space-y-3">
                      {shippingOptions.map(option => (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedShipping.id === option.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              checked={selectedShipping.id === option.id}
                              onChange={() => setSelectedShipping(option)}
                              className="w-4 h-4 text-purple-600"
                            />
                            <div>
                              <p className="font-semibold">{option.name}</p>
                              <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                            </div>
                          </div>
                              <span className="font-bold">{formatPrice(option.price)}</span>
                          </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <h2 className="text-xl font-bold mb-4">Order Review</h2>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-2 text-sm">
                      <p><span className="text-gray-500">Ship to:</span> {formData.name}</p>
                      <p><span className="text-gray-500">Address:</span> {formData.address}, {formData.city}</p>
                      <p><span className="text-gray-500">Delivery:</span> {selectedShipping.name} ({selectedShipping.estimatedDays})</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 border rounded-xl"
                        rows={3}
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="btn-secondary">
                      Back
                    </button>
                  )}
                  <button type="submit" disabled={loading} className="flex-1 btn-primary">
                    {loading ? 'Processing...' : step === 3 ? `Pay ${formatPrice(finalTotal)}` : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping ({selectedShipping.name})</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="gradient-text">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}