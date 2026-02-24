const mongoose = require('mongoose');
const Order = require('../Models/order'); // Using default export from your file
const { Book } = require('../Models/book');

const placeOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress, paymentDetails } = req.body;
    let serverTotal = 0;

    console.log('--- Place Order Start ---');
    console.log('Items received:', items);
    console.log('Total Amount from client:', totalAmount);

    try {
        // Validate stock and price
        const validatedItems = [];

        for (const item of items) {
            let book;

            // 1. Safely try searching by MongoDB _id first
            if (mongoose.Types.ObjectId.isValid(item.bookId)) {
                book = await Book.findById(item.bookId);
            }

            // 2. Fallback to numeric id if not found by _id
            if (!book) {
                book = await Book.findOne({ id: item.bookId });
            }

            if (!book) {
                console.log(`Book not found for ID: ${item.bookId}`);
                return res.status(400).json({ error: `Book not found: ${item.bookId}` });
            }

            if (book.stock < item.quantity) {
                console.log(`Insufficient stock for ${book.title}. Required: ${item.quantity}, Available: ${book.stock}`);
                return res.status(400).json({ error: `Not enough stock for ${book.title}` });
            }

            serverTotal += book.price * item.quantity;

            // Collect validated item info to save in order
            validatedItems.push({
                bookId: book._id,
                title: book.title,
                quantity: item.quantity,
                price: book.price
            });
        }

        console.log('Calculated Server Total:', serverTotal);

        if (Math.abs(serverTotal - totalAmount) > 0.01) { // Using epsilon for tiny float differences
            console.log('Price mismatch detected! Server Total:', serverTotal, 'Client Total:', totalAmount);
            return res.status(400).json({ error: "Price mismatch security check failed" });
        }

        // Deduct stock
        for (const item of items) {
            let book;
            if (mongoose.Types.ObjectId.isValid(item.bookId)) {
                book = await Book.findById(item.bookId);
            }
            if (!book) {
                book = await Book.findOne({ id: item.bookId });
            }

            if (book) {
                book.stock -= item.quantity;
                await book.save();
            }
        }

        const order = new Order({
            user: req.userId,
            items: validatedItems,
            totalAmount: serverTotal,
            shippingAddress,
            paymentDetails
        });
        await order.save();

        console.log('Order saved successfully:', order._id);
        res.status(201).json({ message: "Order placed", orderId: order._id });
    } catch (error) {
        console.error('Order Error:', error);
        res.status(500).json({ error: "Server Error during order placement" });
    }
};

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.userId });
    res.json(orders);
};

const getAllOrders = async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'name email')
        .sort({ date: -1 });
    res.json(orders);
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order status" });
    }
};

module.exports = { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };