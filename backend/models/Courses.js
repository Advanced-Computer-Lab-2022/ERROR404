const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courses = new Schema({
    Course_Subject: {
        type: String,
        required: true
    },
    Course_Instructor: {
        type: String,
        required: true
    },
    Course_title: {
        type: String ,
        required: true

    },
    Course_total_hours: {
        type: Number,
        required: true
    },
    Course_rating: {
        type: Number,
        required: true
    },
    Course_price: {
        type: Number,
        default: 0 ,
        required: true

    },

}, { timestamps: true });

const Courses = mongoose.model('courses', courses);
module.exports = Courses;