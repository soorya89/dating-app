

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
     
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select('-password');
      console.log('Token verified and user set:', req.user);      
     return next();
     
    } catch (error) {
      console.error('Token verification failed:', error);
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token is expired' });
      }

      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;


