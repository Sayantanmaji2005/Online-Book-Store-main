// const express = require('express');
// const router = express.Router();
// const Order = require('../models/order');
// const { Book } = require('../models/Book');
// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// // PLACE ORDER
// router.post('/orders', auth, async (req, res) => {
//     const { items, totalAmount } = req.body;
//     let serverTotal = 0;

//     for (const item of items) {
//         const book = await Book.findById(item.bookId);
//         if (!book || book.stock < item.quantity) {
//             return res.status(400).json({ error: "Invalid order" });
//         }
//         serverTotal += book.price * item.quantity;
//     }

//     if (serverTotal !== totalAmount) {
//         return res.status(400).json({ error: "Price mismatch" });
//     }

//     for (const item of items) {
//         const book = await Book.findById(item.bookId);
//         book.stock -= item.quantity;
//         await book.save();
//     }

//     const order = new Order({ user: req.userId, items, totalAmount: serverTotal });
//     await order.save();

//     res.status(201).json({ message: "Order placed", orderId: order._id });
// });

// // GET MY ORDERS
// router.get('/orders', auth, async (req, res) => {
//     const orders = await Order.find({ user: req.userId });
//     res.json(orders);
// });

// // ADMIN – ALL ORDERS
// router.get('/admin/orders', auth, admin, async (req, res) => {
//     const orders = await Order.find({})
//         .populate('user', 'name email')
//         .sort({ date: -1 });
//     res.json(orders);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} = require('../Controllers/orderController');
const { auth, admin } = require('../Middleware/authMiddleware');

router.post('/', auth, placeOrder);
router.get('/my-orders', auth, getMyOrders);
router.get('/admin/all', auth, admin, getAllOrders);
router.put('/admin/status/:id', auth, admin, updateOrderStatus);

module.exports = router;
