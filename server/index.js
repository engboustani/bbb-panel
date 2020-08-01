const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { localSignup, localLogin, jwtStrategy, jwtUser } = require("./api/passport");
//const sql = require("./api/sequelize");
require('dotenv').config();

const app = express()

//global.SQLDB = sql

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production'

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, { useNewUrlParser: true })
    .then(() => {
        consola.info("Mongo is connected");
    })
    .catch(err => {
        consola.error({ database_error: err });
    });

passport.use('signup', localSignup);
passport.use('login', localLogin);
passport.use(jwtStrategy);
passport.use(jwtUser);


async function start() {
    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    await nuxt.ready()
        // Build only in dev mode
    if (config.dev) {
        const builder = new Builder(nuxt)
        await builder.build()
    }

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(passport.initialize());

    // Give nuxt middleware to express
    app.use(nuxt.render)

    //await sql.sequelize.sync();



    // Listen the server
    app.listen(port, host)


    consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
    })
}
start()