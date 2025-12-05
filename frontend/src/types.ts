// Type for product specifications to ensure better type safety
export type ProductSpecifications = Record<string, string | number | boolean>;

// Product type definition for marketplace products
export type Product = {
  id: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  compareAtPrice: number;
  categoryId: string;
  sellerId: string;
  images: string[];
  stock: number;
  sku: string;
  status: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  specifications: ProductSpecifications;
  createdAt: string;
  updatedAt: string;
};

// Address type for user shipping/billing addresses
export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

// User type for user account information
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  address: Address;
  createdAt: string;
  isVerified: boolean;
};

// Category type for product categories
export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  createdAt: string;
};

// Order type for user orders
export type Order = {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
    name: string;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
};

// Response type for login API
export type LoginResponse = {
  data: {
    user: User;
    token: string;
  };
  success: boolean;
  message: string;
};

// Response type for products API
export type ProductsResponse = {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
};

// Response type for single product API
export type ProductResponse = {
  success: boolean;
  data: Product;
};

// Response type for user profile API
export type ProfileResponse = {
  success: boolean;
  data: User;
};

// Response type for user orders API
export type OrdersResponse = {
  success: boolean;
  data: Order[];
};

// Response type for categories API
export type CategoriesResponse = {
  success: boolean;
  data: Category[];
};

// Response type for single category API
export type CategoryResponse = {
  success: boolean;
  data: Category;
};
