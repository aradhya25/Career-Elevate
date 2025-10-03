require("dotenv").config();
const bcrypt = require("bcrypt");

const plainPassword = process.env.ADMIN_PASS; // from .env
bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) throw err;
  console.log("Hashed Password:", hash);
});
