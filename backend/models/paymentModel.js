import mongoose from 'mongoose';

const paypalSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const creditCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
});

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['paypal', 'credit_card'],
    required: true
  },
  paypal: paypalSchema,
  creditCard: creditCardSchema,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model("payment", paymentSchema);

export { Payment };
