import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const getItemId = (item) => item._id || item.id;

  const addToCart = useCallback((book) => {
    setCartItems((prevItems) => {
      const bookId = getItemId(book);
      const existingItem = prevItems.find((item) => getItemId(item) === bookId);

      if (existingItem) {
        return prevItems.map((item) =>
          getItemId(item) === bookId
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((bookId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => getItemId(item) !== bookId)
    );
  }, []);

  const updateQuantity = useCallback((bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          getItemId(item) === bookId ? { ...item, quantity } : item
        )
      );
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
