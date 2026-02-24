const Cart = require('../Models/cart');
const { Book } = require('../Models/book');

const getCart = async (req, res) => {
    // req.userId comes from auth middleware
    const cart = await Cart.findOne({ user: req.userId });
    res.json(cart || { items: [] });
};

const addToCart = async (req, res) => {
    const { bookId, quantity } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ error: "Book not found" });

    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
        cart = new Cart({ user: req.userId, items: [] });
    }

    const index = cart.items.findIndex(i => i.bookId == bookId);
    if (index > -1) {
        cart.items[index].quantity += quantity;
    } else {
        cart.items.push({ bookId, title: book.title, price: book.price, quantity });
    }

    await cart.save();
    res.json(cart);
};

const removeFromCart = async (req, res) => {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(i => i.bookId != req.params.bookId);
    await cart.save();
    res.json(cart);
};

module.exports = { getCart, addToCart, removeFromCart };