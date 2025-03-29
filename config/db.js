const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "careerguidance",
    password: "aradhya@sql",
});

connection.connect((err) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = connection;
