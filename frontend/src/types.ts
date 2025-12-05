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
  specifications: any;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

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

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId: string | null;
  createdAt: string;
};

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

export type LoginResponse = {
  data: {
    user: User;
    token: string;
  };
  success: boolean;
  message: string;
};

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

export type ProductResponse = {
  success: boolean;
  data: Product;
};

export type ProfileResponse = {
  success: boolean;
  data: User;
};

export type OrdersResponse = {
  success: boolean;
  data: Order[];
};

export type CategoriesResponse = {
  success: boolean;
  data: Category[];
};

export type CategoryResponse = {
  success: boolean;
  data: Category;
};
