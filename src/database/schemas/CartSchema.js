import mongoose from 'mongoose';
const { Schema } = mongoose;

const CartSchema = new Schema({
    cartId: {
        type: Number,
        required: true,
        unique: true,
        default: Math.floor(Math.random() * 10000)
    },
    product_Id: {
        type: 'ObjectId',
        ref: 'Product'
    },
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    quantity: {
        type: Number
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})