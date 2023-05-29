import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];


  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized Please login' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized Please login' });
  }
};


export default validateToken;