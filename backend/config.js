// config.js
import { connect } from 'mongoose';

export async function ConnectDB(uri) {
    try {
        await connect(uri, {
            useNewUrlParser: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}





