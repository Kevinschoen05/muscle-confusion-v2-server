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
    const exerciseID = req.params.exerciseID;
    try {
      const exercise = await Exercise.find({
        _id: exerciseID,
      });
      res.status(200).json(exercise);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getExercisesForRandomWorkout(req, res) {
    try {
      const desiredExerciseCount = parseInt(req.query.desiredExerciseCount);
      const minSets = parseInt(req.query.minSets);
      const maxSets = parseInt(req.query.maxSets);
      const minReps = parseInt(req.query.minReps);
      const maxReps = parseInt(req.query.maxReps);
      const muscleGroups = req.query.muscleGroups
        ? req.query.muscleGroups.split(",")
        : [];

      let query = {};
      if (muscleGroups.length > 0) {
        query.primaryMuscleGroup = { $in: muscleGroups };
      }

      const allExercises = await Exercise.find(query);

      if (allExercises.length < desiredExerciseCount) {
        return res
          .status(400)
          .json({
            message:
              "Not enough exercises available for the selected muscle groups.",
          });
      }

      const shuffledExercises = allExercises.sort(() => 0.5 - Math.random());
      const selectedExercises = shuffledExercises.slice(
        0,
        desiredExerciseCount
      );

      const formattedExercises = selectedExercises.map((exercise) => {
        const targetSets =
          Math.floor(Math.random() * (maxSets - minSets + 1)) + minSets;

        return {
          exerciseName: exercise.exerciseName,
          targetSets: targetSets,
          sets: Array.from({ length: targetSets }, (_, index) => {
            const targetReps =
              Math.floor(Math.random() * (maxReps - minReps + 1)) + minReps;
            return {
              index: index + 1,
              target_reps: targetReps,
              actual_reps: 0,
              target_weight: 0,
              actual_weight: 0,
              completed: false,
              success: false,
            };
          }),
          id: exercise._id,
          primaryMuscleGroup: exercise.primaryMuscleGroup,
          secondaryMuscleGroups: exercise.secondaryMuscleGroups,
          exerciseType: exercise.exerciseType,
        };
      });

      res.status(200).json(formattedExercises);
    } catch (err) {
      res.status(500).json({ message: err.message });
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
