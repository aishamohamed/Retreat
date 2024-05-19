import express from 'express';
import { Cart} from '../models/cartModel.js';
import authenticateToken from '../auth/authMiddleware.js';

const router = express.Router();


router.use(authenticateToken);


router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart) {
      return res.status(200).json({ cartItems: [] });
    }
    res.status(200).json({ cartItems: cart.items });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;




  
