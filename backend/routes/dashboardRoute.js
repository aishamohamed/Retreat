
import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';
import { User } from '../models/userModel.js';

const router = express.Router();


router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { username, email } = user;
    const userData = { username, email };
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;


