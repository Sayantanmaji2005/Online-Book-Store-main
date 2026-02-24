import React from 'react';
import "../../index.css";
import { useCart } from '../../Context/cartContext';
import toast from 'react-hot-toast';

export const BookDetails = ({ book, onClose }) => {
  const { addToCart } = useCart();

  if (!book) return null;

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`${book.title} added to cart!`);
  };

  return (
    <div
      className="fixed z-[500] inset-0 bg-black bg-opacity-75 flex justify-center items-center p-5 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative animate-slideUp shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-red-500 text-white rounded-full text-2xl font-bold hover:bg-red-600 transition-all duration-300 hover:rotate-90 z-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-10 p-10">
          <div className="flex-shrink-0 w-full md:w-72 mx-auto md:mx-0">
            <img
              src={book.image || 'https://via.placeholder.com/300x450?text=Book+Cover'}
              alt={book.title}
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-800 mb-3 leading-tight">
              {book.title}
            </h2>
            <p className="text-xl text-gray-500 italic mb-4">by {book.author}</p>

            <div className="flex items-center gap-3 mb-5 text-lg">
              <span className="text-yellow-500 font-bold">{book.rating}</span>
              <span className="text-gray-400">({book.reviews} reviews)</span>
            </div>

            <p className="text-3xl font-bold text-green-600 mb-5">Rs. {book.price}</p>

            <p className="text-gray-700 leading-relaxed mb-6">
              {book.description}
            </p>

            <div className="bg-gray-50 rounded-lg p-5 mb-6">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Genre:</span>
                <span className="text-gray-800">{book.genre}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-600">Pages:</span>
                <span className="text-gray-800">{book.pages}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="font-semibold text-gray-600">Published:</span>
                <span className="text-gray-800">{book.published}</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg text-lg font-semibold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
