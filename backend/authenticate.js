exports.authenticate = (req, res, next) => {
    if (req.session.userId) {
        next(); // proceed to the next middleware
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};