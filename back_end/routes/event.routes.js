module.exports = app => {
  const events = require("../controllers/event.controller.js");

  app.post("/create", events.create);
};
