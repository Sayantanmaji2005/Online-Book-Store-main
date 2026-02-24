// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            bookId: { type: String, required: true },
            title: { type: String },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    paymentDetails: {
        cardNumber: { type: String } // Storing only last 4 for safety as per frontend
    },
    status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);