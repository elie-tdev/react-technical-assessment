// Type for product specifications to ensure better type safety
export type ProductSpecifications = Record<string, string | number | boolean>;

/**
 * Product type definition for marketplace products
 * Contains all necessary information for displaying and managing products
 */
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

/**
 * Address type for user shipping/billing addresses
 * Contains all necessary information for shipping and billing
 */
export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

/**
 * User type for user account information
 * Contains all user-related data for authentication and profile management
 */
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

/**
 * Category type for product categories
 * Used to organize and categorize products in the marketplace
 */
export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  createdAt: string;
};

/**
 * Order type for user orders
 * Contains order information including items, pricing, and status
 */
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

export type SortOption = 'price_asc' | 'price_desc' | 'rating' | 'newest';

/**
 * Generic response type for API responses
 * Ensures consistent structure for all API responses
 */
export type ResponseType<T> = {
  success: boolean;
  message?: string;
  data: T;
};

/**
 * Pagination data structure for API responses
 * Contains both the data and pagination metadata
 */
export type PaginationData<T> = {
  products: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

/**
 * Response type for products API
 * Combines generic response structure with pagination data
 */
export type ProductsResponse = ResponseType<PaginationData<Product>>;

/**
 * Response type for login API
 * Contains user information and authentication token
 */
export type LoginResponse = ResponseType<{
  user: User;
  token: string;
}>;

/**
 * Response type for single product API
 * Contains a single product in the response structure
 */
export type ProductResponse = ResponseType<Product>;

/**
 * Response type for user profile API
 * Contains user profile information in the response structure
 */
export type ProfileResponse = ResponseType<User>;

/**
 * Response type for user orders API
 * Contains an array of orders in the response structure
 */
export type OrdersResponse = ResponseType<Order[]>;

/**
 * Response type for categories API
 * Contains an array of categories in the response structure
 */
export type CategoriesResponse = ResponseType<Category[]>;

/**
 * Response type for single category API
 * Contains a single category in the response structure
 */
export type CategoryResponse = ResponseType<Category>;
