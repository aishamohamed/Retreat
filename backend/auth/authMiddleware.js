import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || '9a3c5e194f45ae5845cd4399ba96ca4515567da055a20790716ec33c58233a06';

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId); 
    if (!user) return res.sendStatus(403); 

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification or user fetching error:', error);
    res.sendStatus(403); 
  }
};

export default authenticateToken;






