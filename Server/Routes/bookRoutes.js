// const express = require('express');
// const router = express.Router();
// const { Book } = require('../models/Book');
// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// // GET ALL BOOKS
// router.get('/books', async (req, res) => {
//     const books = await Book.find({});
//     res.json(books);
// });

// // ADD BOOK (ADMIN)
// router.post('/books', auth, admin, async (req, res) => {
//     try {
//         const newBook = new Book(req.body);
//         await newBook.save();
//         res.status(201).json(newBook);
//     } catch (error) {
//         res.status(400).json({ error: "Failed to add book" });
//     }
// });

// // UPDATE BOOK (ADMIN)
// router.put('/books/:id', auth, admin, async (req, res) => {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!book) return res.status(404).json({ error: "Book not found" });
//     res.json(book);
// });

// // DELETE BOOK (ADMIN)
// router.delete('/books/:id', auth, admin, async (req, res) => {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (!book) return res.status(404).json({ error: "Book not found" });
//     res.json({ message: "Book deleted", book });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    getBooks,
    addBook,
    updateBook,
    deleteBook
} = require('../Controllers/bookController');
const { auth, admin } = require('../Middleware/authMiddleware');

router.get('/', getBooks);
router.post('/', auth, admin, addBook);
router.put('/:id', auth, admin, updateBook);
router.delete('/:id', auth, admin, deleteBook);

module.exports = router;