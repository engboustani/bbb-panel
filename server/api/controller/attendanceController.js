let mongoose = require("mongoose");
const Attendance = require("../model/Attendance").Attendance;
require('dotenv').config()


exports.createGuest = async(params) => {
    try {
        const attendance = new Attendance({
            meetingID: params.meetingID,
            name: params.name,
        });
        await attendance.save(function(err) {
            if (err) return err;
        })
        return attendance;
    } catch (err) {
        return err;
    }
}

exports.getAllAttendances = async(req, res) => {
    try {
        let attendance = await Attendance.find().sort({ created: -1 });
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json(err);
    }
};