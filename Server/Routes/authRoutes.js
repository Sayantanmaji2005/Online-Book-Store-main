// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// // REGISTER
// router.post('/register', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 8);
//         const user = new User({ ...req.body, password: hashedPassword });
//         await user.save();
//         res.status(201).json({ message: "User registered successfully", user });
//     } catch (e) {
//         res.status(400).json(e);
//     }
// });

// // LOGIN
// router.post('/login', async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
//         return res.status(400).send('Invalid login credentials');
//     }
//     const token = jwt.sign({ userId: user._id }, 'secret_key_123');
//     res.json({ user, token });
// });

// // GET ALL USERS (ADMIN)
// router.get('/users', auth, admin, async (req, res) => {
//     const users = await User.find({});
//     res.json(users);
// });

// // DELETE USER (ADMIN)
// router.delete('/users/:id', auth, admin, async (req, res) => {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted", user });
// });

// // FORGOT PASSWORD
// router.post('/forgot-password', async (req, res) => {
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) return res.status(404).json({ error: "User not found" });

//     const token = crypto.randomBytes(32).toString('hex');
//     user.resetToken = token;
//     user.resetTokenExpiration = Date.now() + 3600000;
//     await user.save();

//     console.log(`RESET LINK: http://localhost:5006/api/reset-password/${token}`);
//     res.json({ message: "Check server terminal for reset link" });
// });

// // RESET PASSWORD
// router.post('/reset-password/:token', async (req, res) => {
//     const user = await User.findOne({
//         resetToken: req.params.token,
//         resetTokenExpiration: { $gt: Date.now() }
//     });

//     if (!user) return res.status(400).json({ error: "Invalid token" });

//     user.password = await bcrypt.hash(req.body.newPassword, 8);
//     user.resetToken = undefined;
//     user.resetTokenExpiration = undefined;
//     await user.save();

//     res.json({ message: "Password updated successfully" });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getUsers,
    deleteUser,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile
} = require('../Controllers/authController');
const { auth, admin } = require('../Middleware/authMiddleware'); // Updated path if needed

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);


// Admin Routes
router.get('/users', auth, admin, getUsers);
router.delete('/users/:id', auth, admin, deleteUser);

module.exports = router;