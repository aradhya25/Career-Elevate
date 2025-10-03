const express = require("express");
const app = express();
const db = require("../config/db");

const moment = require("moment");

app.get("/admin", (req, res) => {
  if (!req.session.admin) {
      return res.redirect("/adminlogin");
  }

  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err, userResult) => {
      if (err) {
          console.error("Error fetching total users:", err);
          return res.status(500).send("Internal Server Error");
      }

      db.query("SELECT COUNT(*) AS totalAppointments FROM appointments", (err, appointmentResult) => {
          if (err) {
              console.error("Error fetching total appointments:", err);
              return res.status(500).send("Internal Server Error");
          }

          // Fetch the recent 5 appointments
          db.query(
              "SELECT id, full_name, phone_number, preferred_date, preferred_time, career_domain FROM appointments ORDER BY preferred_date DESC LIMIT 5",
              (err, recentAppointments) => {
                  if (err) {
                      console.error("Error fetching recent appointments:", err);
                      return res.status(500).send("Internal Server Error");
                  }

                  // Fetch all appointments for "View Appointments" section
                  db.query(
                      "SELECT id, full_name, phone_number, preferred_date, preferred_time, career_domain FROM appointments ORDER BY preferred_date DESC",
                      (err, allAppointments) => {
                          if (err) {
                              console.error("Error fetching all appointments:", err);
                              return res.status(500).send("Internal Server Error");
                          }

                          // Format date & time
                          [...recentAppointments, ...allAppointments].forEach((appointment) => {
                              if (appointment.preferred_date) {
                                  appointment.preferred_date = moment(appointment.preferred_date).format("DD MMM YYYY");
                              }
                              if (appointment.preferred_time) {
                                  appointment.preferred_time = moment(appointment.preferred_time, "HH:mm:ss").format("hh:mm A");
                              }
                          });

                          // Fetch all users
                          db.query("SELECT id, full_name, email, phone, education_level, interests FROM users", (err, userRows) => {
                              if (err) {
                                  console.error("Error fetching users:", err);
                                  return res.status(500).send("Internal Server Error");
                              }

                              res.render("admin", {
                                  totalUsers: userResult.length > 0 ? userResult[0].totalUsers : 0,
                                  totalAppointments: appointmentResult.length > 0 ? appointmentResult[0].totalAppointments : 0,
                                  recentAppointments: recentAppointments, 
                                  allAppointments: allAppointments, 
                                  users: userRows,
                              });
                          });
                      }
                  );
              }
          );
      });
  });
});

app.delete("/admin/users/:id", (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  });
});

app.delete("/delete-appointment/:id", (req, res) => {
  const appointmentId = req.params.id;

  if (!appointmentId || isNaN(appointmentId)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
  }

  db.query("DELETE FROM appointments WHERE id = ?", [appointmentId], (err, result) => {
      if (err) {
          console.error("Error deleting appointment:", err);
          return res.status(500).json({ success: false, message: "Internal Server Error" });
      }

      if (result.affectedRows > 0) {
          res.json({ success: true });
      } else {
          res.status(404).json({ success: false, message: "Appointment not found" });
      }
  });
});



module.exports = app;
