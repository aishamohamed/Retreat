// ticketModel.js

import mongoose from "mongoose";

const ticketSchema = mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        daysValid: {
            type: Number,
            required: true,
        }
    }
);

const Ticket = mongoose.model("ticket", ticketSchema);

export { Ticket };

