import jwt from 'jsonwebtoken';
import User from '../routes/userModel.js';


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);
    
    try {
      const user = await User.findById(decoded.userId);
      if (!user) return res.sendStatus(403);

      req.user = user;
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  });
};

export default authenticateToken;
