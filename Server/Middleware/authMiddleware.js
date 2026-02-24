const jwt = require('jsonwebtoken');
const User = require('../Models/user'); // Ensure this path matches your project structure

// Middleware to verify JWT Token
const auth = async (req, res, next) => {
    console.log('Incoming Headers:', req.headers);
    console.log('Auth middleware triggered');
    try {
        const tokenHeader = req.header('Authorization');

        if (!tokenHeader) {
            console.log('No token header found');
            throw new Error('AUTHENTICATION_ERROR');
        }

        const token = tokenHeader.replace(/^Bearer\s+/i, '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_123');
        console.log('Token decoded:', decoded);
        req.userId = decoded.userId;

        next(); // Move to next middleware
    } catch (error) {
        console.error('Auth error:', error.message);
        const fs = require('fs');
        const logMsg = `${new Date().toISOString()} - Auth Error: ${error.message} - Headers: ${JSON.stringify(req.headers)}\n`;
        fs.appendFileSync('auth_debug.log', logMsg);

        // Pass error to the errorMiddleware
        error.type = 'AUTHENTICATION_ERROR';
        next(error);
    }
};

// Middleware to check if user is Admin
const admin = async (req, res, next) => {
    console.log('Admin middleware triggered for userId:', req.userId);
    try {
        // Find the user based on the ID from the previous 'auth' step
        const user = await User.findById(req.userId);
        console.log('User found for admin check:', user ? user.email : 'No user found');

        // Check if the user exists and has the role 'admin'
        if (!user || user.role !== 'admin') {
            console.log('Access denied: user is not admin or does not exist');
            throw new Error('ACCESS_DENIED');
        }

        // If they are an admin, let them pass
        console.log('Admin access granted');
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        // Pass error to the errorMiddleware
        if (error.message !== 'ACCESS_DENIED') {
            error.type = 'SERVER_ERROR'; // Distinguish system errors from access errors
        } else {
            error.type = 'ACCESS_DENIED';
        }
        next(error);
    }
};

module.exports = { auth, admin };