import React from 'react';
import { CartItem } from './cartItem';
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const CartPage = ({ onCheckout, onBackToStore }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.error(`${title} removed from cart`);
  };

  const handleUpdateQuantity = (id, quantity, title) => {
    updateQuantity(id, quantity);
    if (quantity === 0) {
      toast.error(`${title} removed from cart`);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBackToStore}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900">Shopping Cart</h1>
          <span className="ml-auto bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold">
            {cartItems.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item._id || item.id}
                  item={item}
                  onRemove={() => handleRemove(item._id || item.id, item.title)}
                  onUpdateQuantity={(id, q) => handleUpdateQuantity(id, q, item.title)}
                />
              ))
            ) : (
              <div className="bg-white p-10 rounded-2xl border border-slate-100 text-center">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-slate-500 text-lg">Your cart is empty</p>
                <button
                  onClick={onBackToStore}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Summary</h2>
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-lg font-black text-slate-900">
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              disabled={cartItems.length === 0}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={onBackToStore}
              className="w-full mt-3 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
