require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./Models/user');

async function makeAdmin() {
    // Get email from command line argument
    const email = process.argv[2];

    if (!email) {
        console.log('\x1b[33m%s\x1b[0m', 'Usage: node Server/makeAdmin.js <email>');
        process.exit(1);
    }

    try {
        const mongoURI = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/online-bookstore';
        await mongoose.connect(mongoURI);

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log('\x1b[32m%s\x1b[0m', `Success! User ${email} is now an ADMIN.`);
        } else {
            console.log('\x1b[31m%s\x1b[0m', `User ${email} not found. Ensure they are registered first.`);
        }
    } catch (err) {
        console.error('Database Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

makeAdmin();
