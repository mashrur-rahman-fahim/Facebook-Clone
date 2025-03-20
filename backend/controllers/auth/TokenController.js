import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_KEY,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    { id: user.id, email: user.email },
    process.env.REFRESH_KEY,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};
export const verifyToken = (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No access token" });
  }
  jwt.verify(accessToken, process.env.ACCESS_KEY, (err, decoded) => {
    if (err) {
  
      return res.status(403).json({ message: "Access denied" });
     
    }
   
    req.email = decoded.email;

    return next();
  });
};
export const renewAccessToken = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.ACCESS_KEY,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  });
};
