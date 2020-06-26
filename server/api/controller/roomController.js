let mongoose = require("mongoose");
const Room = require("../model/Room");
let UUID = require('uuid-js');
const consola = require('consola');
let axios = require("axios");
let convert = require('xml-js');
var parser = require('fast-xml-parser');
var he = require('he');

import { BigBlueButtonApi } from './bigbluebutton';

exports.getAllRooms = async(req, res) => {
    try {
        let room = await Room.find();
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
        consola.error(err);
    }
};
exports.getRoom = async(req, res) => {
    try {
        const id = req.params.meetingID;
        let room = await Room.findOne({ meetingID: id });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
        consola.error(err);
    }
};
exports.addNewRoom = async(req, res) => {
    try {
        let data = req.body;
        let uuid = UUID.create();
        let bbb = {};
        const room = new Room({
            name: data.name,
            meetingID: uuid,
            description: data.description,
            observerLimit: data.observer_limit,
            recordOption: data.record_option
        });

        let newRoom = await room.save();

        let params = {
            name: newRoom.name,
            meetingID: uuid,
            moderatorPW: "persentor",
            attendeePW: "observer",
            welcome: newRoom.description,
            //logoutURL: `http://127.0.0.1:4000/endroom/${room.meetingID}`,
            logoutURL: `https://panel.big-blue.ir/endroom/${room.meetingID}`,
            maxParticipants: newRoom.observerLimit,
            record: newRoom.recordOption,
            autoStartRecording: true,
            allowStartStopRecording: false,
            webcamsOnlyForModerator: true
        }
        let api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
        let url = api.urlFor('create', params);
        consola.info(url);
        axios.post(url).then(function(response) {
                bbb = convert.xml2json(response.data, { compact: true, spaces: 4 });
                consola.error(bbb);
            })
            .catch(function(error) {
                consola.error(error);
            });

        res.status(200).json({ data: newRoom, bbb: bbb });
    } catch (err) {
        res.status(500).json({ error: err });
        consola.error(err);
        consola.info(req.body.name);
    }
};
exports.updateRoom = async(req, res) => {
    try {
        const id = req.params.roomId;
        let data = req.body;
        let room = await Room.updateOne({ meetingID: id }, {
            name: data.name,
            description: data.description,
            observerLimit: data.observer_limit,
            recordOption: data.record_option
        });
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.deleteRoom = async(req, res) => {
    try {
        const id = req.params.roomId;
        let result = await Room.remove({ _id: id });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
exports.joinPersentor = async(req, res) => {
    try {
        const id = req.body.meetingID;
        let room = await Room.findOne({ meetingID: id });
        let status = "";
        let params = {
            meetingID: room.meetingID,
        }
        var options = {
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

        let api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
        let url = api.urlFor('getMeetingInfo', params);
        consola.info(url);
        axios.get(url).then(function(response) {
                //var bbb = convert.xml2json(response.data, { compact: true, spaces: 4 });

                if (parser.validate(response.data) === true) { //optional (it'll return an object in case it's not valid)
                    var jsonObj = parser.parse(response.data, options);
                    consola.info(jsonObj);
                    status = jsonObj.response.returncode;
                } else {
                    status = response.data.response.returncode;
                }

                if (status == 'FAILED') {
                    params = {
                        name: room.name,
                        meetingID: room.meetingID,
                        moderatorPW: "persentor",
                        attendeePW: "observer",
                        welcome: room.description,
                        //logoutURL: `http://127.0.0.1:4000/endroom/${room.meetingID}`,
                        logoutURL: `https://panel.big-blue.ir/endroom/${room.meetingID}`,
                        maxParticipants: room.observerLimit,
                        record: room.recordOption,
                        autoStartRecording: 1,
                        allowStartStopRecording: 0,
                        webcamsOnlyForModerator: 1
                    }
                    api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
                    url = api.urlFor('create', params);
                    consola.info(url);
                    axios.post(url).then(function(response) {
                            if (parser.validate(response.data) === true) { //optional (it'll return an object in case it's not valid)
                                var bbb = parser.parse(response.data, options);
                            }
                            //var bbb = convert.xml2json(response.data, { compact: true, spaces: 4 });
                            params = {
                                fullName: req.body.fullname,
                                meetingID: room.meetingID,
                                password: req.body.type
                            }
                            api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
                            url = api.urlFor('join', params);
                            consola.info(url);
                            res.status(200).json({ url: url });
                            consola.info(bbb);
                        })
                        .catch(function(error) {
                            res.status(500).json(error);
                            consola.error(error);
                        });
                } else {
                    params = {
                        fullName: req.body.fullname,
                        meetingID: room.meetingID,
                        password: req.body.type
                    }
                    api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
                    url = api.urlFor('join', params);
                    res.status(200).json({ url: url });
                }


                //consola.info(bbb);
            })
            .catch(function(error) {
                res.status(500).json(error);
                consola.error(error);
            });
    } catch (err) {
        res.status(500).json(err);
        consola.error(err);
    }
};

function create(params) {

};