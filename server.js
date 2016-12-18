/**
 * @description
 * TODO
 */

'use strict';

let express = require("express")
    , app = express()
    , bodyParser = require("body-parser")
    , port = 3000
    , morgan = require('morgan');

// logs
app.use(morgan('dev'));

// cors stuff
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.options('*', function (req, res) {
    res.send(200);
});

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

// controllers
app.use(require('./app/controllers'));

app.listen(port, () => {
    console.log("Server running on port 3000");
});
