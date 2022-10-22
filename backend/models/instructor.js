import User from './User,js';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const instructor = new Schema({
    Instructor_rating: {
        type: Number ,
    },
    Instructor_certificates: {
        type: String ,
        required: true 
    },
    Courses: {
        type: String,
        required: true
    },

}, { timestamps: true });

const instructors = mongoose.model('instructor', instructor);
module.exports = instructors ;