const mongoose = require('mongoose');

// // --- User Schema ---
// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, default: 'user', enum: ['user', 'admin'] },
//     resetToken: String,            
//     resetTokenExpiration: Date
// });

// --- Book Schema ---
const bookSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, 
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    genre: { type: String, required: true },
    pages: { type: Number },
    published: { type: String },
    isBestSeller: { type: Boolean, default: false },
    description: { type: String },
    image: { type: String },
    stock: { type: Number, default: 0 }
});

// Use existing models if they exist to prevent errors
// const User = mongoose.models.User || mongoose.model('User', userSchema);
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = { Book };
