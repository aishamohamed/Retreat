import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import authRoutes from './auth/authRoutes.js'; // Import the authentication routes
import authenticateToken from './auth/authMiddeleware.js'; // Correct the path
import dashboardRoutes from './routes/dashboardRoutes.js'; // Correct the path
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

async function startServer() {
    const uri = "mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority";
    
    console.log('Connecting to database...');
    try {
        const uri = "mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority";
    
        console.log('Connecting to database...');
        

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB using MongoClient");

        // Access the agency database and ticket collection
        const db = client.db("agency");
        const ticketCollection = db.collection("ticket");

        // Define a route handler for the root URL ("/") to fetch data from the database
        app.get('/', async (req, res) => {
            try {
                // Fetch data from the ticket collection
                const tickets = await ticketCollection.find().toArray();
                res.json(tickets); // Send the fetched data as JSON response
            } catch (error) {
                console.error("Failed to fetch data from database:", error);
                res.status(500).json({ message: "Failed to fetch data from database" });
            }
        });
        
        // Use the authentication routes
        app.use('/api',authRoutes);

        // Use the dashboard routes
        app.use(dashboardRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();











