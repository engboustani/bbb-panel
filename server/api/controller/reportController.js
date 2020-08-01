let mongoose = require("mongoose");
const Attendance = require("../model/Attendance").Attendance;
const Meeting = require("../model/Meeting").Meeting;
require('dotenv').config()


exports.getReport = async(req, res) => {
    try {
        let attendance = await Attendance.find().sort({ created: -1 }).limit(5).populate({
            path: 'meeting',
            select: 'parent',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: { path: 'parent', select: 'name' }
        });
        let meetings = await Meeting.find().sort({ created: -1 }).limit(5).populate('parent', 'name');
        res.status(200).json({ attendance, meetings });
    } catch (err) {
        res.status(500).json(err);
    }
};