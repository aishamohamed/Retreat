import express from 'express';
import { Ticket } from './ticketModel.js';

const router = express.Router();

// Middleware to get a ticket by ID
async function getTicket(req, res, next) {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.ticket = ticket;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Middleware for user authentication (adjust this according to your authentication mechanism)
function authenticateUser(req, res, next) {
    // Example: Check if user is logged in
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

// Middleware for input validation
function validateInput(req, res, next) {
    const { type, description, price, currency, daysValid, location } = req.body;
    if (!type || !description || !price || !currency || !daysValid || !location) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
}

// Create a new ticket
router.post('/', authenticateUser, validateInput, async (req, res) => {
    try {
        const { type, description, price, currency, daysValid, location } = req.body;
        const ticket = new Ticket({ type, description, price, currency, daysValid, location });
        await ticket.save();
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get a single ticket by ID
router.get('/:id', getTicket, async (req, res) => {
    res.json(res.ticket);
});

// Update a ticket by ID
router.patch('/:id', authenticateUser, getTicket, validateInput, async (req, res) => {
    try {
        const { type, description, price, currency, daysValid } = req.body;
        res.ticket.type = type;
        res.ticket.description = description;
        res.ticket.price = price;
        res.ticket.currency = currency;
        res.ticket.daysValid = daysValid;
        const updatedTicket = await res.ticket.save();
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Delete a ticket by ID
router.delete('/:id', authenticateUser, getTicket, async (req, res) => {
    try {
        await res.ticket.remove();
        res.json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;













