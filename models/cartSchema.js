//import mongoose
const mongoose = require('mongoose');

//define schema for carts collection to store data
const cartSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    title: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },
    
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required:true,
    },
    grandTotal:{
        type:Number,
        required:true,
    }
});

// create a model to store carts
const carts = mongoose.model('carts',cartSchema);

// export the model
module.exports = carts;
