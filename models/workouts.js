const mongoose = require('mongoose'); 

const workoutSchema = mongoose.Schema({
    workoutTitle: String, 
    exercises: { 
        type: Array
    },
    users: { 
        type: Array
    }
})
module.exports = mongoose.model("Workout", workoutSchema)