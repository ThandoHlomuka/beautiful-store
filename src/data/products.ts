export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

export const categories = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Beauty',
  'Books'
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 50,
    rating: 4.8,
    featured: true
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Water resistant to 50m.',
    price: 449.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 30,
    rating: 4.6,
    featured: true
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    description: 'Stylish and functional backpack with laptop compartment, water-resistant material.',
    price: 89.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 100,
    rating: 4.5,
    featured: false
  },
  {
    id: '4',
    name: 'Organic Skincare Set',
    description: 'Complete skincare routine with organic ingredients. Includes cleanser, toner, and moisturizer.',
    price: 129.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    stock: 45,
    rating: 4.7,
    featured: true
  },
  {
    id: '5',
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with advanced cushioning. Perfect for marathons and daily runs.',
    price: 179.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 60,
    rating: 4.4,
    featured: false
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    description: 'Premium designer sunglasses with UV400 protection. Stylish and functional.',
    price: 219.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
    stock: 25,
    rating: 4.3,
    featured: false
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 20-hour playtime.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    stock: 80,
    rating: 4.6,
    featured: false
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface. Eco-friendly materials.',
    price: 69.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    stock: 120,
    rating: 4.8,
    featured: true
  },
  {
    id: '9',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Makes up to 12 cups.',
    price: 159.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    stock: 40,
    rating: 4.5,
    featured: false
  },
  {
    id: '10',
    name: 'Best Selling Novel Collection',
    description: 'Collection of 5 bestselling novels by award-winning authors.',
    price: 49.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    stock: 200,
    rating: 4.9,
    featured: false
  },
  {
    id: '11',
    name: 'Gaming Controller',
    description: 'Professional gaming controller with customizable buttons and haptic feedback.',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400',
    stock: 75,
    rating: 4.7,
    featured: false
  },
  {
    id: '12',
    name: 'Indoor Plant Set',
    description: 'Set of 3 beautiful indoor plants with decorative pots. Low maintenance.',
    price: 59.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    stock: 55,
    rating: 4.4,
    featured: false
  }
];