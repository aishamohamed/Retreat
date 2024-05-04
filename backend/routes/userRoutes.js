
import express from 'express';
import { Cart } from './cartModel.js'; 

const router = express.Router();

// Middleware to get the user's cart by user ID
async function getUserCart(req, res, next) {
    try {
        const userId = req.user.id; 
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if not exists
            const newCart = new Cart({ userId, items: [] });
            await newCart.save();
            res.cart = newCart;
        } else {
            res.cart = cart;
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Add a ticket to the user's cart
router.post('/cart/add', getUserCart, async (req, res) => {
    try {
        const { ticketId } = req.body;
        // Add the ticketId to the cart's items array
        res.cart.items.push(ticketId);
        await res.cart.save();
        res.status(201).json({ message: 'Ticket added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Remove a ticket from the user's cart
router.delete('/cart/remove/:ticketId', getUserCart, async (req, res) => {
    try {
        const { ticketId } = req.params;
        // Remove the ticketId from the cart's items array
        res.cart.items = res.cart.items.filter(item => item !== ticketId);
        await res.cart.save();
        res.json({ message: 'Ticket removed from cart' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Purchase tickets in the user's cart
router.post('/cart/purchase', getUserCart, async (req, res) => {
    try {
        
        res.cart.items = []; // Clear the cart after purchase
        await res.cart.save();
        res.json({ message: 'Purchase successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
