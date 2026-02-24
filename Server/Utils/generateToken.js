const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret_key_123', {
    expiresIn: '10d', // Token expires in 10 days
  });
};

module.exports = generateToken;