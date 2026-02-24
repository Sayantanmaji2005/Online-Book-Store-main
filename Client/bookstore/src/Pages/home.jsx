import React, { useState, useEffect } from 'react';
import { BookList } from '../Components/product/bookList.jsx';
import { bookService } from '../Services/bookService';
import { Loader } from '../Components/common/loader';
import API_BASE_URL from '../apiConfig';

export const Home = ({ onBookSelect, selectedCategory }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const result = await bookService.getAllBooks();
      if (result.success) {
        setBooks(result.data);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.genre.toLowerCase() === selectedCategory.toLowerCase());

  if (loading) return <Loader isLoading={true} />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
          <p className="font-bold text-lg">Error loading books</p>
          <p>{error}</p>
          <p className="text-xs text-gray-500 mt-2">API: {API_BASE_URL}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-5 md:p-10">
      <div className="max-w-7xl mx-auto">
        <BookList books={filteredBooks} onBookSelect={onBookSelect} />
      </div>
    </main>
  );
};