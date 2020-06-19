let mongoose = require("mongoose");
let roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meetingID: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
let Room = mongoose.model("Room", roomSchema);
module.exports = Room;