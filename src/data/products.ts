export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
  specifications: Record<string, string>;
  upsellProducts?: string[];
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
    fullDescription: 'Experience ultimate audio freedom with our Premium Wireless Headphones. Featuring advanced active noise cancellation, 40mm custom drivers, and ultra-soft memory foam ear cushions for all-day comfort. With 30-hour battery life and quick charge technology, your music never has to stop. The built-in microphone with voice assistant support lets you take calls and control your music hands-free.',
    price: 5499,
    originalPrice: 6999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800'
    ],
    stock: 50,
    rating: 4.8,
    reviewCount: 234,
    featured: true,
    tags: ['wireless', 'noise-cancelling', 'premium', 'bluetooth'],
    specifications: {
      'Driver Size': '40mm',
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Noise Cancellation': 'Active (ANC)',
      'Frequency Response': '20Hz - 20kHz'
    },
    upsellProducts: ['2', '7']
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life. Water resistant to 50m.',
    fullDescription: 'The Smart Watch Pro is your ultimate health and lifestyle companion. Featuring advanced health monitoring including heart rate, blood oxygen, sleep tracking, and stress management. Built-in GPS for accurate workout tracking without your phone. With 7-day battery life and water resistance up to 50 meters, it is ready for any adventure.',
    price: 8299,
    originalPrice: 9999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800'
    ],
    stock: 30,
    rating: 4.6,
    reviewCount: 189,
    featured: true,
    tags: ['smartwatch', 'fitness', 'health', 'water-resistant'],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '50m',
      'GPS': 'Built-in',
      'Sensors': 'Heart rate, SpO2, Accelerometer',
      'Compatibility': 'iOS & Android'
    },
    upsellProducts: ['1', '8']
  },
  {
    id: '3',
    name: 'Minimalist Backpack',
    description: 'Stylish and functional backpack with laptop compartment, water-resistant material.',
    fullDescription: 'Crafted for the modern professional, this minimalist backpack combines style with functionality. Features a dedicated 15-inch laptop compartment, organizational pockets for your essentials, and water-resistant material to keep your belongings dry. The sleek design makes it perfect for work, travel, or everyday use.',
    price: 1649,
    originalPrice: 1999,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800'
    ],
    stock: 100,
    rating: 4.5,
    reviewCount: 87,
    featured: false,
    tags: ['backpack', 'laptop', 'water-resistant', 'travel'],
    specifications: {
      'Material': 'Water-resistant polyester',
      'Laptop Compartment': 'Up to 15"',
      'Capacity': '25L',
      'Dimensions': '45 x 30 x 15cm',
      'Weight': '0.8kg'
    }
  },
  {
    id: '4',
    name: 'Organic Skincare Set',
    description: 'Complete skincare routine with organic ingredients. Includes cleanser, toner, and moisturizer.',
    fullDescription: 'Transform your skincare routine with our Organic Skincare Set. Made with 100% organic ingredients, this 3-step system includes a gentle cleanser, refreshing toner, and hydrating moisturizer. Suitable for all skin types, these products are free from harsh chemicals, parabens, and synthetic fragrances. Experience the natural glow of healthy skin.',
    price: 2399,
    originalPrice: 2999,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=800'
    ],
    stock: 45,
    rating: 4.7,
    reviewCount: 156,
    featured: true,
    tags: ['skincare', 'organic', 'natural', 'beauty'],
    specifications: {
      'Includes': 'Cleanser, Toner, Moisturizer',
      'Volume': '100ml each',
      'Skin Type': 'All types',
      'Organic': '100% Certified',
      'Cruelty-Free': 'Yes',
      'Shelf Life': '12 months'
    }
  },
  {
    id: '5',
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with advanced cushioning. Perfect for marathons and daily runs.',
    fullDescription: 'Take your running to the next level with Running Shoes Ultra. Featuring our revolutionary cloud-cushioning technology, these shoes provide exceptional energy return and comfort. The breathable mesh upper keeps your feet cool, while the durable outsole ensures excellent grip. Whether you are training for a marathon or going for a daily jog, these shoes deliver peak performance.',
    price: 3299,
    originalPrice: 3999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800'
    ],
    stock: 60,
    rating: 4.4,
    reviewCount: 203,
    featured: false,
    tags: ['running', 'shoes', 'sports', 'athletic'],
    specifications: {
      'Weight': '280g (size 9)',
      'Cushioning': 'Cloud-technology',
      'Upper': 'Breathable mesh',
      'Outsole': 'Rubber',
      'Drop': '8mm',
      'Stack Height': '32mm'
    },
    upsellProducts: ['8']
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    description: 'Premium designer sunglasses with UV400 protection. Stylish and functional.',
    fullDescription: 'Make a statement with our Designer Sunglasses. Featuring UV400 protection, these sunglasses block 100% of harmful UV rays. The premium acetate frame offers all-day comfort, while the scratch-resistant lenses ensure clear vision. Perfect for any occasion, these sunglasses combine luxury with functionality.',
    price: 3999,
    originalPrice: 4999,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800'
    ],
    stock: 25,
    rating: 4.3,
    reviewCount: 78,
    featured: false,
    tags: ['sunglasses', 'designer', 'uv-protection', 'fashion'],
    specifications: {
      'Frame Material': 'Premium acetate',
      'Lens Material': 'Polycarbonate',
      'UV Protection': 'UV400 (100%)',
      'Lens Color': 'Gradient',
      'Frame Width': '145mm',
      'Includes': 'Hard case, cleaning cloth'
    }
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 20-hour playtime.',
    fullDescription: 'Bring the party anywhere with our Bluetooth Speaker. Featuring 360° omnidirectional sound, this portable speaker fills any space with rich, immersive audio. The IPX7 waterproof rating means it can handle splashes, rain, and even submersion in water. With 20 hours of playtime, the music keeps going as long as you do.',
    price: 2749,
    originalPrice: 3499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
      'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800'
    ],
    stock: 80,
    rating: 4.6,
    reviewCount: 145,
    featured: false,
    tags: ['bluetooth', 'speaker', 'portable', 'waterproof'],
    specifications: {
      'Output Power': '30W',
      'Battery Life': '20 hours',
      'Waterproof Rating': 'IPX7',
      'Connectivity': 'Bluetooth 5.0',
      'Range': '30m',
      'Weight': '1.2kg'
    },
    upsellProducts: ['1']
  },
  {
    id: '8',
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface. Eco-friendly materials.',
    fullDescription: 'Elevate your practice with our Premium Yoga Mat. At 6mm thick, it provides excellent cushioning for your joints while maintaining stability. The double-sided non-slip surface ensures you stay grounded in any pose. Made from eco-friendly TPE material, this mat is as good for the planet as it is for your practice.',
    price: 1299,
    originalPrice: 1599,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800'
    ],
    stock: 120,
    rating: 4.8,
    reviewCount: 267,
    featured: true,
    tags: ['yoga', 'mat', 'fitness', 'eco-friendly'],
    specifications: {
      'Thickness': '6mm',
      'Material': 'Eco-friendly TPE',
      'Size': '183cm x 61cm',
      'Weight': '2kg',
      'Non-slip': 'Double-sided',
      'Carrying Strap': 'Included'
    },
    upsellProducts: ['5']
  },
  {
    id: '9',
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with thermal carafe. Makes up to 12 cups.',
    fullDescription: 'Start every morning with the perfect cup of coffee. The Coffee Maker Deluxe features programmable brewing, so you can wake up to fresh coffee. The thermal carafe keeps your coffee hot for hours without burning. With a built-in coffee grinder and multiple brew strength options, you can customize your perfect brew every time.',
    price: 2949,
    originalPrice: 3599,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800'
    ],
    stock: 40,
    rating: 4.5,
    reviewCount: 112,
    featured: false,
    tags: ['coffee', 'maker', 'kitchen', 'appliance'],
    specifications: {
      'Capacity': '12 cups',
      'Carafe': 'Thermal stainless steel',
      'Programmable': 'Yes',
      'Grinder': 'Built-in',
      'Power': '1000W',
      'Dimensions': '28 x 20 x 36cm'
    }
  },
  {
    id: '10',
    name: 'Best Selling Novel Collection',
    description: 'Collection of 5 bestselling novels by award-winning authors.',
    fullDescription: 'Escape into captivating stories with our Best Selling Novel Collection. This curated set includes 5 groundbreaking novels by award-winning authors that have touched millions of readers worldwide. From gripping thrillers to heartwarming dramas, this collection offers hours of entertainment. Perfect for book lovers or as a thoughtful gift.',
    price: 899,
    originalPrice: 1299,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
    ],
    stock: 200,
    rating: 4.9,
    reviewCount: 534,
    featured: false,
    tags: ['books', 'novels', 'bestseller', 'collection'],
    specifications: {
      'Format': 'Paperback',
      'Number of Books': '5',
      'Total Pages': '2400+',
      'Language': 'English',
      'Genre': 'Mixed Fiction'
    }
  },
  {
    id: '11',
    name: 'Gaming Controller',
    description: 'Professional gaming controller with customizable buttons and haptic feedback.',
    fullDescription: 'Take your gaming to the next level with our Professional Gaming Controller. Featuring customizable buttons, adjustable triggers, and advanced haptic feedback, this controller gives you the competitive edge. The ergonomic design ensures comfort during long gaming sessions. Compatible with PC, PlayStation, and Xbox.',
    price: 1499,
    originalPrice: 1899,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800',
    images: [
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800',
      'https://images.unsplash.com/photo-1600080972464-8cb002c91e39?w=800'
    ],
    stock: 75,
    rating: 4.7,
    reviewCount: 189,
    featured: false,
    tags: ['gaming', 'controller', 'esports', 'accessories'],
    specifications: {
      'Connectivity': 'USB-C / Bluetooth',
      'Battery Life': '20 hours',
      'Customizable Buttons': '4',
      'Haptic Feedback': 'Advanced',
      'Compatibility': 'PC, PS, Xbox',
      'Weight': '250g'
    }
  },
  {
    id: '12',
    name: 'Indoor Plant Set',
    description: 'Set of 3 beautiful indoor plants with decorative pots. Low maintenance.',
    fullDescription: 'Bring nature indoors with our Indoor Plant Set. This collection includes 3 carefully selected, low-maintenance plants perfect for any space. Each plant comes in a stylish decorative pot that complements any decor. Great for improving air quality and adding a touch of green to your home or office.',
    price: 1099,
    originalPrice: 1499,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800'
    ],
    stock: 55,
    rating: 4.4,
    reviewCount: 89,
    featured: false,
    tags: ['plants', 'indoor', 'home', 'decor'],
    specifications: {
      'Number of Plants': '3',
      'Pot Style': 'Decorative ceramic',
      'Plant Height': '30-40cm',
      'Care Level': 'Low maintenance',
      'Light Requirements': 'Indirect light',
      'Watering': 'Weekly'
    }
  }
];