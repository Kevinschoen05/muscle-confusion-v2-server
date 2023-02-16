const mongoose = require('mongoose'); 

const dayjs = require("dayjs")
const  utc = require("dayjs/plugin/utc")
const  timezone = require("dayjs/plugin/timezone");
const  advanced = require("dayjs/plugin/advancedFormat")

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(advanced)
dayjs.tz.setDefault('America/New_York');


const completedWorkoutSchema = mongoose.Schema({
    workoutID: String, 
    workoutTitle: String, 
    workoutDuration: String,
    completionDate: {
        type: Date, 
        default:  dayjs().tz().format('MM/DD/YYYY h:mm:ss z')

    },
    exercises: { 
        type: Array
    },
    users: { 
        type: Array
    }
})
module.exports = mongoose.model("CompletedWorkout", completedWorkoutSchema)