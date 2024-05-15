const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    AdminId : {type: Number,required: true, unique: true},
    AdminName : {type: String,required: true},
    AdminEmail : {type: String,required: true,unique: true},
    AdminPassword : {type: String,required: true},
})

module.exports = mongoose.model('Admins', userSchema);
module.exports.Schema = userSchema; 