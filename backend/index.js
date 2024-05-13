import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

async function startServer() {
    const uri = "mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority";
    
    console.log('Connecting to database...');
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        await client.connect();
        console.log("Connected to MongoDB");

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

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();











