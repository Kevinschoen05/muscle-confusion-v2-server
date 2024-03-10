const Workout = require("../models/workouts");
const ObjectId = require("mongoose").Types.ObjectId;

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
      );
      res.status(200).json({ message: "Workout Updated Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async addUserToWorkout(req, res) {
    const workoutID = req.body.workoutID;
    const userID = req.body.userID;
    console.log(`Received workoutID: ${workoutID}, userID: ${userID}`);

    try {
      const result = await Workout.findOneAndUpdate(
        { _id: ObjectId(workoutID) }, // Mongoose automatically handles the conversion to ObjectId.
        { $addToSet: { users: userID } }, // Use $addToSet as confirmed to be working
        { new: true } // Returns the modified document
      );
      console.log(result); // See what the database operation returns

      if (result) {
        res
          .status(200)
          .json({
            message: "User added to workout successfully",
            data: result,
          });
      } else {
        // If no document was found and updated, return a different message
        res.status(404).json({ message: "Workout not found" });
      }
    } catch (err) {
      console.error(err); // More detailed error logging
      res.status(400).json({ message: err.message });
    }
  }
};
