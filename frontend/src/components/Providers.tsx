import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Create a single instance of QueryClient for the entire app
const queryClient = new QueryClient();

/**
 * Providers component wraps the entire app with necessary context providers
 * This allows all child components to access authentication state, cart state, and React Query
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
