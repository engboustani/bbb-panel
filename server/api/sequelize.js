const { Sequelize } = require('sequelize');
const consola = require('consola');
require('dotenv').config();


const sequelize = new Sequelize(process.env.SQLDB, process.env.SQLUSER, process.env.SQLPASS, {
    host: process.env.SQLADDR,
    dialect: 'mssql',
    port: process.env.SQLPORT
});
sequelize.authenticate().then(() => {
    consola.info("SQL is connected");
}).catch(err => {
    consola.error({ database_error: err });
});

const db = {};

const attendance = require("./model/Attendance.js")(sequelize, Sequelize);
db[attendance.name] = attendance.schema;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;