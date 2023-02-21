const express = require("express");
const router = express.Router();
console.log(router);
const pool = require("../config/db.js");
let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "senior-design-mttj.cb4kadb1h8mb.us-east-2.rds.amazonaws.com",
  user: "GeekSquad",
  password: "MarkIsTheGoat",
  database: "NFTicket",
  multipleStatements: true,
});
// const reqs = JSON.parse(window.localStorage.getItem("requests"));
// const reps = JSON.parse(window.localStorage.getItem("pledges"));

router.get("/users", async (req, res) => {
  console.log("here");
  pool.getConnection((err, conn) => {
    if (err) throw err;
    try {
      const query = `SELECT u.username, u.bigpeen FROM test_table as u`;
      conn.query(query, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
    } catch (err) {
      console.log(err);
      res.end();
    }
  });
});

// router.post("/addUser", async (req, res) => {
//   const email = req.body.uname;
//   const first = req.body.fName;
//   const last = req.body.lName;
//   const pass = req.body.pass;
//   const country = req.body.country;
//   const address = req.body.address;
//   const city = req.body.city;
//   const userType = req.body.userType;
//   const userId = 1;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `INSERT INTO users(email,firstname,lastname, password, userType, country, city, address) VALUES(?,?,?,?,?,?,?,?)`;
//     conn.query(
//       qry,
//       [email, first, last, pass, userType, country, city, address],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log("User added!");
//       }
//     );
//     res.redirect("/");
//     res.end();
//   });
// });
// router.post("/addEvent", async (req, res) => {
//   const evName = req.body.evName;
//   const evCountry = req.body.evCountry;
//   const evState = req.body.evState;
//   const evZip = req.body.evZip;
//   const evStart = req.body.evStart;
//   const evEnd = req.body.evEnd;
//   // const first = req.body.fName;
//   // const last = req.body.lName;
//   // const pass = req.body.pass;
//   // const country = req.body.country;
//   // const address = req.body.address;
//   // const city = req.body.city;
//   // const userType = req.body.userType;
//   // const userId = 1;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `INSERT INTO events(eventName, eventCountry, eventState, eventZip, startDate, endDate) VALUES(?,?,?,?,?,?)`;
//     conn.query(
//       qry,
//       [evName, evCountry, evState, evZip, evStart, evEnd],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log("Event added!");
//       }
//     );
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.get("/events", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     try {
//       const query = `SELECT u.eventName, u.eventCountry, u.eventState, u.eventZip, u.startDate, u.endDate FROM events as u`;
//       conn.query(query, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch (err) {
//       console.log(err);
//       res.end();
//     }
//   });
// });

router.post("/addItem", async (req, res) => {
  // const itemName = "test";
  // const first = req.body.fName;
  // const last = req.body.lName;
  // const pass = req.body.pass;
  // const country = req.body.country;
  // const address = req.body.address;
  // const city = req.body.city;
  // const userType = req.body.userType;
  // const userId = 1;
  pool.getConnection((err, conn) => {
    if (err) throw err;
    const qry = `INSERT INTO test_table(username, bigpeen) VALUES(?,?)`;
    conn.query(qry, ["test", "test"], (err, result) => {
      conn.release();
      if (err) throw err;
      console.log("Item added!");
    });
    res.redirect("/Services");
    res.end();
  });
});

// router.get("/items", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     try {
//       const query = `SELECT u.itemName FROM items as u`;
//       conn.query(query, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch (err) {
//       console.log(err);
//       res.end();
//     }
//   });
// });

// router.post("/deleteItem", async (req, res) => {
//   const itemName = req.body.selectedItem;
//   // const first = req.body.fName;
//   // const last = req.body.lName;
//   // const pass = req.body.pass;
//   // const country = req.body.country;
//   // const address = req.body.address;
//   // const city = req.body.city;
//   // const userType = req.body.userType;
//   // const userId = 1;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `DELETE FROM items WHERE itemName = ?`;
//     conn.query(qry, [itemName], (err, result) => {
//       conn.release();
//       if (err) throw err;
//       console.log("Item Deleted!");
//     });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.post("/updateItem", async (req, res) => {
//   const itemName = req.body.selectedItem;
//   const updateName = req.body.updateItem;
//   // const first = req.body.fName;
//   // const last = req.body.lName;
//   // const pass = req.body.pass;
//   // const country = req.body.country;
//   // const address = req.body.address;
//   // const city = req.body.city;
//   // const userType = req.body.userType;
//   // const userId = 1;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE items SET itemName = ? WHERE itemName = ?`;
//     conn.query(qry, [updateName, itemName], (err, result) => {
//       conn.release();
//       if (err) throw err;
//       console.log("Item Updated!");
//     });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.post("/createReq", async (req, res) => {
//   const eventName = req.body.selectedEvent;
//   const itemName = req.body.selectedItem;
//   const numReq = req.body.numRequested;
//   const isActive = "Active";
//   const recipEmail = req.body.emailOfRecip;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `INSERT INTO requests(eventReq, itemReq, numReq, compReq, recipEmail) VALUES(?,?,?,?,?)`;
//     conn.query(
//       qry,
//       [eventName, itemName, numReq, isActive, recipEmail],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log("Item Created!");
//       }
//     );
//     res.redirect("/Services");
//     res.end();
//     // }
//   });
// });

// router.get("/requests", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     try {
//       const query = `SELECT u.eventReq, u.itemReq, u.numReq, u.compReq, u.recipEmail FROM requests as u`;
//       conn.query(query, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch (err) {
//       console.log(err);
//       res.end();
//     }
//   });
// });

// router.post("/createResp", async (req, res) => {
//   // const eventName = req.body.selectedEvent;
//   const email = req.body.emailOfDonor;
//   const itemName = req.body.selectedItem;
//   const numReq = req.body.numRequested;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `INSERT INTO pledges(userEmail, itemDon, numDon, status) VALUES(?,?,?,?)`;
//     conn.query(qry, [email, itemName, numReq, "Offered"], (err, result) => {
//       conn.release();
//       if (err) throw err;
//       console.log("Item Created!");
//     });
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.get("/pledges", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     try {
//       const query = `SELECT u.userEmail, u.itemDon, u.numDon, u.status FROM pledges as u`;
//       conn.query(query, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch (err) {
//       console.log(err);
//       res.end();
//     }
//   });
// });

// router.post("/responses", async (req, res) => {
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const numReq = req.body.numRequested;
//   const email = req.body.emailOfDonor;
//   const recipEmail = req.body.emailOfRecip;
//   const status = "pending";
//   const numDon = req.body.numDon;
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `INSERT INTO responses(userEmail, eventName, itemName, numReq, recipEmail, status, numDon) VALUES(?,?,?,?,?,?,?)`;
//     conn.query(
//       qry,
//       [email, eventName, itemName, numReq, recipEmail, status, numDon],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log("Item Created!");
//       }
//     );
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.get("/getResponses", async (req, res) => {
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     try {
//       const query = `SELECT u.userEmail, u.eventName, u.itemName, u.numReq, u.recipEmail, u.numDon, u.status FROM responses as u`;
//       conn.query(query, (err, result) => {
//         conn.release();
//         if (err) throw err;
//         res.send(JSON.stringify(result));
//       });
//     } catch (err) {
//       console.log(err);
//       res.end();
//     }
//   });
// });

router.post("/approveResponses", async (req, res) => {
  connection.connect();
  // const eventName = req.body.respEvent;
  // const itemName = req.body.respItem;
  // const numReq = req.body.numReqAdmin;
  // const email = req.body.emailOfDonor;
  // const recipEmail = req.body.emailOfRecip;
  // const status = "Approved";
  // const numDon = req.body.numDon;
  // var reqStatus = "Active";
  // if (numReq - numDon === 0) {
  //   reqStatus = "Completed";
  // }
  const qry = `INSERT INTO test_table(username, bigpeen) VALUES(?,?)`;
  // const qry2 = `UPDATE requests SET compReq = ?, numReq = numReq - ? WHERE recipEmail = ?`;
  connection.query(qry, ["test", "test"], (err, result) => {
    if (err) throw err;
    // console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
  });
  // res.redirect("/Services");
  connection.end();
});

// router.post("/matchPledge", async (req, res) => {
//   connection.connect();
//   const eventName = req.body.matchRecipEvent;
//   const itemName = req.body.matchRecipItem;
//   const numReq = req.body.matchRecipQuant;
//   const email = req.body.matchDonorEmail;
//   const recipEmail = req.body.matchRecipEmail;
//   const status = "Matched";
//   const numDon = req.body.matchDonorQuant;
//   var reqStatus = "Active";
//   if (numReq - numDon === 0) {
//     reqStatus = "Completed";
//   }
//   const qry = `UPDATE pledges SET status = ? WHERE userEmail = ? AND itemDon = ? AND numDon = ?; UPDATE requests SET compReq = ?, numReq = numReq - ? WHERE recipEmail = ? AND eventReq = ? AND itemReq = ?`;
//   // const qry2 = `UPDATE requests SET compReq = ?, numReq = numReq - ? WHERE recipEmail = ?`;
//   connection.query(
//     qry,
//     [
//       status,
//       email,
//       itemName,
//       numDon,
//       reqStatus,
//       numReq,
//       recipEmail,
//       eventName,
//       itemName,
//     ],
//     (err, result) => {
//       if (err) throw err;
//       console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
//     }
//   );
//   res.redirect("/Services");
//   connection.end();
// });

// router.post("/shipResponses", async (req, res) => {
//   // connection.connect();
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const numReq = req.body.numReqAdmin;
//   const email = req.body.donorsEmail;
//   const recipEmail = req.body.emailOfRecip;
//   const status = "Shipped";
//   const numDon = req.body.numDon;
//   var reqStatus = "Active";
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE responses SET status = ? WHERE userEmail = ? AND eventName = ? AND itemName = ? AND numDon = ?`;
//     conn.query(
//       qry,
//       [status, email, eventName, itemName, numDon],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
//       }
//     );
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.post("/shipPledges", async (req, res) => {
//   // connection.connect();
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const numReq = req.body.numReqAdmin;
//   const email = req.body.donorsEmail;
//   const recipEmail = req.body.emailOfRecip;
//   const status = "Shipped";
//   const numDon = req.body.numDon;
//   var reqStatus = "Active";
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE pledges SET status = ? WHERE userEmail = ? AND itemDon = ? AND numDon = ?`;
//     conn.query(qry, [status, email, itemName, numDon], (err, result) => {
//       conn.release();
//       if (err) throw err;
//       console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
//     });
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/Services");
//     res.end();
//   });
// });

// router.post("/updateResponse", async (req, res) => {
//   // connection.connect();
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const numReq = req.body.numRequested;
//   const email = req.body.emailOfDonor;
//   const recipEmail = req.body.emailOfRecip;
//   const status = "Shipped";
//   const numDon = req.body.numDon;
//   var reqStatus = "Active";
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE responses SET numDon = ? WHERE userEmail = ? AND eventName = ? AND itemName = ? AND recipEmail = ?`;
//     conn.query(
//       qry,
//       [numDon, email, eventName, itemName, recipEmail],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
//       }
//     );
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/About");
//     res.end();
//   });
// });

// router.post("/updatePledge", async (req, res) => {
//   // connection.connect();
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const oldNumDon = req.body.oldNumDon;
//   const email = req.body.emailOfDonor;
//   const recipEmail = req.body.emailOfRecip;
//   const status = "Shipped";
//   const numDon = req.body.numDon;
//   var reqStatus = "Active";
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE pledges SET numDon = ? WHERE userEmail = ? AND itemDon = ? AND numDon = ?`;
//     conn.query(qry, [numDon, email, itemName, oldNumDon], (err, result) => {
//       conn.release();
//       if (err) throw err;
//       console.log([status, email, recipEmail, reqStatus, numDon, recipEmail]);
//     });
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/About");
//     res.end();
//   });
// });

// router.post("/updateRequest", async (req, res) => {
//   // connection.connect();
//   const eventName = req.body.respEvent;
//   const itemName = req.body.respItem;
//   const oldNumDon = req.body.oldNumDon;
//   const oldItemReq = req.body.oldItemDon;
//   const email = req.body.emailOfDonor;
//   const recipEmail = req.body.recipEmail;
//   const status = "Shipped";
//   const numDon = req.body.numDon;
//   var reqStatus = "Active";
//   pool.getConnection((err, conn) => {
//     if (err) throw err;
//     const qry = `UPDATE requests SET numReq = ?, itemReq = ? WHERE recipEmail = ? AND itemReq = ? AND numReq = ?`;
//     conn.query(
//       qry,
//       [numDon, itemName, recipEmail, oldItemReq, oldNumDon],
//       (err, result) => {
//         conn.release();
//         if (err) throw err;
//         console.log([numDon, itemName, recipEmail, oldItemReq, oldNumDon]);
//       }
//     );
//     // reps.push({ eventDon: eventName, itemDon: itemName });
//     res.redirect("/About");
//     res.end();
//   });
// });

module.exports = router;
