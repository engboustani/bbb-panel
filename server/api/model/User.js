const mongoose = require("mongoose");
const consola = require('consola');
const bcrypt = require('bcrypt');
let UUID = require('uuid-js');
//require('dotenv').config()

let userSchema = mongoose.Schema({
    UID: {
        type: String,
        unique: true,
        default: UUID.create()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        // set: toHash,
    },
    fullname: {
        type: String,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

async function toHash(password) {
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    await bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            consola.error(err);
        }
        password = hash;
    });

    return password;
}

//We'll use this later on to make sure that the user trying to log in has the correct credentials
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

let UserSQL = (sequelize, type) => {
    return sequelize.define('blog', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: type.STRING
    })
}

let User = mongoose.model("User", userSchema);

module.exports = { User, userSchema, UserSQL };