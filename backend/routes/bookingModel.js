// to store the booked trips for users in the bookings collection in the db 
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true},
  currency: { type: String, required: true},
  daysValid: {type: Number},
  status: {type: String, required: true}
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
