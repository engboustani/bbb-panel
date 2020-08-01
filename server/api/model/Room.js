let mongoose = require("mongoose");
let meetingSchema = require("./Meeting").meetingSchema;

let roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    meetingID: {
        type: String,
        required: true,
        unique: true
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
    meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }],
    created: {
        type: Date,
        default: Date.now()
    }
});
let Room = mongoose.model("Room", roomSchema);
module.exports = Room;