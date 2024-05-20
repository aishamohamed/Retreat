import mongoose from 'mongoose';

const paypalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const stripeSchema = new mongoose.Schema({
  paymentIntentId: {
    type: String,
    required: true,
  },
  cardBrand: {
    type: String,
    required: true,
  },
  last4: {
    type: String,
    required: true,
  },
});

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'stripe'],
    required: true,
  },
  paypal: paypalSchema,
  stripe: stripeSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export { Payment };

