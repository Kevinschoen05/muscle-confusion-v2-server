const MatchupWorkout = require("../models/MatchupWorkouts");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class MatchupWorkoutAPI {
  static async createMatchupWorkout(req, res) {
    const newWorkout = req.body;
    try {
      const createdWorkout = await MatchupWorkout.create(newWorkout);
      res.status(201).json({
        message: "New Matchup Message Created Successfully",
        _id: createdWorkout._id,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateMatchupWorkout(req, res) {
    try {
      const {
        matchupWorkoutID,
        userID,
        totalVolume,
        completionDate,
        workoutDuration,
        completedExercises,
      } = req.body;

      // Find the document by matchupWorkoutID and update the specific user's data
      await MatchupWorkout.updateOne(
        {
          _id: matchupWorkoutID,
          "userWorkoutData.userID": userID,
        },
        {
          $set: {
            "userWorkoutData.$.totalVolume": totalVolume,
            "userWorkoutData.$.completionDate": completionDate,
            "userWorkoutData.$.workoutDuration": workoutDuration,
            "userWorkoutData.$.exercises": completedExercises,
          },
        }
      );

      res.status(200).send("Workout data updated successfully");
    } catch (error) {
      res.status(500).send("Error updating workout data: " + error.message);
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
    const userIds = req.params.userIDs.split(",");
    const pendingUserWorkout = req.query.pendingUserWorkout === "true";

    let query = {};

    if (pendingUserWorkout) {
      // Fetch documents where the completionDate for the specific userID is blank
      query = {
        userWorkoutData: {
          $elemMatch: {
            userID: { $in: userIds },
            $or: [
              { completionDate: { $exists: false } },
              { completionDate: null },
            ],
          },
        },
      };
    } else {
      // Fetch documents where the completionDate for the specific userID is populated
      query = {
        userWorkoutData: {
          $elemMatch: {
            userID: { $in: userIds },
            completionDate: { $exists: true, $ne: null },
          },
        },
      };
    }

    try {
      const userMatchupWorkouts = await MatchupWorkout.find(query);
      res.status(200).json(userMatchupWorkouts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
