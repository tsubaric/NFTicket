module.exports = app => {
  const events = require("../controllers/event.controller.js");

  var router = require("express").Router();

  app.get("/create", events.deleteMe);
};
