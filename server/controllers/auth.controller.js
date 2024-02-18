import asyncHandler from "express-async-handler";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = asyncHandler(async (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "User not Found!" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized User" });

   const accessToken = jwt.sign(
     {
       id: foundUser._id,
       username: foundUser.username,
       email: foundUser.email,
     },
     process.env.ACCESS_TOKEN_SECRET,
     { expiresIn: "7d" } 
   );

   res.cookie("access_token", accessToken, {
     httpOnly: true,
     secure: true,
     sameSite: "None",
     maxAge: 7 * 24 * 60 * 60 * 1000,
   });

   res.json({ accessToken });
});

export const register = asyncHandler(async (req, res, next) => {

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All feilds are required" });
  }

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject = new User({ username, email, password: hashedPwd });

  try {
    await userObject.save();
    res.status(201).json({ message: `New User ${username} has been created!` });
  } catch (error) {
    next(error);
  }
});


export const logout = (req, res) => {
   res.clearCookie("access_token", {
     httpOnly: true,
     sameSite: "None",
     secure: true,
   });
   res.json({ message: "You are Logged Out!" });
}