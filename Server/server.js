require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

// routes import
const authRoutes = require('./Routes/authRoutes');
const bookRoutes = require('./Routes/bookRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const cartRoutes = require('./Routes/cartRoutes');

// Middleware import
const { auth, admin } = require('./Middleware/authMiddleware');
const errorMiddleware = require('./Middleware/errorMiddleware');

const app = express();

// global Middlewares
app.use(cors());
app.use(express.json());

// Request Debugger
app.use((req, res, next) => {
  const fs = require('fs');
  const log = `${new Date().toISOString()} - ${req.method} ${req.path} - Auth Header: ${req.header('Authorization')}\n`;
  fs.appendFileSync('request_debug.log', log);
  next();
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/online-bookstore';
mongoose.connect(mongoURI)
  .then(() => console.log("Database Connected to: ", mongoURI.includes('mongodb+srv') ? "Atlas (Online)" : "Local MongoDB"))
  .catch(err => console.log("Database Error: ", err));

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Error Handling Middleware (should be the last middleware)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5006;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// const apiRoutes = require('./routes/api');
// app.use('/api', apiRoutes);