const express = require("express");
const app = express();
const db = require("../config/db");
const isadmin = require("../middlewares/adminmiddleware");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/admin/post-opportunity", isadmin, (req, res) => {
  const { title, category, company, location, apply_link, description } =
    req.body;
  const posted_by = req.session.admin.id;
  if (!title || !category || !company) {
    return res.status(400).send("Title, Category, and Company are required.");
  }
  const sql = `INSERT INTO opportunities (title, category, company, location, apply_link,   description,posted_by) 
VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [title, category, company, location, apply_link,description, posted_by],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Error posting opportunity.");
      }
      res.redirect("/admin"); 
    }
  );
});

module.exports = app;
