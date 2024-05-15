const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    ProductID : {type: Number,required: true, unique: true},
    Description : {type: String,required: true},
    ProductName : {type: String,required: true},
    ProductImage : {type: String,required: true},
    Price : {type: Number,required: true},
    Stock : {type: Number,required: true}

})

module.exports = mongoose.model('Cart', userSchema);
module.exports.Schema = userSchema; 