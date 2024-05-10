import mongoose from 'mongoose';
import dotenv  from "dotenv"
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Group12:root@cluster0.311kvzz.mongodb.net/agency?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;