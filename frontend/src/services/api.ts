import axios from 'axios';
import type {
  CategoriesResponse,
  CategoryResponse,
  LoginResponse,
  OrdersResponse,
  ProductResponse,
  ProductsResponse,
  ProfileResponse,
} from '@/types';

// Base API URL for the marketplace backend
const API_URL = 'http://localhost:3000/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to automatically add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases here if needed
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Authenticates user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns LoginResponse containing user data and token
 */
export const login = (email: string, password: string) =>
  api.post<LoginResponse>('/auth/login', { email, password });

/**
 * Fetches products with optional search and category filters
 * @param search - Optional search query string
 * @param category - Optional category ID to filter by
 * @returns ProductsResponse with product list and pagination info
 */
export const getProducts = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const params = new URLSearchParams();
  if (search) params.append('search', search || '');
  if (category) params.append('category', category || '');
  const queryString = params.toString();

  return api.get<ProductsResponse>(
    `/products${queryString ? `?${queryString}` : ''}`
  );
};

/**
 * Fetches a single product by ID
 * @param id - Product ID
 * @returns ProductResponse containing the product data
 */
export const getProduct = (id: string) =>
  api.get<ProductResponse>(`/products/${id}`);

/**
 * Fetches the authenticated user's profile
 * @returns ProfileResponse containing user data
 */
export const getProfile = () => api.get<ProfileResponse>('/auth/profile');

/**
 * Creates a new order with the specified items
 * @param data - Order data including items, shipping address, and payment method
 * @returns Response with the created order
 */
export const createOrder = (data: {
  items: { productId: string; quantity: number }[];
  shippingAddress?: any;
  paymentMethod?: string;
}) => api.post('/orders', data);

/**
 * Fetches order history for the authenticated user
 * @returns OrdersResponse containing user's order history
 */
export const getOrders = () => api.get<OrdersResponse>('/orders');

/**
 * Fetches all available product categories
 * @returns CategoriesResponse containing category list
 */
export const getCategories = () => api.get<CategoriesResponse>('/categories');

/**
 * Fetches a specific category by ID
 * @param categoryId - Category ID to fetch
 * @returns CategoryResponse containing the category data
 */
export const getCategory = (categoryId: string) =>
  api.get<CategoryResponse>(`/categories/${categoryId}`);

export default api;
