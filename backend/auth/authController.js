import jwt from 'jsonwebtoken';

// Mock user data (replace this with actual user authentication logic)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Authenticate user
export const login = (req, res) => {
    const { username, password } = req.body;
    // Mock authentication logic
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
};
