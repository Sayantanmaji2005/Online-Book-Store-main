
import { BookCard } from './bookCard';

export const BookList = ({ books, onBookSelect }) => {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center drop-shadow-md">
        Bestselling Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-5">
        {books.map((book) => (
          <BookCard key={book._id || book.id} book={book} onClick={onBookSelect} />
        ))}
      </div>
    </div>
  );
};

