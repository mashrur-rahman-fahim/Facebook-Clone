import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "./TokenController.js";
const verifyPassword = async (enteredPassword, storedPassword) => {
  const isMatch = bcrypt.compare(enteredPassword, storedPassword);
  return isMatch;
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //check if user exist and password match
  const user =await  User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
 

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = generateToken(user);
  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "User logged in",accessToken:token.accessToken });
};
