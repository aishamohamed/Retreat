// to store the booked trips for users in the bookings collection in the db 
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  date: { type: Date, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema, 'booking');

export default Booking;
