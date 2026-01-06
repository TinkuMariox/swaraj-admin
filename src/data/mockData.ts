// Mock data for the jewellery admin panel

export interface Product {
  id: string;
  name: string;
  category: 'Ring' | 'Necklace' | 'Bracelet' | 'Earring';
  material: 'Gold' | 'Silver' | 'Diamond';
  purity: '18K' | '22K' | '24K';
  weight: number;
  makingCharges: number;
  gst: number;
  finalPrice: number;
  stock: number;
  status: 'Active' | 'Inactive';
  featured: boolean;
  images: string[];
  createdAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  items: OrderItem[];
  shippingAddress: Address;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpend: number;
  status: 'Active' | 'Blocked';
  joinedAt: string;
  avatar?: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: string;
  uploadedAt: string;
}

export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  minOrderValue: number;
  expiryDate: string;
  enabled: boolean;
  usageCount: number;
}

export interface StoreSettings {
  storeName: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  gstPercentage: number;
}

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'PRD001',
    name: 'Royal Solitaire Diamond Ring',
    category: 'Ring',
    material: 'Diamond',
    purity: '18K',
    weight: 5.2,
    makingCharges: 8500,
    gst: 3,
    finalPrice: 285000,
    stock: 12,
    status: 'Active',
    featured: true,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'],
    createdAt: '2024-01-15',
  },
  {
    id: 'PRD002',
    name: 'Elegant Pearl Necklace',
    category: 'Necklace',
    material: 'Gold',
    purity: '22K',
    weight: 18.5,
    makingCharges: 15000,
    gst: 3,
    finalPrice: 425000,
    stock: 8,
    status: 'Active',
    featured: true,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'],
    createdAt: '2024-01-12',
  },
  {
    id: 'PRD003',
    name: 'Classic Gold Bracelet',
    category: 'Bracelet',
    material: 'Gold',
    purity: '22K',
    weight: 12.3,
    makingCharges: 9500,
    gst: 3,
    finalPrice: 185000,
    stock: 3,
    status: 'Active',
    featured: false,
    images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'],
    createdAt: '2024-01-10',
  },
  {
    id: 'PRD004',
    name: 'Diamond Stud Earrings',
    category: 'Earring',
    material: 'Diamond',
    purity: '18K',
    weight: 3.8,
    makingCharges: 6500,
    gst: 3,
    finalPrice: 145000,
    stock: 15,
    status: 'Active',
    featured: true,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'],
    createdAt: '2024-01-08',
  },
  {
    id: 'PRD005',
    name: 'Silver Charm Bracelet',
    category: 'Bracelet',
    material: 'Silver',
    purity: '18K',
    weight: 8.5,
    makingCharges: 3500,
    gst: 3,
    finalPrice: 25000,
    stock: 0,
    status: 'Inactive',
    featured: false,
    images: ['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400'],
    createdAt: '2024-01-05',
  },
  {
    id: 'PRD006',
    name: 'Heritage Gold Necklace',
    category: 'Necklace',
    material: 'Gold',
    purity: '24K',
    weight: 25.0,
    makingCharges: 22000,
    gst: 3,
    finalPrice: 685000,
    stock: 5,
    status: 'Active',
    featured: true,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'],
    createdAt: '2024-01-03',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: 'CUS001',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    amount: 285000,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    date: '2024-01-20',
    items: [
      {
        productId: 'PRD001',
        productName: 'Royal Solitaire Diamond Ring',
        quantity: 1,
        price: 285000,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
      },
    ],
    shippingAddress: {
      street: '123 Park Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India',
    },
  },
  {
    id: 'ORD002',
    customerId: 'CUS002',
    customerName: 'Rahul Mehta',
    customerEmail: 'rahul.mehta@email.com',
    amount: 425000,
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    date: '2024-01-19',
    items: [
      {
        productId: 'PRD002',
        productName: 'Elegant Pearl Necklace',
        quantity: 1,
        price: 425000,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      },
    ],
    shippingAddress: {
      street: '456 Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400002',
      country: 'India',
    },
  },
  {
    id: 'ORD003',
    customerId: 'CUS003',
    customerName: 'Ananya Gupta',
    customerEmail: 'ananya.gupta@email.com',
    amount: 145000,
    paymentStatus: 'Pending',
    orderStatus: 'Processing',
    date: '2024-01-18',
    items: [
      {
        productId: 'PRD004',
        productName: 'Diamond Stud Earrings',
        quantity: 1,
        price: 145000,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
      },
    ],
    shippingAddress: {
      street: '789 MG Road',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
    },
  },
  {
    id: 'ORD004',
    customerId: 'CUS004',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.singh@email.com',
    amount: 185000,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    date: '2024-01-17',
    items: [
      {
        productId: 'PRD003',
        productName: 'Classic Gold Bracelet',
        quantity: 1,
        price: 185000,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
      },
    ],
    shippingAddress: {
      street: '321 Brigade Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
    },
  },
  {
    id: 'ORD005',
    customerId: 'CUS005',
    customerName: 'Meera Patel',
    customerEmail: 'meera.patel@email.com',
    amount: 685000,
    paymentStatus: 'Failed',
    orderStatus: 'Cancelled',
    date: '2024-01-16',
    items: [
      {
        productId: 'PRD006',
        productName: 'Heritage Gold Necklace',
        quantity: 1,
        price: 685000,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      },
    ],
    shippingAddress: {
      street: '654 CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380001',
      country: 'India',
    },
  },
];

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'CUS001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    totalOrders: 5,
    totalSpend: 785000,
    status: 'Active',
    joinedAt: '2023-06-15',
  },
  {
    id: 'CUS002',
    name: 'Rahul Mehta',
    email: 'rahul.mehta@email.com',
    phone: '+91 98765 43211',
    totalOrders: 3,
    totalSpend: 525000,
    status: 'Active',
    joinedAt: '2023-08-20',
  },
  {
    id: 'CUS003',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@email.com',
    phone: '+91 98765 43212',
    totalOrders: 2,
    totalSpend: 290000,
    status: 'Active',
    joinedAt: '2023-10-10',
  },
  {
    id: 'CUS004',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 43213',
    totalOrders: 1,
    totalSpend: 185000,
    status: 'Active',
    joinedAt: '2024-01-05',
  },
  {
    id: 'CUS005',
    name: 'Meera Patel',
    email: 'meera.patel@email.com',
    phone: '+91 98765 43214',
    totalOrders: 0,
    totalSpend: 0,
    status: 'Blocked',
    joinedAt: '2023-12-01',
  },
];

