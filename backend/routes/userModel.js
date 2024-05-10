import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
    }
});

const User = mongoose.model('User', userSchema);

export { User };
