import User from './User,js';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Students = new Schema({
     Courses_taken: {
        type: String,
     },

}, { timestamps: true });

const student = mongoose.model('student', Students);
module.exports = student ;