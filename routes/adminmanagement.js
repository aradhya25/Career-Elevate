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
  
       
        db.query(
          "SELECT id, full_name, phone_number, preferred_date, preferred_time, career_domain FROM appointments ORDER BY preferred_date DESC LIMIT 5",
          (err, appointmentRows) => {
            if (err) {
              console.error("Error fetching recent appointments:", err);
              return res.status(500).send("Internal Server Error");
            }
  
            
            appointmentRows.forEach((appointment) => {
              if (appointment.preferred_date) {
                appointment.preferred_date = moment(appointment.preferred_date).format("DD MMM YYYY");
              }
              if (appointment.preferred_time) {
                appointment.preferred_time = moment(appointment.preferred_time, "HH:mm:ss").format("hh:mm A");
              }
            });
  
            
            db.query("SELECT id, full_name, email, phone, education_level, interests FROM users", (err, userRows) => {
              if (err) {
                console.error("Error fetching users:", err);
                return res.status(500).send("Internal Server Error");
              }
  
              
              res.render("admin", {
                totalUsers: userResult.length > 0 ? userResult[0].totalUsers : 0,
                totalAppointments: appointmentResult.length > 0 ? appointmentResult[0].totalAppointments : 0,
                recentAppointments: appointmentRows,
                users: userRows, 
              });
            });
          }
        );
      });
    });
  });

  app.post("/admin/users/delete", (req, res) => {
    const userId = req.body.id; // Get user ID from form input

    if (!userId) {
        return res.status(400).send("User ID is required");
    }

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("User not found");
        }

        res.redirect("/admin"); // Redirect back to admin page
    });
});




module.exports = app;
