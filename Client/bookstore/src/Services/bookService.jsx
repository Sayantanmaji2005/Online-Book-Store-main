import API_BASE_URL from '../apiConfig';

const BOOKS_API_URL = `${API_BASE_URL}/books`;
console.log('bookService: BOOKS_API_URL =', BOOKS_API_URL);


export const bookService = {
    // Fetch all books
    getAllBooks: async () => {
        try {
            console.log('bookService: fetching books from', BOOKS_API_URL);
            const response = await fetch(`${BOOKS_API_URL}`);
            if (!response.ok) {
                const text = await response.text().catch(() => '');
                const errMsg = `Failed to fetch books: ${response.status} ${response.statusText} ${text}`;
                console.error('bookService error:', errMsg);
                throw new Error(errMsg);
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('bookService caught error:', error);
            return { success: false, error: error.message };
        }
    },

    // Fetch a single book by ID
    getBookById: async (id) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Book not found');
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Fetch books by category/genre
    getBooksByCategory: async (category) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}/category/${category}`);
            if (!response.ok) {
                throw new Error('Failed to fetch books for this category');
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Search books by title or author
    searchBooks: async (query) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}/search?q=${query}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Admin: Add a new book
    addBook: async (bookData, token) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to add book');
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Admin: Update a book
    updateBook: async (id, bookData, token) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bookData)
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to update book');
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // Admin: Delete a book
    deleteBook: async (id, token) => {
        try {
            const response = await fetch(`${BOOKS_API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete book');
            }
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};

