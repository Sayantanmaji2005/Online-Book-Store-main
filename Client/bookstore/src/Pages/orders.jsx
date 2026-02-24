import React from 'react';

export const Order = ({ cartItems = [], totalAmount = 0, onBackToStore }) => {
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
          <h1 className="text-3xl font-black text-slate-900">Your Order</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id || item.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-4 items-center">
                  <img src={item.image} alt={item.title} className="w-20 h-28 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.author}</p>
                    <p className="text-indigo-600 font-bold mt-2">Rs. {item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-10 rounded-2xl border border-slate-100 text-center">
                <p className="text-slate-500">Your cart is currently empty.</p>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Summary</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>Rs. {totalAmount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between text-lg font-black text-slate-900">
                <span>Total</span>
                <span>Rs. {totalAmount}</span>
              </div>
            </div>

            <button
              className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              onClick={() => alert('Order Placed Successfully!')}
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};