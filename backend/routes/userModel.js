import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    //userId: {type: mongoose.Schema.Types.ObjectId,required: true}, removed this since MongoDB automatically creates an _id field that serves as a userId
    sessionId: {type: mongoose.Schema.Types.ObjectId,},
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema);

export default User; 
