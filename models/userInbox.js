const mongoose = require('mongoose'); 

const userInboxSchema = mongoose.Schema({
    userID: String,
    userName: String,
    friendRequests: {
        type: Array 
    },
    

})
module.exports = mongoose.model("UserInbox", userInboxSchema)