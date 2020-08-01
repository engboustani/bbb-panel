let mongoose = require("mongoose");


let attendanceSchema = mongoose.Schema({
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    type: {
        type: Number,
        default: 0 //0: guest, 1: observer, 2: persentor
    },
    name: { type: String, default: '' },
    created: {
        type: Date,
        default: Date.now()
    }
});

let Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = { Attendance, attendanceSchema };

// module.exports = (sequelize, DataTypes) => {
//     let Attendance = sequelize.define("attendance", {
//         id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         meeting: { type: DataTypes.STRING, defaultValue: '' },
//         user: { type: DataTypes.STRING, defaultValue: '' },
//         type: { type: DataTypes.INTEGER, defaultValue: 0 }, //0: guest, 1: observer, 2: persentor
//         name: { type: DataTypes.STRING },
//     });

//     return { name: 'Attendance', schema: Attendance };
// };