const CompletedWorkout = require("../models/completedWorkouts");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CompletedWorkoutAPI {
  static async fetchAllCompletedWorkouts(req, res) {
    try {
      const workouts = await CompletedWorkout.find();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchCompletedWorkoutsbyWorkoutId(
    req,
    res,
    sortByCompletionDate = false
  ) {
    const workoutID = req.params.workoutID;
    try {
      const sortParameter = sortByCompletionDate ? { completionDate: -1 } : {};

      const workouts = await CompletedWorkout.find({
        workoutID: workoutID,
      }).sort(sortParameter);
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchCompletedWorkoutsbyId(req, res) {
    const completedWorkoutID = req.params.completedWorkoutID;
    try {
      const completedWorkout = await CompletedWorkout.find({
        _id: ObjectId(completedWorkoutID),
      });
      if (completedWorkout) {
        res.status(200).json(completedWorkout);
      } else {
        res.status(404).json({ message: "Completed workout not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async addCompletedWorkout(req, res) {
    const workout = req.body;
    try {
      await CompletedWorkout.create(workout);
      res
        .status(201)
        .json({ message: "Completed Workout Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

};
