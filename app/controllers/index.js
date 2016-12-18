/**
 * @description
 * Route example
 */

"use strict";

let express = require("express")
    , app = express()
    , PouchDB = require('pouchdb')
    , db = new PouchDB('pouchdb_database');

app.post("/", (req, res) => {
    let user = req.body.user;

    // Update offline database
    db.put({
        "_id" : user.email
        , "user": user
    }, (err, result) => {
        console.log(err);
        console.log(result);
    });

    db.changes().on('change', function () {
        console.log('Ch-Ch-Changes');
    });

    db.replicate.to('http://localhost:3000/replicate');

    // Success message
    let data = {
        "msg": "OK"
        , "success": true
    };

    res.json(data);
});

app.get("/replicate", (req, res) => {

    console.log('Replicate dough');
    db.allDocs({include_docs: true, descending: true}, function (err, doc) {
        // res.json(doc);
        console.log(doc);
    });

});

module.exports = app;
