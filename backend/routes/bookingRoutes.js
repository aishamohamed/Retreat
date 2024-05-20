import express from 'express';
import Booking from '../models/bookingModel.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { ticketId, date } = req.body;
        const userId = req.user._id;
        const booking = new Booking({ ticketId, userId, date });
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get upcoming booking by user token
router.get('/', authenticateToken, async (req, res) => {
    try {
        const bookings = await Booking.find({
            userId: req.user._id,
            date: { $gte: new Date() }
        });
        if (bookings.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;













