// where the user is redirected after logging in
import express from 'express';
import authenticateToken from '../auth/authMiddeleware.js';
import User from './userModel.js';
import Booking from './bookingModel.js';

const router = express.Router();

// Dashboard route
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    //return user information
    const userData = {
      username: req.user.username,
      email: req.user.email,
      // Add more user data if needed
    };
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upcoming bookings route
router.get('/bookings/upcoming', authenticateToken, async (req, res) => {
    try {
        const booking = await Booking.find({
            userId: req.user._id, 
            date: { $gte: new Date() },
            status: 'upcoming' 
        });
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log('error getting upcoming bookings.', error)
    }
  });

export default router;
