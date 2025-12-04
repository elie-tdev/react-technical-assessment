import axios from 'axios';
import type {
  LoginResponse,
  OrdersResponse,
  ProductResponse,
  ProductsResponse,
  ProfileResponse,
} from '@/types';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
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

export const login = (email: string, password: string) =>
  api.post<LoginResponse>('/auth/login', { email, password });

export const getProducts = ({ search }: { search?: string }) => {
  if (search) {
    return api.get<ProductsResponse>(`/products?search=${search}`);
  }

  return api.get<ProductsResponse>(`/products`);
};

export const getProduct = (id: string) =>
  api.get<ProductResponse>(`/products/${id}`);

export const getProfile = () => api.get<ProfileResponse>('/auth/profile');

export const createOrder = (data: {
  items: { productId: string; quantity: number }[];
  shippingAddress?: any;
  paymentMethod?: string;
}) => api.post('/orders', data);

export const getOrders = () => api.get<OrdersResponse>('/orders');

export default api;
