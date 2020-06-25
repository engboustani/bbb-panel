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
    description: {
        type: String
    },
    observerLimit: {
        type: Number,
        default: 30
    },
    recordOption: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
});
let Room = mongoose.model("Room", roomSchema);
module.exports = Room;