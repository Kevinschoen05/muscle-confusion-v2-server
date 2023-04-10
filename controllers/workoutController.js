const Workout = require("../models/workouts");

module.exports = class WorkoutAPI {
  static async fetchAllWorkouts(req, res) {
    try {
      const workouts = await Workout.find();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchWorkoutbyWorkoutId(req, res) {
    const presetWorkout = req.params.workoutID;
    try {
      const activeWorkout = await Workout.find({
        _id: presetWorkout,
      });
      res.status(200).json(activeWorkout);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  static async addWorkout(req, res) {
    const workout = req.body;
    try {
      await Workout.create(workout);
      res.status(201).json({ message: "Workout Created Successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateWorkoutByWorkoutID(req, res) {
    const updatedWorkout = req.body.updatedFinalWorkout;
    const workoutID = req.body._id;
    try {
      await Workout.findOneAndUpdate(
        {
          _id: workoutID,
        },
        { $set: { exercises: updatedWorkout } }
      )
      res.status(200).json({message: "Workout Updated Successfully"});
    } 
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
