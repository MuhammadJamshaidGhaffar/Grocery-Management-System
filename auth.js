import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config();

export const checkToken = (req, res, next) => {
    // Skip token check for /api/login route
    if (req.path === '/employee/login') {
      return next();
    }
  
    const token = req.headers['authorization'];
    console.log(token);
  
    if (token) {
      jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({ message: 'Token not provided' });
    }
  };
  