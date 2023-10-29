const MatchupWorkout = require("../models/MatchupWorkouts");

module.exports = class MatchupWorkoutAPI {
  static async createMatchupWorkout(req, res) {
    const newWorkout = req.body;
    try {
      await MatchupWorkout.create(newWorkout);
      res
        .status(201)
        .json({ message: "New Matchup Message Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
};
