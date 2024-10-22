import jwt from "jsonwebtoken";

const SECRET_KEY = "f27om2feQYLKQZl6uBkw";

const verifyToken = (req, res, next) => {
  const token = req.headers.Authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Failed to authenticate token" });
  }
};

export default verifyToken;
