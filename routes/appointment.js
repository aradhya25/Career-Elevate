const express = require("express");
const db = require("../config/db");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/book-consultation", (req, res) => {
    
    const {
      full_name,
      email,
      phone_number,
      career_domain,
      preferred_date,
      preferred_time,
      mode_of_consultation,
      additional_message,
    } = req.body;

    console.log("Received Form Data:", req.body); 
  
    const insertQuery = `
      INSERT INTO appointments (
        full_name, email, phone_number, career_domain, 
        preferred_date, preferred_time, mode_of_consultation, additional_message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
   
    db.query(
      insertQuery,
      [
        full_name,
        email,
        phone_number,
        career_domain,
        preferred_date,
        preferred_time,
        mode_of_consultation,
        additional_message || null,
      ],
      (err, result) => {
        if (err) {
          console.error("Error Booking Appointment:", err);
          return res.send("Error Booking Appointment");
        }
  
        console.log("Appointment Booked Successfully",result);
  
        // Sending a confirmation email
        
        
        res.render("bookingsuccess", {
          fullName: full_name,
          careerDomain: career_domain,
          preferredDate: preferred_date,
          preferredTime: preferred_time,
        });
        sendConfirmationEmail(
          email,
          full_name,
          career_domain,
          preferred_date,
          preferred_time,
          mode_of_consultation
        );
      }
    );
  });

  const sendConfirmationEmail = (toEmail, fullName, careerDomain, date, time, mode) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.APP_PASSWORD,  
        },
    });

    const mailOptions = {
      from: '"Career Elevate Team" <careerelevate2025@gmail.com>',
      to: toEmail,
      subject: "Your Career Consultation is Confirmed!",
      replyTo: "careerelevate2025@gmail.com",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #2E86C1;">Hello ${fullName},</h2>
          <p>Thank you for scheduling your career consultation! Below are your appointment details:</p>
          
          <table style="border-collapse: collapse; width: 100%; margin-top: 10px; border: 1px solid #ddd;">
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Career Domain:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${careerDomain}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${time}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>Mode:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${mode}</td>
              </tr>
          </table>

          ${
              mode.toLowerCase() === "offline"
              ? `
              <p style="margin-top: 15px;"><b>📍 Location Details:</b></p>
              <p><strong>Venue:</strong> Career Elevate Office</p>
              <p><strong>Address:</strong> 123, XYZ Tower, ABC Road, Nashik, India</p>
              <p><b>Note:</b> Please arrive at the venue 10 minutes before your scheduled appointment.</p>
              `
              : `
              <p style="margin-top: 15px;"><b>🔔 Important:</b> Your session link will be sent to you 10 minutes before your scheduled time. Please check your email promptly to join the session on time.</p>
              `
          }

          <p>We look forward to assisting you!</p>
          
          <p><strong>Best Regards,</strong><br>
          <strong>Career Elevate Team</strong></p>

          <hr>
          <p style="font-size: 12px; color: #666;">This is an automated message. If you have any questions, please contact us at <a href="mailto:careerelevate2025@gmail.com">careerelevate2025@gmail.com</a>.</p>
          <p style="font-size: 12px; color: #666;">Career Elevate | Nashik, India</p>
      </div>
  `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};


module.exports=app;
