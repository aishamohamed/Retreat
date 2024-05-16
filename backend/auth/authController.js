import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../routes/userModel.js'; 
import mongoose from 'mongoose';


// Function to generate a session ID
function generateSessionId() {
    return new mongoose.Types.ObjectId();
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'email', message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'password', message: 'Invalid credentials' });

        //handle the session ID if you need to store it
        const sessionId = generateSessionId();
        user.sessionId = sessionId;
        await user.save();

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ username, email, password: hashedPassword });
        await user.save().then(result => console.log("User created:", result))
        .catch(err => {
            console.error("Error saving user:", err);
            res.status(500).json({ message: 'Failed to save user' });
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
