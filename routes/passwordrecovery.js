const express = require("express");
const app = express();
const db = require("../config/db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt=require("bcrypt");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});
app.get("/reset-password/:token", (req, res) => {
    const { token } = req.params;
    db.query("SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?", [token, Date.now()], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send("Invalid or expired token.");

        res.render("resetpassword", { token });
    });
});




app.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    db.query("SELECT * FROM users WHERE reset_token = ? AND reset_expires > ?", [token, Date.now()], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send("Invalid or expired token.");

        const email = results[0].email;
        db.query("UPDATE users SET password_hash  = ?, reset_token = NULL, reset_expires = NULL WHERE email = ?", [hashedPassword, email], (err) => {
            if (err) throw err;
            res.send("Password updated successfully!");
        });
    });
});


app.post("/forgot-password", (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 3600000; // 1-hour expiry

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) return res.send("No user found.");

        // Store reset token and expiry in DB
        db.query("UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?", [token, expiry, email], (err) => {
            if (err) throw err;

            // Send reset link via email
            const resetLink = `http://localhost:8080/reset-password/${token}`;
            const mailOptions = {
                to: email,
                subject: "Password Reset Request",
                html: `
                    <p>Hello,</p>
                    <p>We received a request to reset your password. Click the button below to reset it:</p>
                    <p style="text-align: center;">
                        <a href="${resetLink}" 
                           style="display: inline-block; padding: 10px 20px; font-size: 16px; 
                                  color: #ffffff; background-color: #007bff; text-decoration: none; 
                                  border-radius: 5px;">
                           Reset Password
                        </a>
                    </p>
                    <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
                    <p>For security reasons, this link will expire in 1 hour.</p>
                    <p>Best regards,<br>Your Company Name</p>
                `,
            };
            

            transporter.sendMail(mailOptions, (err) => {
                if (err) throw err;
                res.send("Password reset link sent to your email.");
            });
        });
    });
});

module.exports = app;
