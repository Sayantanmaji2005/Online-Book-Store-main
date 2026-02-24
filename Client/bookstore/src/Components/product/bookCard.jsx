import React from 'react';
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const BookCard = ({ book, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book);
    toast.success(`${book.title} added to cart!`);
  };

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200 transition-all duration-300 hover:border-indigo-500 hover:shadow-md cursor-pointer overflow-hidden"
      onClick={() => onClick(book)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating Badge in yellow*/}
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded shadow-sm border border-gray-100 flex items-center gap-1">
          <span className="text-yellow-500 text-xs">★</span>
          <span className="text-[11px] font-bold text-gray-700">{book.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      {/* the main details will come here */}
      <div className="p-4">
        <div className="flex flex-col mb-3">
          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider mb-0.5">
            {book.genre || 'General'}
          </span>
          <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 h-9">
            {book.title}
          </h3>
          <p className="text-[11px] text-gray-500 truncate">
            {book.author}
          </p>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900 leading-none">
              <span className="text-xs font-semibold mr-0.5">Rs.</span>{book.price}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-900 text-white hover:bg-indigo-600 transition-colors"
            onClick={handleAddToCart}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};