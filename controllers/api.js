const Workout = require("../models/workouts");
const Exercise = require("../models/exercises");
const CompletedWorkout = require("../models/completedWorkouts");
const UserSchedule = require("../models/userSchedule");

module.exports = class API {
  //Workouts
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

  //COMPLETED WORKOUTS

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

  //USER SPECIFIC REQUESTS
  static async fetchWorkoutsByUserId(req, res) {
    const user = req.params.userID;
    try {
      const userWorkouts = await Workout.find({
        users: user,
      });
      res.status(200).json(userWorkouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchCompletedWorkoutsByUserId(req, res) {
    const user = req.params.userID;
    try {
      const userCompletedWorkouts = await CompletedWorkout.find({
        users: user,
      });
      res.status(200).json(userCompletedWorkouts);
    } catch (err) {
      res.satus(404).json({ message: err.message });
    }
  }

  //USER SCHEDULE

  static async fetchUserSchedule(req, res) {
    const user = req.params.userID;
    try {
      const userSchedule = await UserSchedule.find({
        user: user
      }
      );

      let response = userSchedule[0].toObject()
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createUserSchedule(req, res) {
    const userSchedule = req.body;
    try {
      await UserSchedule.create(userSchedule);
      res
        .status(201)
        .json({ message: "Completed Workout Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateUserSchedule(req, res) {
    const updatedSchedule = req.body.schedule;
    const user = req.body.user;
    try {
      await UserSchedule.findOneAndUpdate(
        {
          user: user,
        },
        { $set: { schedule: updatedSchedule } }
      )
      res.status(200).json({message: "Schedule Updated Successfully"});
    } 
    catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  

  //EXERCISES
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

  static async addExercise(req, res){
    const exercise = req.body;
    try {
      await Exercise.create(exercise);
      res.status(201).json({ message: "Exercise Created Successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getMuscleGroups(req, res){
    const query = Exercise.find()
    try{
       const muscleGroups = await query.distinct(
          'primaryMuscleGroup', function(error, ids){

          }
      )
       res.status(200).json(muscleGroups);
    }   catch (err) {
      res.status(400).json({ message: err.message });
    }   

  }
};
