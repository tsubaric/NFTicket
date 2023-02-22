// create functions to control event table here

const db = require("../models");
const Event = db.events;

exports.create = (req, res) => {
    // TODO: upload new event metadata, return new cid to front end
    console.log("in create")
    console.log(req['body'])

    // create event with contract -> return event id


    // upload eventId.json file to ipfs -> return cid



    res.json({
        cid: "insert cid here"
    })
};
