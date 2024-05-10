import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './auth/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import cartRoutes from './routes/cartRoutes.js'

dotenv.config();

//connect to DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());



// Define Routes
app.use('/api', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));










