const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

// Middleware to verify token and set the user
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token ||  req.headers['authorization']?.split(' ')[1]; // Assuming Bearer token
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming you are using JWT
    console.log(decoded);
    
    const userId = decoded.userId
    console.log(userId);
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
