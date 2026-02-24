import React, { useState } from 'react';
import './App.css';
import "./index.css";
import { Toaster, toast } from 'react-hot-toast';
// Components
import { BookDetails } from './Components/product/bookDetails';
import { Loader } from './Components/common/loader';
import { Navbar } from './Components/common/navbar';
import { Home } from "./Pages/home";
import { CartPage } from './Components/cart/cartPage';
import { Checkout } from './Components/cart/checkout';
import { Order } from "./Pages/orders";
import { Login } from './Components/auth/login';
import { Register } from './Components/auth/register';
import { Profile } from './Components/auth/profile';
import { AdminDashboard } from './Pages/admin/AdminDashboard';
import { SellerLogin } from './Components/auth/sellerLogin';

// Context
import { CartProvider, useCart } from './Context/cartContext';
import { AuthProvider, useAuth } from './Context/authContext';

const AppContent = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSeller, setIsSeller] = useState(false);
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const handleProfileClick = (target) => {
    if (target === 'seller') {
      if (isSeller) {
        setCurrentPage('admin');
      } else {
        setCurrentPage('sellerLogin');
      }
      return;
    }

    if (isAuthenticated) {
      setCurrentPage('profile');
    } else {
      setCurrentPage('login');
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage('home');
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      setCurrentPage('checkout');
    } else {
      toast.error('Please login to continue to checkout');
      setCurrentPage('login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-center" reverseOrder={false} />
      <Loader isLoading={false} />
      <Navbar
        cartCount={getTotalItems()}
        onCartClick={() => setCurrentPage('cart')}
        onProfileClick={handleProfileClick}
        onHomeClick={() => {
          setCurrentPage('home');
          setSelectedCategory('all');
        }}
        onCategoryChange={handleCategoryChange}
      />

      <main>
        {currentPage === 'home' && (
          <Home onBookSelect={setSelectedBook} selectedCategory={selectedCategory} />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onCheckout={handleCheckout}
            onBackToStore={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'checkout' && (
          <Checkout onBackToCart={() => setCurrentPage('cart')} />
        )}

        {currentPage === 'orders' && (
          <Order onBackToStore={() => setCurrentPage('home')} />
        )}

        {currentPage === 'login' && (
          <Login
            onSwitchToRegister={() => setCurrentPage('register')}
            onLoginSuccess={() => setCurrentPage('profile')}
          />
        )}

        {currentPage === 'register' && (
          <Register
            onSwitchToLogin={() => setCurrentPage('login')}
            onRegisterSuccess={() => setCurrentPage('profile')}
          />
        )}

        {currentPage === 'profile' && (
          <Profile
            onLogoutSuccess={() => setCurrentPage('home')}
            onAdminClick={() => setCurrentPage('admin')}
          />
        )}

        {currentPage === 'sellerLogin' && (
          <SellerLogin
            onLoginSuccess={() => {
              setIsSeller(true);
              setCurrentPage('admin');
            }}
            onBackToStore={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminDashboard onBackToStore={() => {
            setCurrentPage('home');
            // We keep isSeller true so they don't have to relogin during this session
          }} />
        )}
      </main>

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;