require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./Models/user');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        const mongoURI = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/online-bookstore';
        await mongoose.connect(mongoURI);

        const email = 'admin@gmail.com';
        const password = 'admin';
        const hashedPassword = await bcrypt.hash(password, 8);

        const adminUser = {
            name: 'Demo Admin',
            email: email,
            password: hashedPassword,
            phone: '1234567890',
            role: 'admin'
        };

        const user = await User.findOneAndUpdate(
            { email: email },
            adminUser,
            { upsert: true, new: true }
        );

        console.log(`Success! Demo Admin created/updated.`);
        console.log(`Email: ${user.email}`);
        console.log(`Password: admin`);
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}

seedAdmin();
