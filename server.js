const express = require("express");
const path = require("path");
const session=require("express-session");

const app = express();
const port = process.env.PORT || 8080;



// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(session({
  secret: "d670b0418f9b2c7e970df6c52813bbd110f764fff4c4a567a1a064ce581ac1105ae29a3d12cfbc46fc341ec068458419e91e425ff8f033b70b05533ef56cb6fe", 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

// Set up EJS and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Import routes
const indexRoutes = require("./routes/index");
const serviceRoutes = require("./routes/services");
const authRoutes = require("./routes/auth");
const appointmentroutes=require('./routes/appointment');
const profileroutes=require("./routes/profilemanagement");
const adminroutes=require("./routes/adminmanagement");
const jobpostroutes=require("./routes/jobpostmanagement");
const viewopportunityroutes=require("./routes/useropportunitiesmanagement");
const passwordrecoveryroutes=require("./routes/passwordrecovery");

// Use routes

app.use("/", indexRoutes);
app.use("/", serviceRoutes);
app.use("/", authRoutes);
app.use("/",appointmentroutes);
app.use("/",profileroutes);
app.use("/",adminroutes);
app.use("/",jobpostroutes);
app.use("/",viewopportunityroutes);
app.use("/",passwordrecoveryroutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
