const completedMatchupWorkout = require("../models/completedMatchupWorkouts");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class completedMatchupWorkoutsAPI {
  static async createCompletedMatchupWorkout(req, res) {
    const workout = req.body;
    try {
      await completedMatchupWorkout.create(workout);
      res
        .status(201)
        .json({ message: "Completed Workout Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async fetchAllCompletedMatchupWorkouts(req, res) {
    try {
      const workouts = await completedMatchupWorkout.find();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getCompletedMatchupWorkoutsByUserID(req, res) {
    const userIds = req.params.userIDs.split(","); // Assuming userIDs are comma-separated in the request params
    try {
      const userCompletedMatchupWorkouts = await completedMatchupWorkout.find({
        userWorkoutData: {
          $elemMatch: { userID: { $in: userIds } },
        },
      });
      res.status(200).json(userCompletedMatchupWorkouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getCompletedMatchupWorkoutByID(req, res) {
    const completedMatchupWorkoutID = req.params.completedMatchupWorkoutID;
    try {
      const result = await completedMatchupWorkout.find({
        _id: ObjectId(completedMatchupWorkoutID),
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Completed workout not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
