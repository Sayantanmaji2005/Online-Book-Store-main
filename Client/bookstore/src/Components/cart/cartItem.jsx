import React from 'react';
// import { useCart } from '../../Context/cartContext';

export const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 flex gap-4 items-center hover:shadow-md transition-shadow">
      <img src={item.image} alt={item.title} className="w-20 h-28 object-cover rounded-lg" />

      <div className="flex-1">
        <h3 className="font-bold text-slate-900">{item.title}</h3>
        <p className="text-sm text-slate-500">{item.author}</p>
        <p className="text-indigo-600 font-bold mt-2">Rs. {item.price}</p>
      </div>

      <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-2">
        <button
          onClick={() => onUpdateQuantity(item._id || item.id, item.quantity - 1)}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
          </svg>
        </button>
        <span className="w-6 text-center font-bold">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item._id || item.id, item.quantity + 1)}
          className="p-1 hover:bg-slate-200 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => onRemove(item._id || item.id)}
        className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};
