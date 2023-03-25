const User = require("../models/user");
const CompletedWorkout = require("../models/completedWorkouts")
const Workout = require("../models/workouts")

module.exports = class UserSpecificAPI {
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
          const userSchedule = await User.find({
            userID: user
          }
          );
    
          let response = userSchedule.schedule
          res.status(200).json(response);
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
      }
    
      static async createUserSchedule(req, res) {
        const userSchedule = req.body;
        try {
          await User.create(userSchedule);
          res
            .status(201)
            .json({ message: "User Schedule Created Successfully" });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    
      static async updateUserSchedule(req, res) {
        const updatedSchedule = req.body.schedule;
        const user = req.body.user;
        try {
          await User.findOneAndUpdate(
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
}