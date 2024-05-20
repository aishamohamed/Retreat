import express from 'express';
import bcrypt from 'bcrypt';
import { Payment } from '../models/paymentModel.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.SECRET_KEY);

router.post('/paypal', async (req, res) => {
  try {
    const { userId, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required for PayPal payment' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const payment = new Payment({
      userId,
      paymentMethod: 'paypal',
      paypal: {
        email,
        password: hashedPassword,
      },
    });
    await payment.save();

    res.status(200).json({ message: 'PayPal payment successful' });
  } catch (error) {
    console.error('Error processing PayPal payment:', error);
    res.status(500).json({ message: 'Failed to process PayPal payment' });
  }
});

router.post('/stripe', async (req, res) => {
  try {
    const { userId, paymentIntentId, cardBrand, last4 } = req.body;

    if (!paymentIntentId || !cardBrand || !last4) {
      return res.status(400).json({ message: 'Payment Intent ID, card brand, and last 4 digits are required for Stripe payment' });
    }

    const payment = new Payment({
      userId,
      paymentMethod: 'stripe',
      stripe: {
        paymentIntentId,
        cardBrand,
        last4,
      },
    });
    await payment.save();

    res.status(200).json({ message: 'Stripe payment successful' });
  } catch (error) {
    console.error('Error processing Stripe payment:', error);
    res.status(500).json({ message: 'Failed to process Stripe payment' });
  }
});

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'sek',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default router;

