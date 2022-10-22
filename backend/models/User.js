const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    First_name: {
        type: String,
        minLength: 3,
        lowercase: true,
        validate: {
            validator: (value) => /^[a-z ]+$/.test(value),
            message: (props) => `${props.value} is not a valid name!`
        },
        required: [ true, "Name is required" ]
    },
    Last_name: {
        type: String,
        minLength: 3,
        lowercase: true,
        validate: {
            validator: (value) => /^[a-z ]+$/.test(value),
            message: (props) => `${props.value} is not a valid name!`
        },
        required: [ true, "Name is required" ]
    },
    id: {
        type: Number,
        index: { unique: true },
        min: [ 1, "ID must be greater than 0" ],
        required: [ true, "ID is required" ]
    },
    Age:{
        type: Number,
    },
    Gender: {
        type: String,
    },
    Password: { type: String, 
        unique: true,
        required: true
     },

    Username: { type: String,
         unique: true,
         required: true
         },

    Email: { type: String, 
        unique: true,
        required: true
     },
    
    Country: {
        type: String ,
        required: true
    },
    
}, { timestamps: true });

const Drone = mongoose.model('Drone', user);

const drone = new Drone({
    First_name: "SV - Aira 157B",
    Last_name: "Hello" ,
    id: 2455,
    Password: "Photography",
    Email: "Mohamedtamer",
    Country: "Egypt",
})

drone.save(function (err, doc) {
    console.log(doc._id);
});

const User = mongoose.model('User', user);
module.exports = User;