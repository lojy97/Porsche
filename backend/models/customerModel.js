const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    CustomerID : {type: Number,required: true},
    Name : {type: String,required: true},
    Email : {type: String,required: true,unique: true},
    Address : {type: String,required: true},
    Password : {type: String,required: true}
 
})

module.exports = mongoose.model('Customer', customerSchema);
module.exports.Schema = customerSchema; 