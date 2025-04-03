const express = require("express");
const app = express();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    
    if (password !== confirmPassword) {
        console.log("password does not match");
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).render("register.ejs", { error: "Internal Server Error" });
        }

        if (result.length > 0) {
            return res.render("register.ejs", { error: "Email already exists. Try logging in." });
        }

        bcrypt.hash(password.trim(), saltRounds, (err, hash) => {
            if (err) {
                console.error("Hashing Error:", err);
                return res.status(500).render("register.ejs", { error: "Internal Server Error" });
            }
        
           // console.log("Hashed Password:", hash);
        
            db.query(
                "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)", 
                [name.trim(), email.trim(), hash], 
                (err, result) => {
                    if (err) {
                        console.error("Insert Query Error:", err);
                        return res.status(500).render("register.ejs", { error: "Internal Server Error" });
                    }
                    res.render("login.ejs", { message: "Registration successful. Please log in." });
                }
            );
        });
        
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Login error:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (result.length === 0) {
            return res.status(400).send("Email not found, please register first.");
        }

        const user = result[0]; 

        if (!user.password_hash) {
            console.error("No password found for this user in the database.");
            return res.status(500).send("Password not found.");
        }

      
        bcrypt.compare(password, user.password_hash, (err, isMatch) => {
            if (err) {
                console.error("Password Comparison Error:", err);
                return res.status(500).send("Internal Server Error");
            }

            if (isMatch) {
                
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    phone:user.phone,
                };
            
                
                return res.redirect("/afterlogin");
            }else {
                return res.send("Incorrect password, please try again.");
            }
        });
    });
});


app.get("/logout", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/mainpage"); // Redirect if no user is logged in
    }

    delete req.session.user; // Remove only the user session data

    res.redirect("/mainpage"); // Redirect after logout
});



//admin

app.post("/adminlogin", (req, res) => {
    const { email, password } = req.body;

   
    if (!email || !password) {
        return res.render("adminlogin.ejs", { error: "All fields are required" });
    }

    
    db.query("SELECT * FROM admin WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.render("adminlogin.ejs", { error: "Internal server error" });
        }

        if (result.length === 0) {
            return res.render("adminlogin.ejs", { error: "Invalid Credentials" });
        }

        const admin = result[0];

        
        bcrypt.compare(password, admin.password, (bcryptErr, isMatch) => {
            if (bcryptErr) {
                console.error("Bcrypt error:", bcryptErr);
                return res.render("adminlogin.ejs", { error: "Internal server error" });
            }

            if (!isMatch) {
                return res.render("adminlogin.ejs", { error: "Invalid Credentials" });
            }

            
            req.session.admin = { id: admin.id, email: admin.email };
            return res.redirect("/admin");
        });
    });
});


app.get("/adminlogout", (req, res) => {
    if (!req.session.admin) {
        return res.redirect("/adminlogin"); 
    }

    delete req.session.admin; // Remove only the admin session data
    
    return res.redirect("/adminlogin"); 
});




module.exports = app;
