
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     email: { 
//         type: String, 
//         required: true, 
//         unique: true 
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//     role: { 
//         type: String, 
//         default: 'user' // This handles 'admin' vs 'user' logic
//     },
//     date: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // 1. New Field: Name
    name: { 
        type: String, 
        required: true 
    },
    
    // 2. New Field: Phone Number
    // (We use String instead of Number to handle +, -, and leading zeros)
    phone: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: 'user', 
        enum: ['user', 'admin'] 
    },
    // Reset Password fields
    resetToken: String,            
    resetTokenExpiration: Date,
    date: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);