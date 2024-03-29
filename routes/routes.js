const express = require("express");
const router = express.Router();
const WorkoutAPI = require("../controllers/workoutController");
const CompletedWorkoutAPI = require("../controllers/completedWorkoutController");
const MatchupWorkoutAPI = require("../controllers/matchupWorkoutController");
const completedMatchupWorkoutsAPI = require("../controllers/completedMatchupWorkoutController");
const ExerciseAPI = require("../controllers/exerciseController");
const UserSpecificAPI = require("../controllers/userSpecificController");
const UserInboxAPI = require("../controllers/userInboxController");

//Workouts
router.get("/workouts", WorkoutAPI.fetchAllWorkouts);
router.get("/workouts/:workoutID", WorkoutAPI.fetchWorkoutbyWorkoutId);

router.post("/workouts", WorkoutAPI.addWorkout);
router.put("/workouts/edit/:workoutID", WorkoutAPI.updateWorkoutByWorkoutID);
router.put("/workouts/addUser", WorkoutAPI.addUserToWorkout)

//Completed Workouts
router.get("/completedWorkouts", CompletedWorkoutAPI.fetchAllCompletedWorkouts);
router.get(
  "/completedWorkouts/:workoutID",
  CompletedWorkoutAPI.fetchCompletedWorkoutsbyWorkoutId
);
router.get(
  "/completedWorkouts/id/:completedWorkoutID",
  CompletedWorkoutAPI.fetchCompletedWorkoutsbyId
);
router.post("/completedWorkouts", CompletedWorkoutAPI.addCompletedWorkout);

//Matchup Workouts
router.get(
  "/matchupWorkouts/:userIDs",
  MatchupWorkoutAPI.getMatchupWorkoutsByUserID
);
router.get(
  "/matchupWorkouts/id/:matchupWorkoutID",
  MatchupWorkoutAPI.getMatchupWorkoutByMatchupWorkoutId
);
router.post("/matchupWorkouts", MatchupWorkoutAPI.createMatchupWorkout);
router.put("/matchupWorkouts/update/:matchupWorkoutID", MatchupWorkoutAPI.updateMatchupWorkout);


//Completed Matchup Workouts
router.get(
  "/completedMatchupWorkouts",
  completedMatchupWorkoutsAPI.fetchAllCompletedMatchupWorkouts
);

router.get(
  "/completedMatchupWorkouts/:userIDs",
  completedMatchupWorkoutsAPI.getCompletedMatchupWorkoutsByUserID
);
router.get(
  "/completedMatchupWorkouts/id/:completedMatchupWorkoutID",
  completedMatchupWorkoutsAPI.getCompletedMatchupWorkoutByID
);
router.post(
  "/completedMatchupWorkouts",
  completedMatchupWorkoutsAPI.createCompletedMatchupWorkout
);

//Exercises
router.get("/exercises", ExerciseAPI.fetchAllExercises);
router.get("/exercises/muscleGroups", ExerciseAPI.getMuscleGroups);
router.get("/exercises/random", ExerciseAPI.getExercisesForRandomWorkout)
router.get(
  "/exercises/:primaryMuscleGroup",
  ExerciseAPI.fetchExercisesByMuscleGroup
);
router.get("/exercises/id/:exerciseID", ExerciseAPI.fetchExerciseByExerciseId);

router.post("/exercises", ExerciseAPI.addExercise);

//User Specific
router.post("/users/initializeUser/:userID", UserSpecificAPI.initializeUser);
router.get("/users", UserSpecificAPI.fetchAllUsers);
router.get("/users/:userID/userSchedule", UserSpecificAPI.fetchUserSchedule);
router.get("/workouts/users/:userIDs", UserSpecificAPI.fetchWorkoutsByUserId);
router.get(
  "/completedWorkouts/users/:userIDs",
  UserSpecificAPI.fetchCompletedWorkoutsByUserId
);

//User Messaging
router.post("/users/messages", UserInboxAPI.createMessage);
router.get("/users/inbox/:userID", UserInboxAPI.fetchInboxMessagesByUser);
router.put("/users/messages/:messageID", UserInboxAPI.updateMessage);
router.delete("/users/messages/:messageID", UserInboxAPI.deleteMessage);

//FRIENDS
router.get("/users/friends/data", UserSpecificAPI.fetchUserFriendsData);
router.get("/users/friends/:userID", UserSpecificAPI.fetchUserFriends);
router.put("/users/friends/add/:userID", UserSpecificAPI.addUserFriends);
router.put("/users/friends/remove/:userID", UserSpecificAPI.removeUserFriends);

//SCHEDULE
router.post("/users/:userID/userSchedule", UserSpecificAPI.createUserSchedule);
router.put("/users/:userID/complete/UserSchedule", UserSpecificAPI.updateUserScheduleAsComplete)
router.put("/users/:userID/userSchedule", UserSpecificAPI.updateUserSchedule);

//BIOMETRICS
router.get("/users/:userID/biometrics/weights", UserSpecificAPI.getUserWeights);
router.get("/users/:userID/biometrics/targetWeights", UserSpecificAPI.getUserTargetWeights);
router.get("/users/:userID/biometrics/birthday", UserSpecificAPI.getUserBirthday);
router.get("/users/:userID/biometrics/heights", UserSpecificAPI.getUserHeight)
router.put("/users/:userID/biometrics/weights", UserSpecificAPI.addUserWeight);
router.put("/users/:userID/biometrics/targetWeights", UserSpecificAPI.addUserTargetWeight);
router.put("/users/:userID/biometrics/birthday", UserSpecificAPI.addUserBirthday);
router.put("/users/:userID/biometrics/heights", UserSpecificAPI.addUserHeight)


module.exports = router;
