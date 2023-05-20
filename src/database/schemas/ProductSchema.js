const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    refCode: {
        type: Number,
        required: true,
        unique: true,
        default: Math.floor(Math.random() * 10000)
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;