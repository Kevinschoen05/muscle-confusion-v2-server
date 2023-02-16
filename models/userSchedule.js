const mongoose = require('mongoose'); 

const userScheduleSchema = mongoose.Schema({
    user: String, 
    schedule: {
        type: Array
    }
})
module.exports = mongoose.model("UserSchedule", userScheduleSchema)