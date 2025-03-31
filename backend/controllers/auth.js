import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const userData = {
      id: user._id,
      username: user.username,
    };
    const accessToken = jwt.sign(userData, process.env.JWT_SECRET, {
      expiresIn: "5s",
    });
  
    const refreshToken = jwt.sign(userData, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });
  
    return { accessToken, refreshToken };
  };

export const refreshToken = async (req, res) => {  
    try {
        const refreshToken = req.headers.authorization.split(" ")[1];
        if (!refreshToken) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            const accessToken = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: "5s" }
            );
            res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error refreshing token",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }

}