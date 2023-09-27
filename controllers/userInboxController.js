const UserInbox = require("../models/userInbox");

module.exports = class UserInboxAPI {
  static async createMessage(req, res) {
    const newMessage = req.body;
    try {
      await UserInbox.create(newMessage);
      res
        .status(201)
        .json({ message: "New Message Created Successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Get messages for a specific user's inbox
  static async getInboxMessages(userID) {
    try {
      const messages = await UserInbox.find({ receiverUserID: userID }).sort({
        timeStamp: -1,
      });
      return messages;
    } catch (error) {
      throw error;
    }
  }

  // Update a message (for example, mark it as read)
  static async updateMessage(messageID, updates) {
    try {
      const updatedMessage = await UserInbox.findByIdAndUpdate(
        messageID,
        updates,
        { new: true }
      );
      return updatedMessage;
    } catch (error) {
      throw error;
    }
  }

  // Delete a message
  static async deleteMessage(messageID) {
    try {
      const deletedMessage = await UserInbox.findByIdAndDelete(messageID);
      return deletedMessage;
    } catch (error) {
      throw error;
    }
  }
};
