const express = require("express");
const router = express.Router();
const WorkoutAPI = require("../controllers/workoutController")
const CompletedWorkoutAPI = require("../controllers/completedWorkoutController")
const ExerciseAPI = require('../controllers/exerciseController')
const UserSpecificAPI = require('../controllers/userSpecificController')


//Workouts 
router.get("/workouts", WorkoutAPI.fetchAllWorkouts);
router.get("/workouts/:workoutID", WorkoutAPI.fetchWorkoutbyWorkoutId)

router.post("/workouts", WorkoutAPI.addWorkout);



//Completed Workouts
router.get("/completedWorkouts", CompletedWorkoutAPI.fetchAllCompletedWorkouts)

router.post("/completedWorkouts", CompletedWorkoutAPI.addCompletedWorkout)

//Exercises
router.get("/exercises", ExerciseAPI.fetchAllExercises)
router.get("/exercises/muscleGroups", ExerciseAPI.getMuscleGroups)
router.get("/exercises/:primaryMuscleGroup", ExerciseAPI.fetchExercisesByMuscleGroup)

router.post("/exercises", ExerciseAPI.addExercise)


//User Specific
router.get("/userSchedule/users/:userID", UserSpecificAPI.fetchUserSchedule)
router.get("/workouts/users/:userID", UserSpecificAPI.fetchWorkoutsByUserId)
router.get("/completedWorkouts/users/:userID", UserSpecificAPI.fetchCompletedWorkoutsByUserId)

router.post("/userSchedule", UserSpecificAPI.createUserSchedule)

router.put("/userSchedule/users/:userID", UserSpecificAPI.updateUserSchedule)




module.exports = router;