import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' // Reference to the Ticket model
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export { Cart };
