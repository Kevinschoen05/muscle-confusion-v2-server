const UserInbox = require("../models/userInbox");

module.exports = class UserInboxAPI {
   static async createMessage(senderUserID, receiverUserID, messageType, content) {
        try {
            const newMessage = new Message({
                senderUserID,
                receiverUserID,
                messageType,
                content
            });
    
            const savedMessage = await newMessage.save();
            return savedMessage;
        } catch (error) {
            throw error;
        }
    }
    
    // Get messages for a specific user's inbox
    static async  getInboxMessages(userID) {
        try {
            const messages = await Message.find({ receiverUserID: userID }).sort({ timeStamp: -1 });
            return messages;
        } catch (error) {
            throw error;
        }
    }
    
    // Update a message (for example, mark it as read)
    static async  updateMessage(messageID, updates) {
        try {
            const updatedMessage = await Message.findByIdAndUpdate(messageID, updates, { new: true });
            return updatedMessage;
        } catch (error) {
            throw error;
        }
    }
    
    // Delete a message
    static async  deleteMessage(messageID) {
        try {
            const deletedMessage = await Message.findByIdAndDelete(messageID);
            return deletedMessage;
        } catch (error) {
            throw error;
        }
    }
    

}
