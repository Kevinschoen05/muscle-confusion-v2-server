const User = require("../models/user");
const CompletedWorkout = require("../models/completedWorkouts");
const Workout = require("../models/workouts");

module.exports = class UserSpecificAPI {
  static async initializeUser(req, res) {
    const userID = req.params.userID;
    const userName = req.body.userName;

    console.log(`Request body: ${JSON.stringify(req.body)}`);
    console.log(`userName value: ${userName}`);

    const newUser = {
      userID: userID,
      userName: userName,
      totalVolume: 0,
      workoutStreak: 0,
      friends: [],
      schedule: [],
      inbox: [],
    };

    console.log(newUser);
    try {
      const result = await User.create(newUser);
      res.status(200).json(`User ${userID} created! body: ${userName} `);
    } catch (err) {
      res.status(404).json(`Error creating user ${userID}: ${err}`);
    }
  }

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
      const userData = await User.find({
        userID: user,
      });

      let response = userData;
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async createUserSchedule(req, res) {
    const userSchedule = req.body;
    try {
      await User.create(userSchedule);
      res.status(201).json({ message: "User Schedule Created Successfully" });
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
          userID: user,
        },
        { $set: { schedule: updatedSchedule } }
      );
      res.status(200).json({ message: "Schedule Updated Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  //USER FRIENDS

  static async fetchUserFriends(req, res) {
    const user = req.params.userID;
    try {
      const userData = await User.find({
        userID: user,
      });

      let response = userData;
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async addUserFriends(req, res) {
    const newFriends = req.body.newFriends;
    const user = req.params.userID;
    try {
      await User.findOneAndUpdate(
        {
          userID: user,
        },
        { $push: { friends: newFriends } }
      );
      res.status(200).json({ message: "Friends List Updated Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async removeUserFriends(req, res) {
    const removeFriends = req.body.removeFriends;
    const user = req.params.userID;
    try {
      await User.findOneAndUpdate(
        {
          userID: user,
        },
        { $pull: { friends: removeFriends } }
      );
      res.status(200).json({ message: "Friends List Updated Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
