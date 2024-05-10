import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' // Reference to the Ticket model
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };
