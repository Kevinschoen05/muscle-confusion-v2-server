const mongoose = require('mongoose'); 

const exerciseSchema = mongoose.Schema({
    exerciseName: String, 
    primaryMuscleGroup: String, 
    secondaryMuscleGroups: Array,
    equipment: String
})
module.exports = mongoose.model("Exercise", exerciseSchema)