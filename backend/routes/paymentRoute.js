import express from 'express';
import bcrypt from 'bcrypt';
import { Payment } from '../models/paymentModel.js';


const router = express.Router();

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

        const isValidUser = await validateUserCredentials(email, password);
        if (!isValidUser) {
            return res.status(401).json({ message: 'Invalid PayPal credentials' });
        }

        const payment = new Payment({
            userId,
            paymentMethod: 'paypal',
            paypal: {
                email,
                password: await bcrypt.hash(password, 10)
            }
        });
        await payment.save();

        res.status(200).json({ message: 'PayPal payment successful' });
    } catch (error) {
        console.error('Error processing PayPal payment:', error);
        res.status(500).json({ message: 'Failed to process PayPal payment' });
    }
});

router.post('/card', async (req, res) => {
    try {
        const { userId, cardNumber, expirationDate, cvv } = req.body;

        if (!cardNumber || !expirationDate || !cvv) {
            return res.status(400).json({ message: 'Card number, expiration date, and CVV are required for card payment' });
        }

        if (!validateCardNumber(cardNumber)) {
            return res.status(400).json({ message: 'Invalid card number format' });
        }

        if (!validateExpirationDate(expirationDate)) {
            return res.status(400).json({ message: 'Invalid expiration date format' });
        }

        if (!validateCVV(cvv)) {
            return res.status(400).json({ message: 'Invalid CVV format' });
        }

        const payment = new Payment({
            userId,
            paymentMethod: 'credit_card',
            creditCard: {
                cardNumber,
                expirationDate,
                cvv
            }
        });
        await payment.save();

        res.status(200).json({ message: 'Credit/debit card payment successful' });
    } catch (error) {
        console.error('Error processing credit/debit card payment:', error);
        res.status(500).json({ message: 'Failed to process credit/debit card payment' });
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function validateUserCredentials(email, password) {
    return email && password;
}

function validateCardNumber(cardNumber) {
    const cardNumberRegex = /^\d{10}$/;
    return cardNumberRegex.test(cardNumber);
}

function validateExpirationDate(expirationDate) {
    return expirationDate;
}

function validateCVV(cvv) {
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
}

export default router;
