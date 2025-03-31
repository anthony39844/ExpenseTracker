import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const generateToken = (user) => {
  const userData = {
    id: user._id,
    username: user.username,
  };
  return jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "24hr",
  });
};
