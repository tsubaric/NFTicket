module.exports = app => {
  const events = require("../controllers/event.controller.js");

  app.get("/delete-me", events.deleteMe);

  app.post("/create", events.create);
};
