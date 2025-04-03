module.exports = (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect("/login"); // Redirect to login if user is not authenticated
        }
        next(); // Proceed if authenticated
    } catch (error) {
        console.error("Authentication Middleware Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

