const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    OrderID : {type: Number,required: true, unique: true},
    CustomerID : {type: Number,required: true},
    Products : {type: Array,required: true},
    TotalPrice : {type: Number,required: true},
    shippingAddress : {type: String,required: true},
    createdAt : {type: Date,required: true},

})

module.exports = mongoose.model('Order', orderSchema);
module.exports.Schema = orderSchema; 