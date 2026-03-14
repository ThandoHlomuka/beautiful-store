'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
  emailVerified: boolean;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedSession = localStorage.getItem('session');
    if (savedUser && savedSession) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User not found. Please sign up first.' };
    }

    if (foundUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Invalid password' };
    }

    const sessionToken = generateId();
    const session = { userId: foundUser.id, token: sessionToken, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify(foundUser));
    
    setUser(foundUser);
    setIsLoading(false);
    
    sendEmail('login', foundUser);
    
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }

    const verifyToken = generateId();
    const newUser: User & { password: string; verifyToken?: string } = {
      id: generateId(),
      email,
      name,
      password,
      verifyToken,
      addresses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
      emailVerified: false,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const sessionToken = generateId();
    const session = { userId: newUser.id, token: sessionToken, expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 };
    
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify(newUser));
    
    setUser(newUser);
    setIsLoading(false);
    
    sendEmail('signup', newUser);
    
    return { success: true };
  };

  const sendEmail = (type: 'signup' | 'login' | 'order' | 'verification', userData: any) => {
    const emails = JSON.parse(localStorage.getItem('emailQueue') || '[]');
    const templates = JSON.parse(localStorage.getItem('emailTemplates') || '{}');
    
    const emailTemplates = {
      signup: templates.signup || {
        subject: 'Welcome to Metra Marketplace!',
        body: `<h1>Welcome ${userData.name}!</h1><p>Thank you for joining Metra Marketplace. We're excited to have you!</p><p>Start exploring our amazing products today.</p>`
      },
      login: templates.login || {
        subject: 'New Login to Your Account',
        body: `<h1>Hello ${userData.name}!</h1><p>We noticed a new login to your Metra Marketplace account.</p><p>If this wasn't you, please contact support immediately.</p>`
      },
      order: templates.order || {
        subject: 'Order Confirmation - Metra Marketplace',
        body: `<h1>Order Confirmed!</h1><p>Thank you for your order. We're processing it now and will ship soon.</p>`
      },
      verification: templates.verification || {
        subject: 'Verify Your Email',
        body: `<h1>Verify Your Email</h1><p>Click the link below to verify your email address:</p><a href="#">Verify Email</a>`
      }
    };

    emails.push({
      id: generateId(),
      to: userData.email,
      type,
      subject: emailTemplates[type].subject,
      body: emailTemplates[type].body,
      sentAt: null,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('emailQueue', JSON.stringify(emails));
    console.log(`📧 Email queued: ${type} to ${userData.email}`);
  };

  const logout = () => {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress = { ...address, id: generateId() };
    const addresses = user.addresses.length === 0 
      ? [{ ...newAddress, isDefault: true }] 
      : [...user.addresses, newAddress];
    updateProfile({ addresses });
  };

  const removeAddress = (id: string) => {
    if (!user) return;
    const addresses = user.addresses.filter(a => a.id !== id);
    updateProfile({ addresses });
  };

  const addToWishlist = (productId: string) => {
    if (!user) return;
    if (!user.wishlist.includes(productId)) {
      updateProfile({ wishlist: [...user.wishlist, productId] });
    }
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;
    updateProfile({ wishlist: user.wishlist.filter(id => id !== productId) });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateProfile, 
      addAddress, 
      removeAddress,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}