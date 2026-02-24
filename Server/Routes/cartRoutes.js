// const express = require('express');
// const router = express.Router();
// const Cart = require('../models/Cart');
// const { Book } = require('../models/Book');
// const auth = require('../middleware/auth');

// // GET CART
// router.get('/cart', auth, async (req, res) => {
//     const cart = await Cart.findOne({ user: req.userId });
//     res.json(cart || { items: [] });
// });

// // ADD TO CART
// router.post('/cart', auth, async (req, res) => {
//     const { bookId, quantity } = req.body;
//     const book = await Book.findById(bookId);
//     if (!book) return res.status(404).json({ error: "Book not found" });

//     let cart = await Cart.findOne({ user: req.userId });

//     if (!cart) {
//         cart = new Cart({ user: req.userId, items: [] });
//     }

//     const index = cart.items.findIndex(i => i.bookId == bookId);
//     if (index > -1) {
//         cart.items[index].quantity += quantity;
//     } else {
//         cart.items.push({ bookId, title: book.title, price: book.price, quantity });
//     }

//     await cart.save();
//     res.json(cart);
// });

// // REMOVE FROM CART
// router.delete('/cart/:bookId', auth, async (req, res) => {
//     const cart = await Cart.findOne({ user: req.userId });
//     cart.items = cart.items.filter(i => i.bookId != req.params.bookId);
//     await cart.save();
//     res.json(cart);
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    removeFromCart
} = require('../Controllers/cartController');
const { auth } = require('../Middleware/authMiddleware');

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/:bookId', auth, removeFromCart);

module.exports = router;