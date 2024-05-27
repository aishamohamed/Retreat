import express from 'express';
import authenticateToken from '../auth/authMiddleware.js';
import Booking from '../models/bookingModel.js';
import Ticket from '../models/ticketModel.js'; 

const router = express.Router();

// Create a new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { ticketId, date } = req.body;
    const userId = req.user._id;

    // does  the ticket exist
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Create a new booking
    const booking = new Booking({ userId, ticketId, date });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Getting upcoming bookings by user
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;

    // Finding upcoming bookings for the user
    const bookings = await Booking.find({
      userId,
      date: { $gte: new Date() }
    });

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No upcoming bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching upcoming bookings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;

















