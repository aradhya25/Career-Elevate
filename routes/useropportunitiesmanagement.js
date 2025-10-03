const express=require("express");
const app=express();
const db = require("../config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/profile/view-opportunities", (req, res) => {
    const query = "SELECT * FROM opportunities";
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching data:", err);
        return res.status(500).send("Database error");
      }
  
      res.render("opportunityuser.ejs", { opportunities: results });
    });
  });
module.exports=app;