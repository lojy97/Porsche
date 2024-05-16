const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    CustomerID : {type: Number,required: true},
    Products : {type: Array,required: true},
    TotalPrice : {type: Number,required: true},
    CartID : {type: Number,required: true, unique: true}
})

module.exports = mongoose.model('Cart', cartSchema);
module.exports.Schema = cartSchema; 