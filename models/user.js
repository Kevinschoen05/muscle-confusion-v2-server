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
    }
})
module.exports = mongoose.model("User", userSchema)