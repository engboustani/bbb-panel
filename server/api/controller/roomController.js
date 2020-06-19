let mongoose = require("mongoose");
const Room = require("../model/Room");
let UUID = require('uuid-js');
const consola = require('consola');
let axios = require("axios");
let convert = require('xml-js');

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
        let uuid = UUID.create();
        let bbb = {};
        const room = new Room({
            name: "req.body.name",
            meetingID: uuid,
        });

        let newRoom = await room.save();

        let params = {
            meetingID: uuid,
            moderatorPW: "persentor",
            attendeePW: "observer"
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
        let params = {
            fullName: req.body.fullname,
            meetingID: room.meetingID,
            password: "persentor"
        }
        var bbb;
        let api = new BigBlueButtonApi('https://server1.big-blue.ir/bigbluebutton/api', 'SrXT3AxNqnAPovMP3YGsmdQaiN6iyBnrYEVRFBhY');
        let url = api.urlFor('join', params);
        res.status(200).json({ url: url });
    } catch (err) {
        res.status(500).json(err);
        consola.error(err);
    }
};