exports.authenticate = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) {
      next(); // proceed to the next middleware
  } else {
      res.status(401).json({ message: "Unauthorized" });
  }
};
