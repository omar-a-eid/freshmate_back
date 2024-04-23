import jwt from "jsonwebtoken";
export default async function isAuth(req, res, next) {
  const token = req.get("Authorization").split(" ")[1];
  let isVerified;
  try {
    isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw error;
  }

  if (!isVerified) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  req.userId = isVerified.userId;
  req.email = isVerified.email;
  next();
}
