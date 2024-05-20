import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';
import { User } from '../models/userModel.js';
import Booking from '../models/bookingModel.js';


const router = express.Router();


router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
   
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
   
    const { username, email } = user;
    const userData = { username, email };

    res.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/bookings/upcoming', authenticateToken, async (req, res) => {
  try {
    
    const bookings = await Booking.find({
      userId: req.user._id,
      date: { $gte: new Date() },
      status: 'upcoming'
    });

   
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching upcoming bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

