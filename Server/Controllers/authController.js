const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const generateToken = require('../Utils/generateToken'); // Using your utility

// @desc    Register new user
// @route   POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await user.save();

        // Generate token immediately upon registration
        const token = generateToken(user._id);

        res.status(201).json({ message: "User registered successfully", user, token });
    } catch (e) {
        let errorMessage = 'Registration failed';
        if (e.code === 11000) {
            errorMessage = 'Email already exists';
        } else if (e.message) {
            errorMessage = e.message;
        }
        res.status(400).json({ error: errorMessage });
    }

};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).send('Invalid login credentials');
        }
        const token = generateToken(user._id);
        res.json({ user, token });
    } catch (e) {
        console.error('Login Error:', e);
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc    Get all users (Admin)
// @route   GET /api/auth/users
const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

// @desc    Delete user (Admin)
// @route   DELETE /api/auth/users/:id
const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user });
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    console.log(`RESET LINK: http://localhost:5006/api/auth/reset-password/${token}`);
    res.json({ message: "Check server terminal for reset link" });
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
    const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.newPassword, 8);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (e) {
        console.error('Login Error:', e);
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const { name, phone, email } = req.body;
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (email) user.email = email;

        await user.save();
        res.json({ message: "Profile updated successfully", user });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

module.exports = { register, login, getUsers, deleteUser, forgotPassword, resetPassword, getProfile, updateProfile };