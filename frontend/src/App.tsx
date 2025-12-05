import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Products from '@/pages/Products';
import UserProfile from '@/pages/UserProfile';
import Checkout from '@/pages/Checkout';
import OrderHistory from '@/pages/OrderHistory';
import Cart from '@/pages/Cart';
import ProductDetail from '@/pages/ProductDetail';
import Categories from '@/pages/Categories';

import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import Providers from '@/components/Providers';

function App() {
  return (
    <Providers>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/categories" element={<Categories />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </Providers>
  );
}

export default App;
