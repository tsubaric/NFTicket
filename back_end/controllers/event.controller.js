// create functions to control event table here

const db = require("../models");
const Event = db.events;

const { ethers } = require("ethers");

exports.create = (req, res) => {
    // TODO: upload new event metadata, return new cid to front end
    console.log("in create")
    console.log(req['body'])


    // upload eventId.json file to ipfs -> return cid



    res.json({
        cid: "insert cid here"
    })
};
