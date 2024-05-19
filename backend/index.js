import express from 'express';
import cors from 'cors';
<<<<<<< Updated upstream
=======
import { MongoClient } from 'mongodb';
import authRoutes from './auth/authRoutes.js'; 
import authenticateToken from './auth/authMiddeleware.js';
import dashboardRoutes from './routes/dashboardRoutes.js'; 
import stripePaymentRouter from './routes/stripePayment.js';
>>>>>>> Stashed changes
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './auth/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoute.js';
import userRoutes from './routes/userRoute.js';
import cartRoutes from './routes/cartRoute.js';
import paymentRoutes from './routes/paymentRoute.js'; 

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

async function startServer() {
    const uri = process.env.MONGODB_URI || "mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority";
    
    console.log('Connecting to database...');
    try {
<<<<<<< Updated upstream
        await mongoose.connect(uri);

        console.log("Connected to MongoDB using Mongoose");

=======

        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        const client = new MongoClient(uri);
        await client.connect();
        console.log("Connected to MongoDB using MongoClient");

        // Access the agency database and ticket collection
        const db = client.db("agency");
        const ticketCollection = db.collection("ticket");

        // Define a route handler for the root URL ("/") to fetch data from the database
>>>>>>> Stashed changes
        app.get('/', async (req, res) => {
            try {
                const db = mongoose.connection.db;
                const ticketCollection = db.collection("ticket");
                const tickets = await ticketCollection.find().toArray();
                res.json(tickets);
            } catch (error) {
                console.error("Failed to fetch data from database:", error);
                res.status(500).json({ message: "Failed to fetch data from database" });
            }
        });

        
        app.use('/cart', cartRoutes);

        app.use('/payment', paymentRoutes);

        app.use('/api', authRoutes);
        app.use(dashboardRoutes);
        app.use('/user', userRoutes);

        app.use('/api', stripePaymentRouter); // Use the stripePayment router

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();


























