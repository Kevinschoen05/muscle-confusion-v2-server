const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema({
    userID: String,
    userName: String,
    totalVolume: Number, 
    workoutStreak: Number, 
    friends: {
        type: Array
    }, 
    schedule: {
        type: Array
    },
    inbox: {
        type: Array
    },
    weights: [{
        weight: Number, // The weight of the user at the time of the record
        date: {
            type: Date,
            default: Date.now // Automatically captures the date when the weight record is created
        }
    }],
    targetWeights: [{
        weight: Number, // The weight of the user at the time of the record
        date: {
            type: Date,
            default: Date.now // Automatically captures the date when the weight record is created
        }
    }]
})
module.exports = mongoose.model("User", userSchema)