const mongoose = require('mongoose'); 

const userInboxSchema = mongoose.Schema({
    receiverUserID: String,
    receiverUserName: String,
    senderUserID: String, 
    senderUserName: String,
    messageType: String, 
    messageContent: String,
    messageRead: Boolean,
    messageAccepted: Boolean,
    timeStamp: { type: Date, default: Date.now },


})
module.exports = mongoose.model("UserInbox", userInboxSchema)