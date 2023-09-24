const express = require("express");
const router = express.Router();
const WorkoutAPI = require("../controllers/workoutController")
const CompletedWorkoutAPI = require("../controllers/completedWorkoutController")
const ExerciseAPI = require('../controllers/exerciseController')
const UserSpecificAPI = require('../controllers/userSpecificController')
const UserInboxAPI = require('../controllers/userInboxController')


//Workouts 
router.get("/workouts", WorkoutAPI.fetchAllWorkouts);
router.get("/workouts/:workoutID", WorkoutAPI.fetchWorkoutbyWorkoutId)

router.post("/workouts", WorkoutAPI.addWorkout);
router.put("/workouts/edit/:workoutID", WorkoutAPI.updateWorkoutByWorkoutID)



//Completed Workouts
router.get("/completedWorkouts", CompletedWorkoutAPI.fetchAllCompletedWorkouts)
router.get("/completedWorkouts/:workoutID", CompletedWorkoutAPI.fetchCompletedWorkoutsbyWorkoutId)
router.get("/completedWorkouts/id/:completedWorkoutID", CompletedWorkoutAPI.fetchCompletedWorkoutsbyId)
router.post("/completedWorkouts", CompletedWorkoutAPI.addCompletedWorkout)

//Exercises
router.get("/exercises", ExerciseAPI.fetchAllExercises)
router.get("/exercises/muscleGroups", ExerciseAPI.getMuscleGroups)
router.get("/exercises/:primaryMuscleGroup", ExerciseAPI.fetchExercisesByMuscleGroup)

router.post("/exercises", ExerciseAPI.addExercise)


//User Specific
router.post("/users/initializeUser/:userID", UserSpecificAPI.initializeUser)
router.get("/users", UserSpecificAPI.fetchAllUsers)
router.get("/users/:userID/userSchedule", UserSpecificAPI.fetchUserSchedule)
router.get("/workouts/users/:userIDs", UserSpecificAPI.fetchWorkoutsByUserId)
router.get("/completedWorkouts/users/:userIDs", UserSpecificAPI.fetchCompletedWorkoutsByUserId)

//User Messaging
router.post("/users/messages", UserInboxAPI.createMessage);
router.get("/users/inbox/:userID", UserInboxAPI.getInboxMessages);
router.put("/users/messages/:messageID", UserInboxAPI.updateMessage);
router.delete("/users/messages/:messageID", UserInboxAPI.deleteMessage);


//FRIENDS
router.get("/users/friends/data", UserSpecificAPI.fetchUserFriendsData)
router.get("/users/friends/:userID", UserSpecificAPI.fetchUserFriends)
router.put("/users/friends/add/:userID", UserSpecificAPI.addUserFriends)
router.put("/users/friends/remove/:userID", UserSpecificAPI.removeUserFriends)

//SCHEDULE
router.post("/users/:userID/userSchedule", UserSpecificAPI.createUserSchedule)
router.put("/users/:userID/userSchedule", UserSpecificAPI.updateUserSchedule)




module.exports = router;