const express = require("express");
const app = express();
const authmiddleware = require("../middlewares/usermiddleware");
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
    return res.redirect("/login"); // Redirect if session is not available
  }
  res.render("afterlogin.ejs", { fullName: req.session.user.full_name });
});

app.get("/login/readmore",(req,res)=>{
  if (!req.session.user) {
    return res.redirect("/login"); // Redirect if session is not available
  }
  res.render("afterloginreadmore.ejs");
})
// app.get("/admin", (req, res) => {
//   if(!req.session.admin){
//     res.redirect("/adminlogin");
//   }
//   res.render("admin.ejs",{ admin: req.session.admin });
// });

app.get("/adminlogin", (req, res) => {
  res.render("adminlogin.ejs", { error: null });
});
module.exports = app;
