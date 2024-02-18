import User from "../models/users.model.js"
import asyncHandler from "express-async-handler";

export const profile = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).select("-password").lean();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});