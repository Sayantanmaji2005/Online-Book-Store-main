const mongoose = require('mongoose');
const { Book } = require('./Models/book');

async function checkStock() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/online-bookstore');
        const books = await Book.find({});
        console.log(JSON.stringify(books, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

checkStock();
