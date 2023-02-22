const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type -- application/json
app.use(express.json());

// parse requests of content-type -- application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true }));


// TODO: sync with db
/*
const db = require("./app/models");
db.sequelize.sync({force: true}).then(() => {
  console.log("drop and re-sync db");
});

*/



// simple route to ping server
app.get(
    "/",
    (req, res) => {
        console.log("server lives")
        res.json({
            test: "passed"
    })
});

// include the routes
require("./routes/event.routes")(app);

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
