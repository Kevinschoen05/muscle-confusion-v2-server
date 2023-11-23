const MatchupWorkout = require("../models/MatchupWorkouts");

module.exports = class MatchupWorkoutAPI {
  static async createMatchupWorkout(req, res) {
    const newWorkout = req.body;
    try {
      const createdWorkout = await MatchupWorkout.create(newWorkout);
      res
        .status(201)
        .json({
          message: "New Matchup Message Created Successfully",
          _id: createdWorkout._id,
        });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getMatchupWorkoutByMatchupWorkoutId(req, res) {
    const matchupWorkoutID = req.params.matchupWorkoutID;
    try {
      const matchupWorkout = await MatchupWorkout.find({
        _id: ObjectId(matchupWorkoutID),
      });
      if (matchupWorkout) {
        res.status(200).json(matchupWorkout);
      } else {
        res.status(404).json({ message: "Matchup workout not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getMatchupWorkoutsByUserID(req, res) {
    const userIds = req.params.userIDs.split(","); // Assuming userIDs are comma-separated in the request params
    try {
      const userMatchupWorkouts = await MatchupWorkout.find({
        userWorkoutData: {
          $elemMatch: { userID: { $in: userIds } },
        },
      });
      res.status(200).json(userMatchupWorkouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};


