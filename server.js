require("dotenv").config(); // Load .env first

const express = require("express");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session); // Persistent session store

const app = express();
const port = process.env.PORT || 8080;

// ✅ MySQL session store setup (optional but recommended for production)
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Session configuration (works locally and in production)
let sessionConfig = {
  secret: process.env.SESSION_SECRET || "fallback-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // will update to true in production automatically
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
};

// Use MySQLStore only in production
if (process.env.NODE_ENV === "production") {
  const MySQLStore = require("express-mysql-session")(session);
  const sessionStore = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  sessionConfig.store = sessionStore;
  sessionConfig.cookie.secure = true; // secure cookies for HTTPS
}

// Apply session middleware
app.use(session(sessionConfig));


// ✅ EJS setup and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// ✅ Routes
const indexRoutes = require("./routes/index");
const serviceRoutes = require("./routes/services");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const profileRoutes = require("./routes/profilemanagement");
const adminRoutes = require("./routes/adminmanagement");
const jobPostRoutes = require("./routes/jobpostmanagement");
const viewOpportunityRoutes = require("./routes/useropportunitiesmanagement");
const passwordRecoveryRoutes = require("./routes/passwordrecovery");

// Use routes
app.use("/", indexRoutes);
app.use("/", serviceRoutes);
app.use("/", authRoutes);
app.use("/", appointmentRoutes);
app.use("/", profileRoutes);
app.use("/", adminRoutes);
app.use("/", jobPostRoutes);
app.use("/", viewOpportunityRoutes);
app.use("/", passwordRecoveryRoutes);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.send("Server is up and running 🚀");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
