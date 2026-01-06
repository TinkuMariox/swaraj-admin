import { create } from 'zustand';
import { 
  Product, 
  Order, 
  Customer, 
  MediaItem, 
  Discount,
  mockProducts,
  mockOrders,
  mockCustomers,
  mockMedia,
  mockDiscounts
} from '@/data/mockData';

interface StoreState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['orderStatus']) => void;

  // Customers
  customers: Customer[];
  updateCustomerStatus: (id: string, status: Customer['status']) => void;

  // Media
  media: MediaItem[];
  addMedia: (item: MediaItem) => void;
  deleteMedia: (id: string) => void;

  // Discounts
  discounts: Discount[];
  addDiscount: (discount: Discount) => void;
  updateDiscount: (id: string, discount: Partial<Discount>) => void;
  deleteDiscount: (id: string) => void;

  // UI State
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<StoreState>((set) => ({
  // Products
  products: mockProducts,
  addProduct: (product) => 
    set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      ),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  // Orders
  orders: mockOrders,
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, orderStatus: status } : o
      ),
    })),

  // Customers
  customers: mockCustomers,
  updateCustomerStatus: (id, status) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),

  // Media
  media: mockMedia,
  addMedia: (item) =>
    set((state) => ({ media: [item, ...state.media] })),
  deleteMedia: (id) =>
    set((state) => ({
      media: state.media.filter((m) => m.id !== id),
    })),

  // Discounts
  discounts: mockDiscounts,
  addDiscount: (discount) =>
    set((state) => ({ discounts: [...state.discounts, discount] })),
  updateDiscount: (id, updatedDiscount) =>
    set((state) => ({
      discounts: state.discounts.map((d) =>
        d.id === id ? { ...d, ...updatedDiscount } : d
      ),
    })),
  deleteDiscount: (id) =>
    set((state) => ({
      discounts: state.discounts.filter((d) => d.id !== id),
    })),

  // UI State
  sidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
