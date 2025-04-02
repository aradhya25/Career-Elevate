const express = require("express");
const app = express();
const db = require("../config/db");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login"); // Redirect if session is not available
    }

    const email = req.session.user.email;

    
    db.execute(
        "SELECT full_name, email, COALESCE(phone, '') AS phone, COALESCE(education_level, '') AS education_level, COALESCE(interests, '') AS interests FROM users WHERE email = ?",
        [email],
        (userError, userResults) => {
            if (userError) {
                console.error("Error fetching user details:", userError);
                return res.status(500).send("Internal Server Error");
            }

            if (userResults.length === 0) {
                return res.redirect("/login"); // Redirect if no user found
            }

            const user = userResults[0]; // Get user details

           
            db.execute(
                "SELECT * FROM appointments WHERE email = ? ORDER BY preferred_date DESC",
                [email],
                (appointmentError, appointmentResults) => {
                    if (appointmentError) {
                        console.error("Error fetching appointments:", appointmentError);
                        return res.status(500).send("Internal Server Error");
                    }

                    // Render profile page and pass user object
                    res.render("profile", {
                        user: user, // Pass user data to EJS
                        appointments: appointmentResults
                    });
                }
            );
        }
    );
});

   

app.post("/profile/edit", (req, res) => {
    const { full_name, email, phone, education_level, interests } = req.body;

  
    db.execute(
        "UPDATE users SET full_name = ?, phone = ?, education_level = ?, interests = ? WHERE email = ?",
        [full_name, phone, education_level, interests, email],
        (error, results) => {
            if (error) {
                console.error("Error updating profile:", error);
                return res.status(500).send("Internal Server Error");
            }

            //req.session.user = { full_name, email, phone, education_level, interests };

            res.redirect("/profile");
        }
    );
});

   
 

module.exports=app;