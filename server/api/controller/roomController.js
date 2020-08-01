let mongoose = require("mongoose");
const Room = require("../model/Room");
let Meeting = require("../model/Meeting").Meeting;
let UUID = require('uuid-js');
const consola = require('consola');
let axios = require("axios");
let convert = require('xml-js');
var parser = require('fast-xml-parser');
var he = require('he');
const attendanceController = require('../controller/attendanceController');
const meetingController = require('../controller/meetingController');
require('dotenv').config()


import { BigBlueButtonApi } from './bigbluebutton';

exports.getAllRooms = async(req, res) => {
    try {
        let room = await Room.find().sort({ created: -1 });
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
exports.getRoomMeetings = async(req, res) => {
    try {
        const id = req.params.meetingID;
        let room = await Room.findOne({ meetingID: id }).populate('meetings');
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


        await room.save(async function(err) {
            if (err) return handleError(err);

            uuid = UUID.create();

            let meeting = new Meeting({
                meetingID: uuid,
                recorded: room.recordOption,
                parent: room._id
            })
            await meeting.save(async function(err) {
                if (err) return handleError(err);
                room.meetings.push(meeting._id);
                await room.save();
            });
        });

        res.status(200).json({ data: room });
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
exports.joinGuest = async(req, res) => {
    try {
        const id = req.body.meetingID;
        let room = await Room.findOne({ meetingID: id });
        if (!room)
            res.status(500).json({ error: 'not found room' });
        const meeting = meetingController.getRunMeeting(room.meetingID);
        if (meeting !== null)
            meetingController.create({
                room,
                maxParticipants: 50,
                duration: 60
            })

        let params = {
            fullName: req.body.fullname,
            meetingID: room.meetingID,
            password: req.body.type
        }
        attendanceController.createGuest({
            meetingID: room._id,
            name: req.body.fullname
        });

        let api = new BigBlueButtonApi(process.env.BBBSERVER, process.env.BBBSECRET);
        const url = api.urlFor('join', params);
        consola.info(url);
        res.status(200).json({ url: url });
    } catch (err) {
        res.status(500).json(err);
        consola.error(err);
    }

}

exports.joinPersentor = async(req, res) => {
    try {
        const id = req.body.meetingID;
        let room = await Room.findOne({ meetingID: id });
        let status = "";
        let api = new BigBlueButtonApi(process.env.BBBSERVER, process.env.BBBSECRET);
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
                            if (req.body.type == 'observer') {
                                attendanceController.createGuest({
                                    meetingID: room._id,
                                    name: req.body.fullname
                                });
                            }
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