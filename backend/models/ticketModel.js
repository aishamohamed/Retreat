import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  daysValid: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  activities: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Ticket = mongoose.model("ticket", ticketSchema);

export { Ticket };
