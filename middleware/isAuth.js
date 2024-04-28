import jwt from "jsonwebtoken";

export default async function isAuth(req, res, next) {
  const token = req.get("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided." });
  }

  try {
    const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = isVerified.userId;
    req.email = isVerified.email;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired." });
    } else {
      return res.status(401).json({ error: "Not authenticated." });
    }
  }
}
