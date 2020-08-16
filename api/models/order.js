const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        // name of the model you want a relation with
        ref: 'Product',
        required: true
    },
    // quantity:{type:Number, required:true}
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model('Order', orderSchema);