import React, { useState } from 'react';
import { useCart } from '../../Context/cartContext';
import { orderService } from '../../Services/orderService';
import toast from 'react-hot-toast';

export const Checkout = ({ onBackToCart }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).every((field) => field.trim())) {
      setIsSubmitting(true);

      const orderData = {
        items: cartItems.map(item => ({
          bookId: item.id || item._id, // Support both if server uses _id
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalPrice(),
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentDetails: {
          cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4) // Just last 4 for safety
        }
      };

      const result = await orderService.createOrder(orderData);

      setIsSubmitting(false);

      if (result.success) {
        toast.success('Order placed successfully! 📚');
        clearCart();
        // Redirect to orders page or home
        setTimeout(() => {
          onBackToCart(); // Or any other navigation logic
        }, 1500);
      } else {
        toast.error(result.error || 'Failed to place order');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen bg-slate-50 p-5 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBackToCart}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Billing Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                  disabled={isSubmitting}
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                disabled={isSubmitting}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                disabled={isSubmitting}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                  disabled={isSubmitting}
                />
              </div>

              <h2 className="text-xl font-bold text-slate-900 pt-4">Payment Information</h2>

              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className={`w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id || item._id} className="flex justify-between text-sm text-slate-600">
                  <span>{item.title} x {item.quantity}</span>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-black text-slate-900 pt-4 border-t">
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