// Mock Media
export const mockMedia: MediaItem[] = [
  {
    id: 'MED001',
    name: 'diamond-ring-hero.jpg',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    type: 'image',
    size: '2.4 MB',
    uploadedAt: '2024-01-20',
  },
  {
    id: 'MED002',
    name: 'pearl-necklace-banner.jpg',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
    type: 'image',
    size: '1.8 MB',
    uploadedAt: '2024-01-19',
  },
  {
    id: 'MED003',
    name: 'gold-bracelet-showcase.jpg',
    url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800',
    type: 'image',
    size: '3.1 MB',
    uploadedAt: '2024-01-18',
  },
  {
    id: 'MED004',
    name: 'earrings-collection.jpg',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
    type: 'image',
    size: '2.7 MB',
    uploadedAt: '2024-01-17',
  },
  {
    id: 'MED005',
    name: 'luxury-jewelry-display.jpg',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    type: 'image',
    size: '4.2 MB',
    uploadedAt: '2024-01-16',
  },
  {
    id: 'MED006',
    name: 'store-interior.jpg',
    url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800',
    type: 'image',
    size: '3.5 MB',
    uploadedAt: '2024-01-15',
  },
];

// Mock Discounts
export const mockDiscounts: Discount[] = [
  {
    id: 'DIS001',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 50000,
    expiryDate: '2024-03-31',
    enabled: true,
    usageCount: 45,
  },
  {
    id: 'DIS002',
    code: 'FLAT5000',
    type: 'flat',
    value: 5000,
    minOrderValue: 100000,
    expiryDate: '2024-02-28',
    enabled: true,
    usageCount: 23,
  },
  {
    id: 'DIS003',
    code: 'DIWALI20',
    type: 'percentage',
    value: 20,
    minOrderValue: 200000,
    expiryDate: '2024-11-15',
    enabled: false,
    usageCount: 0,
  },
  {
    id: 'DIS004',
    code: 'VIP15',
    type: 'percentage',
    value: 15,
    minOrderValue: 150000,
    expiryDate: '2024-12-31',
    enabled: true,
    usageCount: 12,
  },
];

// Chart Data
export const monthlyRevenueData = [
  { month: 'Jan', revenue: 2850000 },
  { month: 'Feb', revenue: 3200000 },
  { month: 'Mar', revenue: 2950000 },
  { month: 'Apr', revenue: 3800000 },
  { month: 'May', revenue: 4200000 },
  { month: 'Jun', revenue: 3950000 },
  { month: 'Jul', revenue: 4500000 },
  { month: 'Aug', revenue: 4100000 },
  { month: 'Sep', revenue: 4800000 },
  { month: 'Oct', revenue: 5200000 },
  { month: 'Nov', revenue: 6100000 },
  { month: 'Dec', revenue: 7500000 },
];

export const categorySalesData = [
  { category: 'Rings', sales: 45, fill: 'hsl(42 53% 54%)' },
  { category: 'Necklaces', sales: 30, fill: 'hsl(42 53% 44%)' },
  { category: 'Bracelets', sales: 15, fill: 'hsl(42 53% 64%)' },
  { category: 'Earrings', sales: 10, fill: 'hsl(42 53% 34%)' },
];

// Store Settings
export const mockStoreSettings: StoreSettings = {
  storeName: 'Royal Jewels',
  email: 'contact@royaljewels.com',
  phone: '+91 22 1234 5678',
  address: '123 Jewellers Lane, Zaveri Bazaar, Mumbai 400002',
  gstNumber: '27AABCU9603R1ZM',
  gstPercentage: 3,
};
