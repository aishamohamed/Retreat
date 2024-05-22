import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import authRoutes from './auth/authRoute.js'; 
import authenticateToken from './auth/authMiddleware.js'; 
import dashboardRoutes from './routes/dashboardRoute.js';
import userRoutes from './routes/userRoute.js';
import cartRoutes from './routes/cartRoute.js';
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from './routes/paymentRoute.js'; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Allow requests from your frontend URL
app.use(cors({
  origin: 'http://localhost:5173'
}));

const PORT = process.env.PORT || 3500;

async function startServer() {
    const uri = process.env.MONGODB_URI || "mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority";
    
    console.log('Connecting to database...');
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB using Mongoose");

        app.get('/', (req, res) => {
            res.send("Hello World!");
        });

        app.use('/protected-route', authenticateToken);
        
        app.use('/cart', cartRoutes);
        app.use('/payment', paymentRoutes);
        app.use('/api', authRoutes);
        app.use(dashboardRoutes);
        app.use('/user', userRoutes);
        app.use('/booking', bookingRoutes);

        // use client app
        app.use(express.static(path.join(__dirname, 'client', 'dist')));

        // Render client for any path
        app.get('*', (req, res) => res.sendFile(path.join(__dirname, "/client/dist/index.html")));

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();


























