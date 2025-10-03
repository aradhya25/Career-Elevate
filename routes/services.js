const express = require("express");
const app = express();
const authmiddleware = require("../middlewares/usermiddleware");

app.get("/services/it-career", (req, res) => {
  res.render("ITmentoring.ejs");
});
app.get("/services/hsc-mentoring", (req, res) => {
  res.render("HSC.ejs");
});
app.get("/services/interview-prep", (req, res) => {
  res.render("interviewprep.ejs");
});
app.get("/services/commerce-management", (req, res) => {
  res.render("commerceandmanagement.ejs");
});
app.get("/services/arts-humanities", (req, res) => {
  res.render("artsandhumanities.ejs");
});
app.get("/services/government-public", (req, res) => {
  res.render("govtandpublic.ejs");
});
app.get("/services/jee-neet-guidance", (req, res) => {
  res.render("Jeeneet.ejs");
});
app.get("/services/law-legal", (req, res) => {
  res.render("lawandlegalservices.ejs");
});


app.get("/book-session/:topic", authmiddleware, (req, res) => {
  const topic = req.params.topic;

  
  const validTopics = [
    "it-career",
    "hsc-mentoring",
    "interview-prep",
    "commerce-management",
    "arts-humanities",
    "government-public",
    "jee-neet-guidance",
    "law-legal",
  ];

  if (!validTopics.includes(topic)) {
    return res.send("Page not found");
  }

  res.render("inputform.ejs", { topic, user: req.session.user }); 
});

module.exports = app;
