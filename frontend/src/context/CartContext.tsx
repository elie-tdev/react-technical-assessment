import type { Product } from '@/types';
import React, { createContext, useContext, useReducer } from 'react';

// CartItem extends Product with a quantity field
export type CartItem = Pick<Product, 'id' | 'name' | 'price' | 'images'> & {
  quantity: number;
};

// Define the state shape for the cart
type CartState = {
  items: CartItem[];
};

// Define the possible actions that can be dispatched to the cart reducer
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the context value type
type ContextType =
  | {
      cart: CartState;
      addToCart: (item: Omit<CartItem, 'quantity'>) => void;
      removeFromCart: (id: string) => void;
      updateQuantity: (id: string, quantity: number) => void;
      clearCart: () => void;
      getTotalItems: () => number;
      getTotalPrice: () => number;
      isEmpty: boolean;
    }
  | undefined;

const CartContext = createContext<ContextType>(undefined);

/**
 * Reducer function to handle cart state updates
 * Follows the Redux pattern for predictable state management
 */
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // If item already exists in cart, increment its quantity
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      // Otherwise add the new item to cart
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case 'REMOVE_ITEM':
      // Remove item completely from cart
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      // If quantity is 0 or less, remove the item from cart
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      // Otherwise update the quantity of the specified item
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      // Remove all items from cart
      return { ...state, items: [] };

    default:
      // Return current state for unknown actions
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

/**
 * CartProvider manages the shopping cart state using useReducer
 * Provides cart functionality to all child components through context
 */
export function CartProvider({ children }: Props) {
  // Initialize cart with empty items array
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Action functions that dispatch appropriate actions to the reducer
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, quantity: 1 },
    });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Utility functions to calculate cart totals
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isEmpty: state.items.length === 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 * Provides a type-safe way to access cart state and functions
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
