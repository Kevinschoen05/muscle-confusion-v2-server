const mongoose = require('mongoose'); 

const exerciseSchema = mongoose.Schema({
    exerciseName: String, 
    primaryMuscleGroup: String, 
    secondaryMuscleGroups: Array
})
module.exports = mongoose.model("Exercise", exerciseSchema)