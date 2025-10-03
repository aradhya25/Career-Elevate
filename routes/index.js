const express = require("express");
const app = express();
const authmiddleware = require("../middlewares/usermiddleware");
const db=require("../config/db");
//mainpage
app.get("/mainpage", (req, res) => {
  res.render("mainpage.ejs");
});
//register
app.get("/register", (req, res) => {
  res.render("register.ejs", { error: null });
});
//login
app.get("/login", (req, res) => {
  res.render("login.ejs", { message: null });
});

//readmore
app.get("/readmore", (req, res) => {
  res.render("mainpagereadmore.ejs");
});

app.get("/afterlogin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); 
  }
  res.render("afterlogin.ejs", { fullName: req.session.user.full_name });
});

app.get("/login/readmore", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login"); 
  }
  res.render("afterloginreadmore.ejs");
});
// app.get("/admin", (req, res) => {
//   if(!req.session.admin){
//     res.redirect("/adminlogin");
//   }
//   res.render("admin.ejs",{ admin: req.session.admin });
// });

app.get("/adminlogin", (req, res) => {
  res.render("adminlogin.ejs", { error: null });
});

app.get("/admin/post-opportunity", (req, res) => {
  if (!req.session.admin) {
    return res.redirect("/adminlogin"); 
  }
  res.render("jobopportunities.ejs");
});

app.get("/profile/view-opportunities", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const query = "SELECT * FROM opportunities";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Database error");
    }

    res.render("opportunityuser.ejs", { opportunities: results });
  });
});

app.get("/forgot-password",(req,res)=>{
  res.render("forgotpassword.ejs");
});



// app.get("/reset-password",(req,res)=>{
//   res.render("resetpassword.ejs");
// });
module.exports = app;
