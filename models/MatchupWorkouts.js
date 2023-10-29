const mongoose = require("mongoose");

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const advanced = require("dayjs/plugin/advancedFormat");

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advanced);
dayjs.tz.setDefault("America/New_York");

const MatchupWorkoutSchema = mongoose.Schema({
  workoutID: String,
  workoutTitle: String,
  userWorkoutData: [
    {
      userID: String,
      workoutDuration: String,
      totalVolume: Number,
      completionDate: {
        type: Date,
        default: () => dayjs().tz().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      },
      exercises: {
        type: Array,
      },
    },
  ],
});
module.exports = mongoose.model(
  "MatchupWorkout",
  MatchupWorkoutSchema
);
