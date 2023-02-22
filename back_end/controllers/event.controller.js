// create functions to control event table here

const db = require("../models");
const Event = db.events;

exports.deleteMe = (req, res) => {
    console.log("in delete me")
    res.json({
        test: "passed"
    })
}

exports.create = (req, res) => {
    // TODO: upload new event metadata, return new cid to front end
    console.log("in create")
    console.log(req['body'])



    res.json({
        cid: "insert cid here"
    })
};
