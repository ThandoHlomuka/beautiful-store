'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useProducts } from '@/context/ProductContext';
import { mockProducts, Product } from '@/data/products';
import { logUpdate } from '@/lib/updateLogger';

export default function AccountPage() {
  const { user, logout, updateProfile, addAddress, removeAddress } = useAuth();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { products } = useProducts();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressData, setAddressData] = useState({ name: '', line1: '', city: '', province: '', postalCode: '', country: 'South Africa' });

  const wishlistProducts = products.filter(p => user?.wishlist.includes(p.id));
  const orders = JSON.parse(localStorage.getItem('orders') || '[]').filter((o: any) => o.customerEmail === user?.email);

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleLogout = () => {
    logUpdate('info', 'Auth', `User logged out: ${user.email}`);
    logout();
    router.push('/');
  };

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setEditingProfile(false);
    logUpdate('success', 'Profile', 'Profile updated');
  };

  const handleAddAddress = () => {
    addAddress({ ...addressData, isDefault: user.addresses.length === 0 });
    setShowAddressForm(false);
    setAddressData({ name: '', line1: '', city: '', province: '', postalCode: '', country: 'South Africa' });
    logUpdate('success', 'Profile', 'Address added');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Account</h1>
            <p className="text-gray-500">Welcome back, {user.name}</p>
          </div>
          <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-medium">
            Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              {['profile', 'orders', 'wishlist', 'addresses'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition-colors capitalize ${activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>

          <main className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Profile Information</h2>
                  <button onClick={() => editingProfile ? handleSaveProfile() : setEditingProfile(true)} className="text-purple-600 font-medium">
                    {editingProfile ? 'Save' : 'Edit'}
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Name</label>
                    {editingProfile ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      <p className="font-medium">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Email</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Phone</label>
                    {editingProfile ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    ) : (
                      <p className="font-medium">{user.phone || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Member Since</label>
                    <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">My Orders</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <Link href="/products" className="btn-primary">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">{order.items.length} items</span>
                          <span className="font-bold">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                {wishlistProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                    <Link href="/products" className="btn-primary">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map(product => (
                      <div key={product.id} className="border rounded-xl overflow-hidden">
                        <div className="relative aspect-square">
                          <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold truncate">{product.name}</h3>
                          <p className="font-bold text-purple-600">{formatPrice(product.price)}</p>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full mt-2 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My Addresses</h2>
                  <button onClick={() => setShowAddressForm(true)} className="btn-primary text-sm">
                    + Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <h3 className="font-semibold mb-4">New Address</h3>
                    <div className="space-y-3">
                      <input type="text" placeholder="Address Name" value={addressData.name} onChange={e => setAddressData({ ...addressData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                      <input type="text" placeholder="Street Address" value={addressData.line1} onChange={e => setAddressData({ ...addressData, line1: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="City" value={addressData.city} onChange={e => setAddressData({ ...addressData, city: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                        <input type="text" placeholder="Province" value={addressData.province} onChange={e => setAddressData({ ...addressData, province: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                        <input type="text" placeholder="Postal Code" value={addressData.postalCode} onChange={e => setAddressData({ ...addressData, postalCode: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setShowAddressForm(false)} className="btn-secondary flex-1">Cancel</button>
                        <button onClick={handleAddAddress} className="btn-primary flex-1">Save</button>
                      </div>
                    </div>
                  </div>
                )}

                {user.addresses.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No addresses saved</p>
                ) : (
                  <div className="space-y-4">
                    {user.addresses.map(address => (
                      <div key={address.id} className="border rounded-xl p-4 flex justify-between">
                        <div>
                          <p className="font-semibold">{address.name}</p>
                          <p className="text-gray-500 text-sm">{address.line1}, {address.city}, {address.province} {address.postalCode}</p>
                          {address.isDefault && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mt-2 inline-block">Default</span>}
                        </div>
                        <button onClick={() => removeAddress(address.id)} className="text-red-500 hover:text-red-700">Remove</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}