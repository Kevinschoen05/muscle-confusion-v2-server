const CompletedWorkout = require("../models/completedWorkouts");

module.exports = class CompletedWorkoutAPI {
  static async fetchAllCompletedWorkouts(req, res) {
    try {
      const workouts = await CompletedWorkout.find();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
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
