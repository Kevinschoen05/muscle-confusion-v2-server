const Exercise = require("../models/exercises");

module.exports = class ExerciseAPI {
  static async fetchAllExercises(req, res) {
    try {
      const exercises = await Exercise.find();
      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchExercisesByMuscleGroup(req, res) {
    try {
      const muscleGroup = req.params.primaryMuscleGroup;
      const exercises = await Exercise.find({
        primaryMuscleGroup: muscleGroup,
      });
      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchExerciseByExerciseId(req, res) {
    const exerciseID = req.params.exerciseID
    try {
      const exercise = await Exercise.find({
        _id: exerciseID,
      });
      res.status(200).json(exercise);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async addExercise(req, res) {
    const exercise = req.body;
    try {
      await Exercise.create(exercise);
      res.status(201).json({ message: "Exercise Created Successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getMuscleGroups(req, res) {
    const query = Exercise.find();
    try {
      const muscleGroups = await query.distinct(
        "primaryMuscleGroup",
        function (error, ids) {}
      );
      res.status(200).json(muscleGroups);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
