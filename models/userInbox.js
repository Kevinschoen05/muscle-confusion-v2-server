const mongoose = require('mongoose'); 

const userInboxSchema = mongoose.Schema({
    userID: String,
    userName: String,
    senderUserID: String, 
    senderUserName: String,
    messageType: String, 
    timeStamp: { type: Date, default: Date.now },


})
module.exports = mongoose.model("UserInbox", userInboxSchema)