let mongoose = require("mongoose");
//let UUID = require('uuid-js');
const consola = require('consola');
let axios = require("axios");
var parser = require('fast-xml-parser');
var he = require('he');
import { BigBlueButtonApi } from '../controller/bigbluebutton';
const attendanceSchema = require('../model/Attendance').attendanceSchema;
require('dotenv').config()


let meetingSchema = mongoose.Schema({
    meetingID: {
        type: String,
        required: true
    },
    persentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    attendances: [attendanceSchema],
    recorded: {
        type: Boolean,
        default: false
    },
    returncode: {
        type: String,
        default: ''
    },
    internalMeetingID: {
        type: String,
        default: ''
    },
    parentMeetingID: {
        type: String
    },
    attendeePW: {
        type: String
    },
    moderatorPW: {
        type: String
    },
    createTime: {
        type: Date
    },
    voiceBridge: {
        type: Number
    },
    duration: {
        type: Number
    },
    maxParticipants: {
        type: Number
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    created: {
        type: Date,
        default: Date.now()
    }
});

meetingSchema.post('save', function(doc, next) {
    if (doc.returncode == '') {
        newMeeting(doc);
    }
    next();
});

let newMeeting = async(doc) => {
    doc.populated('parent');
    consola.info(doc);
    let xmloptions = {
        attributeNamePrefix: "@_",
        attrNodeName: "attr", //default is 'false'
        textNodeName: "#text",
        ignoreAttributes: true,
        ignoreNameSpace: false,
        allowBooleanAttributes: false,
        parseNodeValue: true,
        parseAttributeValue: false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
        parseTrueNumberOnly: false,
        arrayMode: false, //"strict"
        attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }), //default is a=>a
        tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
        stopNodes: ["parse-me-as-string"]
    };
    let params = {
        name: doc.parent.name,
        meetingID: doc.meetingID,
        moderatorPW: "persentor",
        attendeePW: "observer",
        welcome: doc.parent.description,
        logoutURL: `https://panel.big-blue.ir/endroom/${doc.parent.meetingID}`,
        maxParticipants: doc.maxParticipants,
        record: doc.parent.recordOption,
        duration: doc.duration,
        autoStartRecording: true,
        allowStartStopRecording: false,
        webcamsOnlyForModerator: true
    }
    let api = new BigBlueButtonApi(process.env.BBBSERVER, process.env.BBBSECRET);
    let url = api.urlFor('create', params);
    consola.info(url);
    axios.post(url).then(async(response) => {
            if (parser.validate(response.data) === true) { //optional (it'll return an object in case it's not valid)
                var jsonObj = parser.parse(response.data, xmloptions);
                doc.returncode = jsonObj.response.returncode;
                doc.internalMeetingID = jsonObj.response.internalMeetingID;
                doc.parentMeetingID = jsonObj.response.parentMeetingID;
                doc.attendeePW = jsonObj.response.attendeePW;
                doc.moderatorPW = jsonObj.response.moderatorPW;
                doc.createTime = jsonObj.response.createTime;
                doc.voiceBridge = jsonObj.response.voiceBridge;
                doc.duration = jsonObj.response.duration;
                let newDoc = await doc.save();
                consola.info(newDoc);
            }
        })
        .catch(function(error) {
            consola.error(error);
        });
}
let Meeting = mongoose.model("Meeting", meetingSchema);
module.exports = { Meeting, meetingSchema };