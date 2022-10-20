const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const instructor = new Schema({
Name:{
type:String,
require:true
},
Age:{
    type:Number,
    require:true
}
}, { timestamps: true });

const User = mongoose.model('instructor', instructor);
module.exports = User;