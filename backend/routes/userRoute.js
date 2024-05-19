
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // email exists?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); 

    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



export default router;








