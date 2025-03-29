const bcrypt=require('bcrypt');
const plainpassword="CareerElevate@2025";
bcrypt.hash(plainpassword, 10, (err, hash) => {
    if (err) throw err;
    console.log("Hashed Password:", hash);
  });